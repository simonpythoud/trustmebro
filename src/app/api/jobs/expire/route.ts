import { prisma } from '@/lib/prisma'
import { env } from '@/lib/env'

export const runtime = 'nodejs'

// Naive expiration job: mark contracts past deadline and not yet Released/Cancelled as Expired
export async function POST() {
  if (!env.FEATURE_TEST_ENDPOINTS) return new Response('Not found', { status: 404 })
	const now = new Date()
	const candidates = await prisma.contract.findMany({
		where: {
			deadlineAt: { lt: now },
			state: { in: ['Draft','Proposed','Accepted','Funded','InProgress','UnderReview','RevisionsRequested'] as any },
		},
	})
	let expired = 0
	for (const c of candidates) {
		await prisma.contract.update({ where: { id: c.id }, data: { state: 'Expired' }})
		await prisma.contractEvent.create({ data: { contractId: c.id, actorId: null, type: 'EXPIRED', payload: {} }})
		expired++
	}
	return Response.json({ expired })
}


