import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: any) {
	const url = new URL(req.url)
	const pathname = url.pathname
	const res = NextResponse.next()

	// Language persistence from ?lang to cookie; default via Accept-Language
	const qpLang = url.searchParams.get('lang')
	const cookieLang = req.cookies.get('lang')?.value
	let desiredLang = qpLang || cookieLang || ''
	if (!desiredLang) {
		const accept = req.headers.get('accept-language') || ''
		const first = accept.split(',')[0]?.trim() || 'en'
		desiredLang = first
	}
	if (qpLang && qpLang !== cookieLang) {
		res.cookies.set('lang', qpLang, { path: '/', sameSite: 'lax', httpOnly: false })
	}

	// Public paths allowed (but still set cookies)
	const publicPaths = ['/', '/signin', '/signup', '/privacy', '/security', '/contact']
	if (publicPaths.includes(pathname)) return res

	// Admin section must be admin
	if (pathname.startsWith('/admin')) {
		const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
		if (!token?.email || token?.role !== 'admin') {
			return NextResponse.redirect(new URL('/signin', url), { status: 302 })
		}
		return res
	}

	// App authenticated areas (allow public dashboard for conversion)
	if (pathname.startsWith('/contracts')) {
		const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
		if (!token?.email) {
			return NextResponse.redirect(new URL('/signin', url), { status: 302 })
		}
		return res
	}

	return res
}

export const config = {
	matcher: [
		'/api/:path*',
		'/(dashboard|contracts|admin)/:path*',
		'/',
	],
}
