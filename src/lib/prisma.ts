import { PrismaClient } from '@/generated/prisma'

const globalForPrisma = globalThis as unknown as { prismaGlobal?: PrismaClient }

export const prisma: PrismaClient = globalForPrisma.prismaGlobal ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaGlobal = prisma


