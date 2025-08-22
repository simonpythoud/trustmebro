import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me || me.role !== 'creator') return new Response('Forbidden', { status: 403 })
  const { url, platform, screenshots, notes } = await req.json()
  const sub = await prisma.submission.create({ data: { contractId: params.id, url, platform, screenshots, notes }})
  await prisma.contract.update({ where: { id: params.id }, data: { state: 'Submitted' }})
  await prisma.contractEvent.create({ data: { contractId: params.id, actorId: me.id, type: 'SUBMITTED', payload: { url } }})
  return Response.json({ id: sub.id })
}


