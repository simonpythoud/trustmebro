import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me) return new Response('Forbidden', { status: 403 })
  const { type, amountCents, pspPaymentIntentId } = await req.json()
  if (!['brand_budget','brand_deposit','creator_deposit'].includes(type)) return new Response('Bad type', { status: 400 })
  const funding = await prisma.funding.create({ data: { contractId: params.id, type, amountCents, pspPaymentIntentId, status: 'succeeded' }})
  await prisma.contractEvent.create({ data: { contractId: params.id, actorId: me.id, type: `FUNDED.${type}`, payload: { amountCents } }})
  const funds = await prisma.funding.findMany({ where: { contractId: params.id, status: 'succeeded' }})
  const contract = await prisma.contract.findUniqueOrThrow({ where: { id: params.id }})
  const hasBudget = funds.some(f=>f.type==='brand_budget')
  const hasBrandDep = contract.brandDepositCents === 0 || funds.some(f=>f.type==='brand_deposit')
  const hasCreatorDep = contract.creatorDepositCents === 0 || funds.some(f=>f.type==='creator_deposit')
  if (hasBudget && hasBrandDep && hasCreatorDep) {
    await prisma.contract.update({ where: { id: params.id }, data: { state: 'Funded' }})
    await prisma.contractEvent.create({ data: { contractId: params.id, actorId: me.id, type: 'FUNDED.all', payload: {} }})
  }
  return Response.json({ id: funding.id })
}


