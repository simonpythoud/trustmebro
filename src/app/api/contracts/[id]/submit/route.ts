import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me || me.role !== 'creator') return new Response('Forbidden', { status: 403 })
  const { url, platform, screenshots, notes } = await req.json()
  const sub = await prisma.submission.create({ data: { contractId: id, url, platform, screenshots, notes }})
  await prisma.contract.update({ where: { id }, data: { state: 'UnderReview' }})
  await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'SUBMITTED', payload: { url } }})
  return Response.json({ id: sub.id })
}


