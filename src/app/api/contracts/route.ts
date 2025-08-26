import { prisma } from '@/lib/prisma'
import { getRequestUserEmail } from '@/lib/user'
import { CreateContractSchema } from '@/lib/schemas'

export const runtime = 'nodejs'

export async function GET(req: Request) {
	const email: string | null = await getRequestUserEmail()
	if (!email) return new Response('Unauthorized', { status: 401 })
	const url = new URL(req.url)
	const role = url.searchParams.get('role')
	if (role !== 'brand' && role !== 'creator') return new Response('Bad role', { status: 400 })
	const me = await prisma.user.findUnique({ where: { email } })
	if (!me) return new Response('Unauthorized', { status: 401 })
	const where = role === 'brand' ? { brandId: me.id } : { creatorId: me.id }
	const items = await prisma.contract.findMany({ where, orderBy: { createdAt: 'desc' } })
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
