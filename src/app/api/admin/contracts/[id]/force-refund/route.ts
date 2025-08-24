import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me || me.role !== 'admin') return new Response('Forbidden', { status: 403 })
  await prisma.contract.update({ where: { id }, data: { state: 'Closed' }})
  await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'FORCE_REFUND', payload: {} } })
  await prisma.auditLog.create({ data: { actorId: me.id, action: 'FORCE_REFUND', resource: 'Contract', resourceId: id, metadata: {} } })
  return Response.json({ ok: true })
}


