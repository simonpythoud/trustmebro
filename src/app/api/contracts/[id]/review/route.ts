import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me || me.role !== 'brand') return new Response('Forbidden', { status: 403 })
  const { decision, comment } = await req.json()
  if (!['approve','revise'].includes(decision)) return new Response('Bad decision', { status: 400 })
  const r = await prisma.review.create({ data: { contractId: params.id, reviewerId: me.id, decision, comment }})
  if (decision === 'approve') {
    await prisma.contract.update({ where: { id: params.id }, data: { state: 'Released' }})
    await prisma.contractEvent.create({ data: { contractId: params.id, actorId: me.id, type: 'APPROVED', payload: {} }})
  } else {
    await prisma.contract.update({ where: { id: params.id }, data: { state: 'RevisionsRequested' }})
    await prisma.contractEvent.create({ data: { contractId: params.id, actorId: me.id, type: 'REVISIONS_REQUESTED', payload: { comment } }})
  }
  return Response.json({ id: r.id })
}


