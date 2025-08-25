import { prisma } from '@/lib/prisma'
import { env } from '@/lib/env'

export const runtime = 'nodejs'

export async function POST() {
  if (!env.FEATURE_TEST_ENDPOINTS) return new Response('Not found', { status: 404 })
  const now = new Date()
  const candidates = await prisma.contract.findMany({
    where: { state: 'UnderReview' },
  })
  let count = 0
  for (const c of candidates) {
    const lastSubmit = await prisma.contractEvent.findFirst({ where: { contractId: c.id, type: 'SUBMITTED' }, orderBy: { createdAt: 'desc' } })
    if (!lastSubmit) continue
    const hours = c.autoApproveAfterH ?? 48
    const t = new Date(lastSubmit.createdAt.getTime() + hours * 3600 * 1000)
    if (now >= t) {
      await prisma.contract.update({ where: { id: c.id }, data: { state: 'Released' }})
      const exists = await prisma.contractEvent.findFirst({ where: { contractId: c.id, type: 'AUTO_APPROVE' }})
      if (!exists) {
        await prisma.contractEvent.create({ data: { contractId: c.id, actorId: null, type: 'AUTO_APPROVE', payload: {} }})
      }
      count++
    }
  }
  return Response.json({ autoApproved: count })
}


