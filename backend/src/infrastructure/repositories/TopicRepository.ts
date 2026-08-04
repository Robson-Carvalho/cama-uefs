import { ITopicRepository } from "../../core/domain/repositories/ITopicRepository";
import { ITopic } from "../../core/dtos/TopicDTOs";
import { prisma } from "../databases/prismaClient";
import { ValidationError, InternalServerError } from "../../core/errors/Errors";
import { cacheService } from "../services/RedisCacheService";
import { Mailer } from "../services/email/Mailer";

class TopicRepository implements ITopicRepository {
  async getByClassId(id: string, skip?: number, take?: number): Promise<{ data: ITopic[]; total: number }> {
    try {
      const total = await prisma.topic.count({ where: { classId: id } });
      const data = await prisma.topic.findMany({
        where: { classId: id },
        include: {
          author: { select: { name: true, email: true } },
          coAuthors: { select: { name: true, email: true } },
        },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        skip: skip || 0,
        take: take || 10,
      });
      return { data, total };
    } catch (error) {
      console.error("Error fetching topics by classId:", error);
      return { data: [], total: 0 };
    }
  }

  async get(): Promise<ITopic[] | []> {
    try {
      return await prisma.topic.findMany({ 
        include: {
          author: { select: { name: true, email: true } },
          coAuthors: { select: { name: true, email: true } },
        },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }] 
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      return [];
    }
  }

  async getById(id: string): Promise<ITopic | null> {
    try {
      return await prisma.topic.findUnique({ 
        where: { id },
        include: {
          author: { select: { name: true, email: true } },
          coAuthors: { select: { name: true, email: true } },
        }
      });
    } catch (error) {
      console.error("Error fetching topic by ID:", error);
      return null;
    }
  }

  async getByPath(path: string): Promise<ITopic | null> {
    try {
      return await prisma.topic.findFirst({ 
        where: { path },
        include: {
          author: { select: { name: true, email: true } },
          coAuthors: { select: { name: true, email: true } },
        }
      });
    } catch (error) {
      console.error("Error fetching topic by path:", error);
      return null;
    }
  }

  async getTopicByClassAndPath(
    classPath: string,
    topicPath: string
  ): Promise<ITopic | null> {
    try {
      const cacheKey = `site:topic:${classPath}:${topicPath}`;
      const cached = await cacheService.get<ITopic>(cacheKey);
      if (cached) {
        return cached;
      }

      const topic = await prisma.topic.findFirst({
        where: {
          path: topicPath,
          isPublished: true,
          class: {
            path: classPath,
            isPublished: true,
          },
        },
        include: {
          author: { select: { name: true, email: true } },
          coAuthors: { select: { name: true, email: true } },
        }
      });
      
      if (topic) {
        await cacheService.set(cacheKey, topic, 300); // Cache de 5 minutos
      }
      return topic;
    } catch (error) {
      console.error("Error fetching topic by class and path:", error);
      throw new InternalServerError("Erro na consulta ao banco de dados.");
    }
  }

  async create(
    title: string,
    content: string,
    path: string,
    classId: string,
    userId: string
  ): Promise<ITopic | null> {
    try {
      const newTopic = await prisma.topic.create({
        data: { title, content, path, classId, authorId: userId },
      });
      await cacheService.del("site:contentMap"); // O menu lateral (mapa) precisa ser atualizado
      await cacheService.delByPrefix("site:topic:"); // Invalida todos os tópicos (garante consistência imediata)
      return newTopic;
    } catch (error: any) {
      console.error("Error creating topic:", error);
      if (error.code === "P2002") {
        throw new ValidationError("Já existe um tópico com este título nesta aula (o caminho gerado já está em uso).");
      }
      throw error;
    }
  }

