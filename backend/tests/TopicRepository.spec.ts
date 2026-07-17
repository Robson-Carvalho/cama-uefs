import { describe, it, expect, beforeEach } from 'vitest';
import { prisma } from '../src/infrastructure/databases/prismaClient';
import { TopicRepository } from '../src/infrastructure/repositories/TopicRepository';

const repository = new TopicRepository();

describe('TopicRepository Update with Pending Revisions', () => {
  let authorId: string;
  let coAuthorId: string;
  let topicId: string;
  let classId: string;

  beforeEach(async () => {
    const timestamp = Date.now();
    // 1. Create users
    const author = await prisma.admin.create({
      data: {
        name: 'Author',
        email: `author_${timestamp}@test.com`,
        password: 'pass',
        role: 'ADMIN'
      }
    });
    authorId = author.id;

    const coAuthor = await prisma.admin.create({
      data: {
        name: 'CoAuthor',
        email: `coauthor_${timestamp}@test.com`,
        password: 'pass',
        role: 'INSTRUCTOR'
      }
    });
    coAuthorId = coAuthor.id;

    const classObj = await prisma.class.create({
      data: { title: 'Test Class', path: `test-class-${timestamp}`, order: 1 }
    });
    classId = classObj.id;

    // 2. Create topic
    const topic = await prisma.topic.create({
      data: {
        title: 'Original Title',
        content: 'Original Content',
        path: `original-title-${timestamp}`,
        classId: classObj.id,
        order: 1,
        authorId: authorId
      }
    });
    topicId = topic.id;
  });

  it('should throw error when author tries to edit text and there is a pending revision', async () => {
    // 3. Co-author creates a pending revision (by trying to update)
    const revisionResult = await repository.update(
      topicId,
      'Original Title',
      'CoAuthor Suggestion', // Co-author changes text
      'original-title',
      classId,
      1, // order
      coAuthorId // userId
    );

    // Verify it returned a revision flag
    expect((revisionResult as any)._isRevision).toBe(true);

    // Verify revision is in DB
    const pendingCount = await prisma.topicRevision.count({ where: { topicId, status: 'PENDING' } });
    expect(pendingCount).toBe(1);

    // 4. Author tries to update text
    await expect(
      repository.update(
        topicId,
        'Original Title',
        'Author Edited Content', // Author changes text
        'original-title',
        classId,
        1, // order
        authorId // userId
      )
    ).rejects.toThrow(/revisões pendentes/i);
  });
});
