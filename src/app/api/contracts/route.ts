import { prisma } from '@/lib/prisma'
import { getRequestUserEmail } from '@/lib/user'
import { CreateContractSchema } from '@/lib/schemas'

export const runtime = 'nodejs'

export async function GET() {
	const email: string | null = await getRequestUserEmail()
	if (!email) {
		console.warn('[api] /api/contracts GET unauthorized')
		return new Response('Unauthorized', { status: 401 })
	}
	const me = await prisma.user.findUnique({ where: { email } })
	if (!me) {
		console.warn('[api] /api/contracts GET user not found')
		return new Response('Unauthorized', { status: 401 })
	}
	// Return all contracts where the user participates (brand or creator)
	const items = await prisma.contract.findMany({
		where: { OR: [{ brandId: me.id }, { creatorId: me.id }] },
		orderBy: { createdAt: 'desc' },
		include: {
			brand: {
				select: {
					name: true,
					email: true,
					profile: { select: { companyName: true } },
				},
			},
			creator: { select: { name: true, email: true } },
		},
	})
	return Response.json(items)
}

export async function POST(req: Request) {
	const email: string | null = await getRequestUserEmail()
	if (!email) return new Response('Unauthorized', { status: 401 })
	const user = await prisma.user.findUnique({ where: { email } })
	if (!user || user.role !== 'brand') return new Response('Forbidden', { status: 403 })

	const body = await req.json()
	const parsed = CreateContractSchema.safeParse(body)
	if (!parsed.success) return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 })
	const input = parsed.data

	const contract = await prisma.contract.create({
		data: {
			title: input.title,
			brief: input.brief,
			deliverableType: input.deliverable.platform as any,
			deliverableRequirements: { durationSec: input.deliverable.durationSec },
			hashtags: input.deliverable.hashtags,
			productName: input.title,
			productValueCents: input.productValueCents,
			currency: (input as any).currency ?? 'CHF',
			budgetCents: input.budgetCents,
			creatorDepositCents: input.creatorDepositCents,
			brandDepositCents: input.brandDepositCents,
			deadlineAt: new Date(input.deadlineAt),
			autoApproveAfterH: 48,
			brand: { connect: { id: user.id } },
			creator: { connect: { id: input.creatorId } },
		},
	})

	await prisma.contractEvent.create({
		data: { contractId: contract.id, actorId: user.id, type: 'DRAFT_CREATED', payload: {} },
	})

	return new Response(JSON.stringify({ id: contract.id }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}