  async update(
    id: string,
    title: string,
    content: string,
    path: string,
    classId: string,
    order: number,
    userId: string,
    isPublished?: boolean
  ): Promise<ITopic | null> {
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Lock the row to prevent race conditions (e.g. double clicks)
        await tx.$queryRaw`SELECT id FROM topics WHERE id = ${id} FOR UPDATE`;

        const topic = await tx.topic.findUnique({ where: { id }, include: { coAuthors: true } });
        if (!topic) return null;

        const pendingCount = await tx.topicRevision.count({
          where: { topicId: id, status: "PENDING" }
        });

        if (pendingCount > 0) {
          throw new ValidationError("Este tópico possui revisões pendentes. Nenhuma nova alteração pode ser feita até que as atuais sejam avaliadas.");
        }

        if (topic.authorId && userId !== topic.authorId) {
          await tx.topicRevision.create({
            data: { topicId: id, revisorId: userId, title, content, path, status: "PENDING", originalContent: topic.content }
          });

          const author = await tx.admin.findUnique({ where: { id: topic.authorId } });
          const revisor = await tx.admin.findUnique({ where: { id: userId } });
          
          if (author && revisor) {
            const mailer = new Mailer();
            mailer.newRevision(
              author.email,
              author.name,
              revisor.name,
              topic.title
            );
          }

          return { ...topic, _isRevision: true } as any;
        }

        return await tx.topic.update({
          where: { id },
          data: { 
            title, 
            content, 
            path, 
            classId, 
            order, 
            ...(isPublished !== undefined && { isPublished })
          },
        });
      });

      await cacheService.del("site:contentMap");
      await cacheService.delByPrefix("site:topic:");
      return result;
    } catch (error: any) {
      console.error("Error updating topic:", error);
      if (error.code === "P2002") {
        throw new ValidationError("Já existe um tópico com este título nesta aula (o caminho gerado já está em uso).");
      }
      throw error;
    }
  }

  async updateOrder(items: { id: string; order: number }[]): Promise<void> {
    try {
      await prisma.$transaction(
        items.map((item) =>
          prisma.topic.update({
            where: { id: item.id },
            data: { order: item.order },
          })
        )
      );
      await cacheService.del("site:contentMap");
      await cacheService.delByPrefix("site:topic:");
    } catch (error) {
      console.error("Error updating topic orders:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.topic.delete({ where: { id } });
      await cacheService.del("site:contentMap");
      await cacheService.delByPrefix("site:topic:");
    } catch (error) {
      console.error("Error deleting topic:", error);
      throw error;
    }
  }

  async incrementViews(classPath: string, topicPath: string): Promise<void> {
    try {
      const topic = await prisma.topic.findFirst({
        where: { path: topicPath, class: { path: classPath } }
      });
      if (topic) {
        await prisma.topic.update({
          where: { id: topic.id },
          data: { views: { increment: 1 } }
        });
        const cacheKey = `site:topic:${classPath}:${topicPath}`;
        await cacheService.del(cacheKey);
      }
    } catch (e) {
      console.error("Error incrementing views:", e);
    }
  }

  async like(classPath: string, topicPath: string): Promise<ITopic | null> {
    try {
      const topic = await prisma.topic.findFirst({
        where: { path: topicPath, class: { path: classPath } }
      });
      if (topic) {
        const updated = await prisma.topic.update({
          where: { id: topic.id },
          data: { likes: { increment: 1 } }
        });
        const cacheKey = `site:topic:${classPath}:${topicPath}`;
        await cacheService.del(cacheKey);
        return updated;
      }
      return null;
    } catch (e) {
      console.error("Error liking topic:", e);
      return null;
    }
  }

  async unlike(classPath: string, topicPath: string): Promise<ITopic | null> {
    try {
      const topic = await prisma.topic.findFirst({
        where: { path: topicPath, class: { path: classPath } }
      });
      if (topic && topic.likes > 0) {
        const updated = await prisma.topic.update({
          where: { id: topic.id },
          data: { likes: { decrement: 1 } }
        });
        const cacheKey = `site:topic:${classPath}:${topicPath}`;
        await cacheService.del(cacheKey);
        return updated;
      }
      return topic;
    } catch (e) {
      console.error("Error unliking topic:", e);
      return null;
    }
  }
}

export { TopicRepository };
