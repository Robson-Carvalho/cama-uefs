import { prisma } from './src/infrastructure/databases/prismaClient';
async function main() {
  const revisions = await prisma.topicRevision.findMany({
    orderBy: { createdAt: "desc" },
    take: 1
  });
  console.dir(revisions, { depth: null });
}
main().finally(() => prisma.$disconnect());
