import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me) return new Response('Forbidden', { status: 403 })
  const { reason, evidence } = await req.json()
  const { id } = await params
  const d = await prisma.dispute.create({ data: { contractId: id, openerId: me.id, reason, evidence, status: 'open' }})
  await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'DISPUTED', payload: { reason } }})
  return Response.json({ id: d.id })
}


