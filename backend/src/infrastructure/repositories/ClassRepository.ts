import { IClassRepository } from "../../core/domain/repositories/IClassRepository";
import { IClass } from "../../core/dtos/ClassDTOs";
import { IContentMap } from "../../core/interfaces/IContentMap";
import { InternalServerError, ValidationError } from "../../core/errors/Errors";
import { prisma } from "../databases/prismaClient";

class ClassRepository implements IClassRepository {
  async create(title: string, path: string): Promise<IClass | null> {
    try {
      return await prisma.class.create({ data: { title, path } });
    } catch (error: any) {
      console.error("Error creating class:", error);
      if (error.code === "P2002") {
        throw new ValidationError("Já existe uma aula com este título.");
      }
      throw new InternalServerError("Internal Server Error");
    }
  }

  async get(skip?: number, take?: number): Promise<{ data: IClass[]; total: number }> {
    try {
      const total = await prisma.class.count();
      const data = await prisma.class.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        skip: skip || 0,
        take: take || 10,
      });
      return { data, total };
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw new InternalServerError("Internal Server Error");
    }
  }

  async getByPath(path: string): Promise<IClass | null> {
    try {
      return await prisma.class.findUnique({ where: { path } });
    } catch (error) {
      console.error("Error fetching class by path:", error);
      throw new InternalServerError("Internal Server Error");
    }
  }

  async getContentMap(): Promise<IContentMap[] | []> {
    try {
      const classes = await prisma.class.findMany({
        where: { isPublished: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        include: {
          topics: {
            where: { isPublished: true },
            select: { id: true, title: true, path: true },
            orderBy: [{ order: "asc" }, { createdAt: "asc" }],
          },
        },
      });

      return classes.map((c) => ({
        classID: c.id,
        className: c.title,
        classPath: c.path,
        topics: c.topics.map((t) => ({
          id: t.id,
          name: t.title,
          path: t.path,
        })),
      }));
    } catch (error) {
      console.error("Error fetching content map:", error);
      throw new InternalServerError("Internal Server Error");
    }
  }

  async getById(id: string): Promise<IClass | null> {
    try {
      return await prisma.class.findUnique({ where: { id } });
    } catch (error) {
      console.error("Error fetching class by ID:", error);
      throw new InternalServerError("Internal Server Error");
    }
  }

  async getLastCreated(): Promise<IClass | null> {
    try {
      return await prisma.class.findFirst({ orderBy: { createdAt: "desc" } });
    } catch (error) {
      console.error("Error fetching last created class:", error);
      throw new InternalServerError("Internal Server Error");
    }
  }

  async update(id: string, title: string, path: string, order: number, isPublished?: boolean): Promise<IClass | null> {
    try {
      return await prisma.class.update({
        where: { id },
        data: { title, path, order, ...(isPublished !== undefined && { isPublished }) },
      });
    } catch (error: any) {
      console.error("Error updating class:", error);
      if (error.code === "P2002") {
        throw new ValidationError("Já existe uma aula com este título.");
      }
      throw new InternalServerError("Internal Server Error");
    }
  }

  async updateOrder(items: { id: string; order: number }[]): Promise<void> {
    try {
      await prisma.$transaction(
        items.map((item) =>
          prisma.class.update({
            where: { id: item.id },
            data: { order: item.order },
          })
        )
      );
    } catch (error) {
      console.error("Error updating class orders:", error);
      throw new InternalServerError("Internal Server Error");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      // onDelete: Cascade no schema garante que os topics são deletados automaticamente
      await prisma.class.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting class:", error);
      throw new InternalServerError("Internal Server Error");
    }
  }
}

export { ClassRepository };
