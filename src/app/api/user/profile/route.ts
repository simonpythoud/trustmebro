import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { UpdateProfileSchema } from '@/lib/schemas'

export const runtime = 'nodejs'

export async function GET() {
  const session = await auth()
  const email = session?.user?.email
  if (!email) {
    console.warn('[api] /api/user/profile GET unauthorized')
    return new Response('Unauthorized', { status: 401 })
  }
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      profile: { select: { companyName: true, vatId: true, address: true, country: true, searchable: true, socialTikTok: true, socialInstagram: true, socialYouTube: true, socialTwitter: true, socialLinkedIn: true, socialTwitch: true } },
      settings: { select: { theme: true, language: true, region: true, timeZone: true, emailNotifications: true, marketingEmails: true } },
    },
  })
  if (!user) {
    console.warn('[api] /api/user/profile GET user not found')
    return new Response('Not found', { status: 404 })
  }
  return Response.json(user)
}

export async function PUT(req: Request) {
  const session = await auth()
  const email = session?.user?.email
  if (!email) {
    console.warn('[api] /api/user/profile PUT unauthorized')
    return new Response('Unauthorized', { status: 401 })
  }
  const body = await req.json().catch(() => null)
  const parsed = UpdateProfileSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  const me = await prisma.user.findUnique({ where: { email }, select: { id: true } })
  if (!me) return new Response('Not found', { status: 404 })
  const updated = await prisma.profile.upsert({
    where: { userId: me.id },
    create: { userId: me.id, ...parsed.data },
    update: parsed.data,
  })
  return Response.json(updated)
}


