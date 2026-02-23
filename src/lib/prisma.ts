import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  try {
    return new PrismaClient({ log: ['error'] });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Prisma initialization error';
    throw new Error(
      `${message}\n\nPrisma Client is not generated. Run \"npm run prisma:generate\" (or \"npm install\") and restart the dev server.`
    );
  }
}

export const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
