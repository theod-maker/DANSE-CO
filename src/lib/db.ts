import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '../generated/prisma/client.ts'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createPrismaClient(): PrismaClient {
  const connectionString = process.env['DATABASE_URL']
  if (!connectionString) {
    throw new Error('DATABASE_URL manquant — la connexion à la base est impossible')
  }

  return new PrismaClient({ adapter: new PrismaNeon({ connectionString }) })
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
