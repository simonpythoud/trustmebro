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
        const hasBudget = funds.some(f=>f.type==='brand_budget')
        const hasBrandDep = c.brandDepositCents===0 || funds.some(f=>f.type==='brand_deposit')
        const hasCreatorDep = c.creatorDepositCents===0 || funds.some(f=>f.type==='creator_deposit')
        if (hasBudget && hasBrandDep && hasCreatorDep) {
          await prisma.contract.update({ where: { id: c.id }, data: { state: 'Funded' }})
          await prisma.contractEvent.create({ data: { contractId: c.id, actorId: null, type: 'FUNDED.all', payload: {} }})
        }
      }
      await prisma.auditLog.create({ data: { action: 'WEBHOOK.pi.succeeded', resource: 'Funding', resourceId: id, metadata: serializeStripeEvent(event) } })
    } catch {}
  }
  return Response.json({ received: true })
}


