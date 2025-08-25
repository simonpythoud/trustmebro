import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: any) {
	const url = new URL(req.url)
	const pathname = url.pathname
	// Public paths allowed
	const publicPaths = ['/', '/signin', '/signup', '/privacy', '/security', '/contact']
	if (publicPaths.includes(pathname)) return NextResponse.next()

	// Admin section must be admin
	if (pathname.startsWith('/admin')) {
		const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
		if (!token?.email || token?.role !== 'admin') {
			return NextResponse.redirect(new URL('/signin', url), { status: 302 })
		}
		return NextResponse.next()
	}

	// App authenticated areas
	if (pathname.startsWith('/dashboard') || pathname.startsWith('/contracts')) {
		const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
		if (!token?.email) {
			return NextResponse.redirect(new URL('/signin', url), { status: 302 })
		}
		return NextResponse.next()
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/api/:path*',
		'/(dashboard|contracts|admin)/:path*',
	],
}
