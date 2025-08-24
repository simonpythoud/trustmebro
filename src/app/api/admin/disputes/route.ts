import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me || me.role !== 'admin') return new Response('Forbidden', { status: 403 })
  const url = new URL(req.url)
  const status = url.searchParams.get('status') || 'open'
  const items = await prisma.dispute.findMany({ where: { status: status as any }, orderBy: { createdAt: 'desc' } })
  return Response.json(items)
}


