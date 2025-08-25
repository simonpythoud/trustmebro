import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { assertCanPerform } from '@/lib/state'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me || me.role !== 'brand') return new Response('Forbidden', { status: 403 })
  const current = await prisma.contract.findUniqueOrThrow({ where: { id }})
  try { assertCanPerform(current.state as any, 'propose') } catch { return new Response('Invalid state', { status: 409 }) }
  const c = await prisma.contract.update({ where: { id }, data: { state: 'Proposed' }})
  await prisma.contractEvent.create({ data: { contractId: c.id, actorId: me.id, type: 'PROPOSED', payload: {} }})
  return Response.json({ ok: true })
}


