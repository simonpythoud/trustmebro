import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { env } from '@/lib/env'
import { assertCanPerform } from '@/lib/state'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me || me.role !== 'brand') return new Response('Forbidden', { status: 403 })
  const { decision, comment } = await req.json()
  if (!['approve','revise'].includes(decision)) return new Response('Bad decision', { status: 400 })
  const { id } = await params
  const current = await prisma.contract.findUniqueOrThrow({ where: { id }})
  const action: 'approve' | 'revise' = decision
  try { assertCanPerform(current.state as any, action) } catch { return new Response('Invalid state', { status: 409 }) }
  const r = await prisma.review.create({ data: { contractId: id, reviewerId: me.id, decision, comment }})
  if (decision === 'approve') {
    // Capture budget PaymentIntent if present and authorized (manual capture flow)
    const budget = await prisma.funding.findFirst({ where: { contractId: id, type: 'brand_budget' }})
    if (budget) {
      try {
        const pi = await stripe.paymentIntents.retrieve(budget.pspPaymentIntentId)
        if ((pi.status as any) === 'requires_capture') {
          const captured = await stripe.paymentIntents.capture(budget.pspPaymentIntentId)
          if ((captured.status as any) === 'succeeded') {
            // Mark as succeeded immediately to avoid waiting on webhook
            await prisma.funding.update({ where: { id: budget.id }, data: { status: 'succeeded' }})
          } else {
            return new Response('Capture failed', { status: 502 })
          }
        } else if ((pi.status as any) === 'succeeded') {
          // already captured, nothing to do
        } else {
          return new Response('Budget not authorized for capture', { status: 409 })
        }
      } catch (e) {
        return new Response('Capture error', { status: 502 })
      }
    }
    await prisma.contract.update({ where: { id }, data: { state: 'Released' }})
    await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'APPROVED', payload: {} }})
    // Create platform Fee and Payout to creator. Attempt Stripe Transfer if Express.
    try {
      const existingPayout = await prisma.payout.findFirst({ where: { contractId: id }})
      if (!existingPayout) {
        const baseAmountCents = current.budgetCents
        const percentage = env.PLATFORM_FEE_PERCENT
        const feeAmountCents = Math.floor(baseAmountCents * percentage)
        const payoutAmountCents = Math.max(0, baseAmountCents - feeAmountCents)
        // Fee (idempotent-ish)
        const existingFee = await prisma.fee.findFirst({ where: { contractId: id }})
        if (!existingFee) {
          await prisma.fee.create({ data: { contractId: id, baseAmountCents, percentage, amountCents: feeAmountCents }})
        }
        // Payout row
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
          } catch (e) {
            // keep as queued
          }
        }
      }
    } catch {}
  } else {
    await prisma.contract.update({ where: { id }, data: { state: 'RevisionsRequested' }})
    await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'REVISIONS_REQUESTED', payload: { comment } }})
  }
  return Response.json({ id: r.id })
}


