import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST() {
	const session = await auth()
	if (!session?.user?.email) return new Response('Unauthorized', { status: 401 })
	const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { profile: true } })
	if (!user) return new Response('Unauthorized', { status: 401 })
	let accountId = user.profile?.pspAccountId
	if (!accountId) {
		const account = await stripe.accounts.create({ type: 'standard', email: user.email || undefined })
		await prisma.profile.upsert({
			where: { userId: user.id },
			update: { pspAccountId: account.id },
			create: { userId: user.id, pspAccountId: account.id },
		})
		accountId = account.id
	}
	const origin = process.env.NEXTAUTH_URL!
	const link = await stripe.accountLinks.create({
		account: accountId,
		refresh_url: `${origin}/settings/billing`,
		return_url: `${origin}/settings/billing?status=connected`,
		type: 'account_onboarding',
	})
	return Response.json({ url: link.url })
}
