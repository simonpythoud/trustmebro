import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me) return new Response('Forbidden', { status: 403 })
  const funds = await prisma.funding.findMany({ where: { contractId: id, status: 'succeeded' }})
  const c = await prisma.contract.findUniqueOrThrow({ where: { id }})
  const ok = funds.some(f=>f.type==='brand_budget') && (c.brandDepositCents===0 || funds.some(f=>f.type==='brand_deposit')) && (c.creatorDepositCents===0 || funds.some(f=>f.type==='creator_deposit'))
  if (!ok) return new Response('Funding incomplete', { status: 400 })
  await prisma.contract.update({ where: { id }, data: { state: 'InProgress' }})
  await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'STARTED', payload: {} }})
  return Response.json({ ok: true })
}


