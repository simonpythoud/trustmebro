import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
	const { id } = await params
	const session = await auth()
	if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
	const me = await prisma.user.findUnique({ where: { email: session.user.email } })
	if (!me || me.role !== 'admin') return new Response('Forbidden', { status: 403 })
	await prisma.contract.update({ where: { id }, data: { state: 'Released' }})
	await prisma.contractEvent.create({ data: { contractId: id, actorId: me.id, type: 'FORCE_RELEASE', payload: {} } })
	await prisma.auditLog.create({ data: { actorId: me.id, action: 'FORCE_RELEASE', resource: 'Contract', resourceId: id, metadata: {} } })
	return Response.json({ ok: true })
}
