import { prisma } from '@/lib/prisma'
import { stripe, serializeStripeEvent } from '@/lib/stripe'

export const runtime = 'nodejs'

// Simplified webhook: mark funding by PI id as succeeded idempotently
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')
  const whsec = process.env.STRIPE_WEBHOOK_SECRET
  const text = await req.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(text, sig!, whsec!)
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
  const type = event.type
  const id = (event.data.object as any)?.id as string
  if (!type || !id) return new Response('Bad payload', { status: 400 })

  if (type === 'payment_intent.succeeded') {
    try {
      const updated = await prisma.funding.update({ where: { pspPaymentIntentId: id }, data: { status: 'succeeded' }})
      // If all funds for contract are succeeded, move to Funded
      const funds = await prisma.funding.findMany({ where: { contractId: updated.contractId, status: 'succeeded' }})
      const c = await prisma.contract.findUnique({ where: { id: updated.contractId }})
      if (c) {
        // Do not downgrade or change state if already terminal
        const terminalStates = ['Released','Closed','Expired','Cancelled','AdminResolved'] as const
        if (terminalStates.includes(c.state as any)) {
          await prisma.auditLog.create({ data: { action: 'WEBHOOK.ignored_terminal', resource: 'Contract', resourceId: c.id, metadata: { type, pi: id, state: c.state } } })
          return Response.json({ received: true })
        }
        const hasBudget = funds.some(f=>f.type==='brand_budget')
        const hasBrandDep = c.brandDepositCents===0 || funds.some(f=>f.type==='brand_deposit')
        const hasCreatorDep = c.creatorDepositCents===0 || funds.some(f=>f.type==='creator_deposit')
        if (hasBudget && hasBrandDep && hasCreatorDep) {
          if (c.state !== 'Funded' && c.state !== 'InProgress') {
            await prisma.contract.update({ where: { id: c.id }, data: { state: 'Funded' }})
            const fundedEvent = await prisma.contractEvent.findFirst({ where: { contractId: c.id, type: 'FUNDED.all' }})
            if (!fundedEvent) {
              await prisma.contractEvent.create({ data: { contractId: c.id, actorId: null, type: 'FUNDED.all', payload: {} }})
            }
          }
          // Immediately move to InProgress if fully funded and not already progressed
          if (c.state !== 'InProgress') {
            await prisma.contract.update({ where: { id: c.id }, data: { state: 'InProgress' }})
            const startedEvent = await prisma.contractEvent.findFirst({ where: { contractId: c.id, type: 'STARTED.auto' }})
            if (!startedEvent) {
              await prisma.contractEvent.create({ data: { contractId: c.id, actorId: null, type: 'STARTED.auto', payload: {} }})
            }
          }
        }
      }
      await prisma.auditLog.create({ data: { action: 'WEBHOOK.pi.succeeded', resource: 'Funding', resourceId: id, metadata: serializeStripeEvent(event) } })
    } catch {}
  }

  // Track transfers for payouts if configured (Express). Stripe fires `transfer.created/updated/reversed`.
  const typeStr = type as unknown as string
  if (typeStr === 'transfer.created' || typeStr === 'transfer.updated' || typeStr === 'transfer.reversed') {
    const transfer = event.data.object as any
    const transferId = transfer?.id as string
    if (transferId) {
      try {
        const payout = await prisma.payout.findFirst({ where: { pspTransferId: transferId }})
        if (payout) {
          let status = payout.status
          if (typeStr === 'transfer.reversed') status = 'failed'
          await prisma.payout.update({ where: { id: payout.id }, data: { status }})
        }
        await prisma.auditLog.create({ data: { action: `WEBHOOK.${typeStr}`, resource: 'Payout', resourceId: transferId, metadata: serializeStripeEvent(event) } })
      } catch {}
    }
  }
  return Response.json({ received: true })
}


