import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(_req: Request, { params }: { params: { id: string }}) {
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me || me.role !== 'brand') return new Response('Forbidden', { status: 403 })
  const c = await prisma.contract.update({ where: { id: params.id }, data: { state: 'Proposed' }})
  await prisma.contractEvent.create({ data: { contractId: c.id, actorId: me.id, type: 'PROPOSED', payload: {} }})
  return Response.json({ ok: true })
}


