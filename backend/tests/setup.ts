import { beforeAll, afterAll, afterEach } from 'vitest';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

// 1. Load normal .env to get the base DATABASE_URL
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 2. Modify the DATABASE_URL to use a 'test' schema
const originalUrl = process.env.DATABASE_URL;
if (!originalUrl) {
  throw new Error('DATABASE_URL is not defined in .env');
}

// Append or replace the schema parameter
const testDbUrl = new URL(originalUrl);
testDbUrl.searchParams.set('schema', 'test');
process.env.DATABASE_URL = testDbUrl.toString();

// 3. Set Redis to use a separate test database (index 1) to avoid clearing dev cache
const originalRedisUrl = process.env.REDIS_URL || 'redis://redis:6379';
const testRedisUrl = new URL(originalRedisUrl);
testRedisUrl.pathname = '/1';
process.env.REDIS_URL = testRedisUrl.toString();

let prisma: any;

beforeAll(async () => {
  // Dynamically import prisma to ensure it uses the mutated env variables
  const mod = await import('../src/infrastructure/databases/prismaClient');
  prisma = mod.prisma;

  console.log('📦 Setting up test database schema...');
  execSync('npx prisma db push --accept-data-loss', {
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL,
    },
    stdio: 'inherit', // let output show
  });
});

afterAll(async () => {
  // Disconnect prisma after all tests
  await prisma.$disconnect();
});

afterEach(async () => {
  // Clean all tables after each test to ensure perfect isolation
  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='test'`;

  const tables = tableNames
    .map(({ tablename }: { tablename: string }) => tablename)
    .filter((name: string) => name !== '_prisma_migrations')
    .map((name: string) => `"test"."${name}"`)
    .join(', ');

  if (tables.length > 0) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    } catch (error) {
      console.log('Error truncating tables:', error);
    }
  }
});
