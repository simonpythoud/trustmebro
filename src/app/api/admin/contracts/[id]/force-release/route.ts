import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { env } from '@/lib/env'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
	const { id } = await params
	const session = await auth()
	if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
	const me = await prisma.user.findUnique({ where: { email: session.user.email } })
	if (!me || me.role !== 'admin') return new Response('Forbidden', { status: 403 })
  // Best-effort capture if budget PI exists and requires_capture
  const budget = await prisma.funding.findFirst({ where: { contractId: id, type: 'brand_budget' }})
  if (budget) {
    try {
      const pi = await stripe.paymentIntents.retrieve(budget.pspPaymentIntentId)
      if ((pi.status as any) === 'requires_capture') {
        const captured = await stripe.paymentIntents.capture(budget.pspPaymentIntentId)
        if ((captured.status as any) === 'succeeded') {
          await prisma.funding.update({ where: { id: budget.id }, data: { status: 'succeeded' }})
        }
      }
    } catch {}
  }
	await prisma.contract.update({ where: { id }, data: { state: 'Released' }})
	await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'FORCE_RELEASE', payload: {} } })
	await prisma.auditLog.create({ data: { actorId: me.id, action: 'FORCE_RELEASE', resource: 'Contract', resourceId: id, metadata: {} } })
  // Create platform Fee and Payout similar to standard approve path
  try {
    const current = await prisma.contract.findUnique({ where: { id }})
    if (current) {
      const existingPayout = await prisma.payout.findFirst({ where: { contractId: id }})
      if (!existingPayout) {
        const baseAmountCents = current.budgetCents
        const percentage = env.PLATFORM_FEE_PERCENT
        const feeAmountCents = Math.floor(baseAmountCents * percentage)
        const payoutAmountCents = Math.max(0, baseAmountCents - feeAmountCents)
        const existingFee = await prisma.fee.findFirst({ where: { contractId: id }})
        if (!existingFee) {
          await prisma.fee.create({ data: { contractId: id, baseAmountCents, percentage, amountCents: feeAmountCents }})
        }
        const creator = await prisma.user.findUnique({ where: { id: current.creatorId }, include: { profile: true }})
        let created = await prisma.payout.create({ data: { contractId: id, beneficiaryId: current.creatorId, amountCents: payoutAmountCents, status: 'queued' }})
        if (env.STRIPE_CONNECT_TYPE === 'express' && creator?.profile?.pspAccountId) {
          try {
            const transfer = await stripe.transfers.create({
              amount: payoutAmountCents,
              currency: (current.currency || 'CHF').toLowerCase(),
              destination: creator.profile.pspAccountId,
              metadata: { contractId: id },
            })
            await prisma.payout.update({ where: { id: created.id }, data: { pspTransferId: transfer.id, status: (transfer.status as any) || 'queued' }})
          } catch (e) {}
        }
      }
    }
  } catch {}
	return Response.json({ ok: true })
}
