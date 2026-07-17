import { ITopicRepository } from "../../core/domain/repositories/ITopicRepository";
import { ITopic } from "../../core/dtos/TopicDTOs";
import { prisma } from "../databases/prismaClient";
import { ValidationError } from "../../core/errors/Errors";

class TopicRepository implements ITopicRepository {
  async getByClassId(id: string, skip?: number, take?: number): Promise<{ data: ITopic[]; total: number }> {
    try {
      const total = await prisma.topic.count({ where: { classId: id } });
      const data = await prisma.topic.findMany({
        where: { classId: id },
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
      return await prisma.topic.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
    } catch (error) {
      console.error("Error fetching topics:", error);
      return [];
    }
  }

  async getById(id: string): Promise<ITopic | null> {
    try {
      return await prisma.topic.findUnique({ where: { id } });
    } catch (error) {
      console.error("Error fetching topic by ID:", error);
      return null;
    }
  }

  async getByPath(path: string): Promise<ITopic | null> {
    try {
      return await prisma.topic.findFirst({ where: { path } });
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
      return await prisma.topic.findFirst({
        where: {
          path: topicPath,
          isPublished: true,
          class: {
            path: classPath,
            isPublished: true,
          },
        },
      });
    } catch (error) {
      console.error("Error fetching topic by class and path:", error);
      throw new Error("Database query error");
    }
  }

  async create(
    title: string,
    content: string,
    path: string,
    classId: string
  ): Promise<ITopic | null> {
    try {
      return await prisma.topic.create({
        data: { title, content, path, classId },
      });
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
    isPublished?: boolean
  ): Promise<ITopic | null> {
    try {
      return await prisma.topic.update({
        where: { id },
        data: { title, content, path, classId, order, ...(isPublished !== undefined && { isPublished }) },
      });
    } catch (error: any) {
      console.error("Error updating topic:", error);
      if (error.code === "P2002") {
        throw new ValidationError("Já existe um tópico com este título nesta aula (o caminho gerado já está em uso).");
      }
      return null;
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
    } catch (error) {
      console.error("Error updating topic orders:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.topic.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting topic:", error);
      throw error;
    }
  }
}

export { TopicRepository };
