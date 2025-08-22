export { auth as middleware } from '@/lib/auth'

export const config = {
	matcher: [
		// Protect all API routes except auth and public
		'/api/:path*',
		// Protect app routes that need auth (adjust later)
		'/(dashboard|contracts|admin)/:path*',
	],
}
