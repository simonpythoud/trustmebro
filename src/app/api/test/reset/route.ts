import { prisma } from '@/lib/prisma'
import { env } from '@/lib/env'

export const runtime = 'nodejs'

export async function POST() {
  if (!env.FEATURE_TEST_ENDPOINTS) return new Response('Not found', { status: 404 })
	await prisma.review.deleteMany({})
	await prisma.submission.deleteMany({})
	await prisma.funding.deleteMany({})
	await prisma.dispute.deleteMany({})
	await prisma.fee.deleteMany({})
	await prisma.payout.deleteMany({})
	await prisma.contractEvent.deleteMany({})
	await prisma.contract.deleteMany({})
	return Response.json({ ok: true })
}
