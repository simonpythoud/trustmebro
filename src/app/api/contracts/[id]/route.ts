import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const session = await auth()
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
  const me = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!me) return new Response('Unauthorized', { status: 401 })
  const { id } = await params
  const c = await prisma.contract.findUnique({ where: { id }})
  if (!c) return new Response('Not found', { status: 404 })
  if (c.brandId !== me.id && c.creatorId !== me.id && me.role !== 'admin') return new Response('Forbidden', { status: 403 })
  return Response.json(c)
}


