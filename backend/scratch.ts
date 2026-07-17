import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  const admin = await prisma.admin.findFirst({ where: { email: 'admin@uefs.br' } });
  const topic = await prisma.topic.findFirst();
  
  if (!topic || !admin) return console.log("No topic or admin");

  try {
    const res = await prisma.$transaction(async (tx) => {
      const pendingCount = await tx.topicRevision.count({
        where: { topicId: topic.id, status: "PENDING" }
      });
      
      console.log({ pendingCount });

      const titleMatch = topic.title.trim() === topic.title.trim();
      const contentMatch = topic.content.trim() === "New Content".trim();

      if (pendingCount > 0 && (!titleMatch || !contentMatch)) {
        throw new Error("Este tópico possui revisões pendentes...");
      }
      
      return "Success";
    });
    console.log(res);
  } catch (e: any) {
    console.error(e.message);
  }
}
test();
