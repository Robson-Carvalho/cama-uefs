import { IClassRepository } from "../../core/domain/repositories/IClassRepository";
import { IClass } from "../../core/dtos/ClassDTOs";
import { IContentMap } from "../../core/interfaces/IContentMap";
import { InternalServerError } from "../../core/errors/Errors";
import { prisma } from "../databases/prismaClient";

class ClassRepository implements IClassRepository {
  async create(title: string, path: string): Promise<IClass | null> {
    try {
      return await prisma.class.create({ data: { title, path } });
    } catch (error) {
      console.error("Error creating class:", error);
      throw new InternalServerError("Internal Server Error");
    }
  }

  async get(): Promise<IClass[] | []> {
    try {
      return await prisma.class.findMany({ orderBy: { createdAt: "asc" } });
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
        orderBy: { createdAt: "asc" },
        include: {
          topics: {
            select: { id: true, title: true, path: true },
            orderBy: { createdAt: "asc" },
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

  async update(id: string, title: string, path: string): Promise<void> {
    try {
      await prisma.class.update({ where: { id }, data: { title, path } });
    } catch (error) {
      console.error("Error updating class:", error);
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
