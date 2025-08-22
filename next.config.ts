import type { NextConfig } from "next";

const securityHeaders = [
	{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'X-Frame-Options', value: 'DENY' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{ key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=()' },
	{ key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';" },
]

const nextConfig: NextConfig = {
	serverExternalPackages: ['openid-client', 'jose'],
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	async headers() {
		return [
			{ source: '/(.*)', headers: securityHeaders },
		]
	},
};

export default nextConfig;
