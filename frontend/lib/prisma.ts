import { PrismaClient } from '@prisma/client'
import pg from 'pg'

const { Pool } = pg

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaPromise: Promise<PrismaClient> | undefined
}

function createPrismaClient(): Promise<PrismaClient> {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  
  return import('@prisma/adapter-pg').then(({ PrismaPg }) => {
    const adapter = new PrismaPg(pool)
    return new PrismaClient({
      adapter: adapter as never,
      log: ['query'],
    })
  })
}

// Initialize or reuse existing promise
if (!globalForPrisma.prismaPromise) {
  globalForPrisma.prismaPromise = createPrismaClient()
}

// Export promise for explicit awaiting in API routes
// Usage: const prisma = await prisma
export const prisma: Promise<PrismaClient> = globalForPrisma.prismaPromise

// Also export direct getter for convenience (for use in components/getServerSideProps)
export async function getPrisma(): Promise<PrismaClient> {
  return prisma
}
