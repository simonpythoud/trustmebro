import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { SignUpSchema } from '@/lib/schemas'
import { hash } from 'bcryptjs'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = SignUpSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const { email, password, name, role } = parsed.data
  const passwordHash = await hash(password, 10)
  try {
    const user = await prisma.user.create({
      data: { email, name, role, passwordHash, profile: { create: {} }, settings: { create: {} } },
      select: { id: true, email: true, name: true, role: true },
    })
    return Response.json(user, { status: 201 })
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return Response.json({ error: 'Email already in use' }, { status: 409 })
    }
    return Response.json({ error: 'Unable to create account' }, { status: 500 })
  }
}


