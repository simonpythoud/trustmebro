import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me) return new Response('Forbidden', { status: 403 })
  const { id } = await params
  const c = await prisma.contract.update({ where: { id }, data: { state: 'Cancelled' }})
  await prisma.contractEvent.create({ data: { contractId: c.id, actorId: me.id, type: 'CANCELLED.request', payload: {} }})
  return Response.json({ ok: true })
}


