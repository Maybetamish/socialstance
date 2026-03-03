import path from 'node:path'
import type { PrismaConfig } from 'prisma'

export default {
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_9MWcTsAENft2@ep-purple-flower-a1r4s3n6.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  },
} satisfies PrismaConfig
