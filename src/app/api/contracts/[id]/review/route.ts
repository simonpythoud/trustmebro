import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
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
    await prisma.contract.update({ where: { id }, data: { state: 'Released' }})
    await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'APPROVED', payload: {} }})
  } else {
    await prisma.contract.update({ where: { id }, data: { state: 'RevisionsRequested' }})
    await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'REVISIONS_REQUESTED', payload: { comment } }})
  }
  return Response.json({ id: r.id })
}


