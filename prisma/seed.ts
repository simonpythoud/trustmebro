import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	const pass = await hash('Passw0rd!', 10)

	const users = [
		{ email: 'brand@example.com', name: 'Brand', role: 'brand' as const },
		{ email: 'creator@example.com', name: 'Creator', role: 'creator' as const },
		{ email: 'admin@example.com', name: 'Admin', role: 'admin' as const },
		{ email: 'brand2@example.com', name: 'Brand Two', role: 'brand' as const },
		{ email: 'creator2@example.com', name: 'Creator Two', role: 'creator' as const },
	]

	for (const u of users) {
		await prisma.user.upsert({
			where: { email: u.email },
			update: {},
			create: { email: u.email, name: u.name, role: u.role, passwordHash: pass },
		})
	}

	console.log('Seeded default users.')
}

main().finally(async () => {
	await prisma.$disconnect()
})


