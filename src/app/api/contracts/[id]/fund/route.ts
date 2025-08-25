import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { assertCanPerform } from '@/lib/state'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me) return new Response('Forbidden', { status: 403 })
  const { type } = await req.json()
  if (!['brand_budget','brand_deposit','creator_deposit'].includes(type)) return new Response('Bad type', { status: 400 })
  const contract = await prisma.contract.findUniqueOrThrow({ where: { id }, include: { brand: true, creator: true }})
  try { assertCanPerform(contract.state as any, 'fund') } catch { return new Response('Invalid state', { status: 409 }) }
  const amountCents = type === 'brand_budget' ? contract.budgetCents : type === 'brand_deposit' ? contract.brandDepositCents : contract.creatorDepositCents
  if (amountCents <= 0) return new Response('No amount for this funding type', { status: 400 })

  const pi = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: (contract.currency || 'CHF').toLowerCase(),
    capture_method: 'automatic',
    description: `Contract ${contract.id} ${type}`,
    metadata: { contractId: contract.id, type },
    automatic_payment_methods: { enabled: true },
  })

  const funding = await prisma.funding.create({ data: { contractId: id, type, amountCents, pspPaymentIntentId: pi.id, status: 'pending' }})
  await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: `FUNDING_INIT.${type}`, payload: { amountCents, pi: pi.id } }})
  const funds = await prisma.funding.findMany({ where: { contractId: id, status: 'succeeded' }})
  const hasBudget = funds.some(f=>f.type==='brand_budget')
  const hasBrandDep = contract.brandDepositCents === 0 || funds.some(f=>f.type==='brand_deposit')
  const hasCreatorDep = contract.creatorDepositCents === 0 || funds.some(f=>f.type==='creator_deposit')
  if (hasBudget && hasBrandDep && hasCreatorDep) {
    await prisma.contract.update({ where: { id }, data: { state: 'Funded' }})
    await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'FUNDED.all', payload: {} }})
  }
  return Response.json({ id: funding.id, client_secret: pi.client_secret })
}


