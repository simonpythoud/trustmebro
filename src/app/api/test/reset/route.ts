import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function POST() {
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
