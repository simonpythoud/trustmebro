import { prisma } from '@/lib/prisma'

// Simplified webhook: mark funding by PI id as succeeded idempotently
export async function POST(req: Request) {
  const body = await req.json()
  const type = body?.type as string
  const id = body?.data?.object?.id as string
  if (!type || !id) return new Response('Bad payload', { status: 400 })

  if (type === 'payment_intent.succeeded') {
    try {
      await prisma.funding.update({ where: { pspPaymentIntentId: id }, data: { status: 'succeeded' }})
      await prisma.auditLog.create({ data: { action: 'WEBHOOK.pi.succeeded', resource: 'Funding', resourceId: id, metadata: body } })
    } catch {
      // ignore if not found or already updated
    }
  }
  return Response.json({ ok: true })
}


