import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { UpdateSettingsSchema } from '@/lib/schemas'

export const runtime = 'nodejs'

export async function GET() {
  const session = await auth()
  const email = session?.user?.email
  if (!email) {
    console.warn('[api] /api/user/settings GET unauthorized')
    return new Response('Unauthorized', { status: 401 })
  }
  const user = await prisma.user.findUnique({
    where: { email },
    select: { settings: true },
  })
  if (!user) {
    console.warn('[api] /api/user/settings GET user not found')
    return new Response('Not found', { status: 404 })
  }
  return Response.json(user.settings)
}

export async function PUT(req: Request) {
  const session = await auth()
  const email = session?.user?.email
  if (!email) {
    console.warn('[api] /api/user/settings PUT unauthorized')
    return new Response('Unauthorized', { status: 401 })
  }
  const me = await prisma.user.findUnique({ where: { email }, select: { id: true } })
  if (!me) return new Response('Not found', { status: 404 })
  const body = await req.json().catch(() => null)
  const parsed = UpdateSettingsSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  const updated = await prisma.userSettings.upsert({
    where: { userId: me.id },
    create: { userId: me.id, ...parsed.data },
    update: parsed.data,
  })
  return Response.json(updated)
}


