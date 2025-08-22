import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import { compare } from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const email = credentials?.email as string | undefined
				const password = credentials?.password as string | undefined
				if (!email || !password) return null
				const user = await prisma.user.findUnique({ where: { email } })
				if (!user?.passwordHash) return null
				const ok = await compare(password, user.passwordHash)
				if (!ok) return null
				return { id: user.id, email: user.email, name: user.name, role: user.role } as any
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				token.role = (user as any).role
			} else if (token?.email) {
				const u = await prisma.user.findUnique({ where: { email: token.email as string } })
				if (u) (token as any).role = u.role
			}
			return token
		},
		async session({ session, token }: any) {
			if (session.user) (session.user as any).role = (token as any).role
			return session
		},
	},
})


