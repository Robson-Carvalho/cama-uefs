import { prisma } from "../databases/prismaClient";
import { Mailer } from "../services/email/Mailer";

export class TopicRevisionRepository {
  async create(topicId: string, revisorId: string, title: string, content: string, path: string) {
    return prisma.topicRevision.create({
      data: { topicId, revisorId, title, content, path, status: "PENDING" },
      include: { revisor: { select: { name: true, email: true } } }
    });
  }

  async getPendingByTopicId(topicId: string) {
    return prisma.topicRevision.findMany({
      where: { topicId, status: "PENDING" },
      include: { revisor: { select: { name: true, email: true } } },
      orderBy: { createdAt: "asc" }
    });
  }

  async getAllPending(userId: string, role: string) {
    const whereClause: any = { status: "PENDING" };
    if (role !== "SUPER_ADMIN") {
      whereClause.topic = { authorId: userId };
    }
    return prisma.topicRevision.findMany({
      where: whereClause,
      include: {
        topic: { select: { title: true, content: true, authorId: true, author: { select: { name: true } }, class: { select: { title: true } } } },
        revisor: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async getMyRevisions(userId: string) {
    return prisma.topicRevision.findMany({
      where: { revisorId: userId },
      include: {
        topic: { select: { title: true, content: true, authorId: true, author: { select: { name: true } }, class: { select: { title: true } } } },
        revisor: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async getById(id: string) {
    return prisma.topicRevision.findUnique({
      where: { id },
      include: {
        topic: { select: { title: true, content: true, authorId: true, author: { select: { name: true } }, class: { select: { title: true } } } },
        revisor: { select: { name: true, email: true } }
      }
    });
  }

  async accept(revisionId: string, authorId: string) {
    const revision = await prisma.topicRevision.findUnique({ where: { id: revisionId }, include: { topic: { include: { coAuthors: true, author: true } }, revisor: true } });
    if (!revision) throw new Error("Revisão não encontrada.");
    if (revision.topic.authorId !== authorId) throw new Error("Apenas o autor original pode aceitar revisões.");

    const isCoAuthor = revision.revisorId !== revision.topic.authorId && !revision.topic.coAuthors.some((c: any) => c.id === revision.revisorId);

    // Update topic with revision data
    await prisma.topic.update({
      where: { id: revision.topicId },
      data: {
        title: revision.title,
        content: revision.content,
        path: revision.path,
        ...(isCoAuthor && { coAuthors: { connect: { id: revision.revisorId } } })
      }
    });

    // Delete revision instead of keeping history
    const deletedRevision = await prisma.topicRevision.delete({
      where: { id: revisionId }
    });

    if (revision.revisor && revision.topic.author) {
      const mailer = new Mailer();
      mailer.revisionAccepted(
        revision.revisor.email,
        revision.revisor.name,
        revision.topic.title,
        revision.topic.author.name
      );
    }

    return deletedRevision;
  }

  async reject(revisionId: string, authorId: string) {
    const revision = await prisma.topicRevision.findUnique({ where: { id: revisionId }, include: { topic: { include: { author: true } }, revisor: true } });
    if (!revision) throw new Error("Revisão não encontrada.");
    if (revision.topic.authorId !== authorId) throw new Error("Apenas o autor original pode rejeitar revisões.");

    // Delete revision instead of keeping history
    const deletedRevision = await prisma.topicRevision.delete({
      where: { id: revisionId }
    });

    if (revision.revisor && revision.topic.author) {
      const mailer = new Mailer();
      mailer.revisionRejected(
        revision.revisor.email,
        revision.revisor.name,
        revision.topic.title,
        revision.topic.author.name
      );
    }

    return deletedRevision;
  }
}
