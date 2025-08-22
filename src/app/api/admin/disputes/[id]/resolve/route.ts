import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me || me.role !== 'admin') return new Response('Forbidden', { status: 403 })
  const { resolution } = await req.json()
  if (!['released','refunded','split'].includes(resolution)) return new Response('Bad resolution', { status: 400 })
  const d = await prisma.dispute.update({ where: { id }, data: { status: 'resolved', resolution, resolvedAt: new Date() }})
  await prisma.contractEvent.create({ data: { contractId: d.contractId, actorId: me.id, type: 'ADMIN_RESOLVED', payload: { resolution }}})
  await prisma.auditLog.create({ data: { actorId: me.id, action: 'DISPUTE_RESOLVED', resource: 'Dispute', resourceId: d.id, metadata: { resolution } }})
  return Response.json({ ok: true })
}


