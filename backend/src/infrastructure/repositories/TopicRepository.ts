import { ITopicRepository } from "../../core/domain/repositories/ITopicRepository";
import { ITopic } from "../../core/dtos/TopicDTOs";
import { prisma } from "../databases/prismaClient";

class TopicRepository implements ITopicRepository {
  async getByClassId(id: string): Promise<ITopic[] | []> {
    try {
      return await prisma.topic.findMany({
        where: { classId: id },
        orderBy: { createdAt: "asc" },
      });
    } catch (error) {
      console.error("Error fetching topics by classId:", error);
      return [];
    }
  }

  async get(): Promise<ITopic[] | []> {
    try {
      return await prisma.topic.findMany({ orderBy: { createdAt: "asc" } });
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
      const classData = await prisma.class.findUnique({
        where: { path: classPath },
        select: { id: true },
      });
      if (!classData) return null;

      return await prisma.topic.findUnique({
        where: {
          classId_path: { classId: classData.id, path: topicPath },
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
    } catch (error) {
      console.error("Error creating topic:", error);
      throw error;
    }
  }

  async update(
    id: string,
    title: string,
    content: string,
    path: string,
    classId: string
  ): Promise<ITopic | null> {
    try {
      return await prisma.topic.update({
        where: { id },
        data: { title, content, path, classId },
      });
    } catch (error) {
      console.error("Error updating topic:", error);
      return null;
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
