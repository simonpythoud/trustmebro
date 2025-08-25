import { prisma } from '@/lib/prisma'
import { env } from '@/lib/env'
import { hash } from 'bcryptjs'

export const runtime = 'nodejs'

export async function POST() {
  if (!env.FEATURE_TEST_ENDPOINTS) return new Response('Not found', { status: 404 })
	const pass = await hash('Passw0rd!', 10)
	const users = await Promise.all([
		prisma.user.upsert({
			where: { email: 'brand@example.com' },
			update: {},
			create: { email: 'brand@example.com', name: 'Brand', role: 'brand', passwordHash: pass },
		}),
		prisma.user.upsert({
			where: { email: 'creator@example.com' },
			update: {},
			create: { email: 'creator@example.com', name: 'Creator', role: 'creator', passwordHash: pass },
		}),
		prisma.user.upsert({
			where: { email: 'admin@example.com' },
			update: {},
			create: { email: 'admin@example.com', name: 'Admin', role: 'admin', passwordHash: pass },
		}),
	])
	return Response.json({ users: users.map(u => ({ id: u.id, email: u.email, role: u.role })) })
}
