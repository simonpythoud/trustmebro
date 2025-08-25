export default function SecurityPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
			<h1 className="text-3xl font-semibold">Security</h1>
			<p className="text-foreground/70">We take data protection and platform security seriously. Below is a summary adapted from the TrustMeBro spec.</p>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">Headers & HTTPS</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>Strict security headers: CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.</li>
					<li>HTTPS-only; HSTS preload enabled.</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">Auth, RBAC, audit</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>NextAuth with role-based access (brand, creator, admin).</li>
					<li>Middleware enforced on API and app sections; event timeline and audit logs for sensitive actions.</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">Payments</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>Stripe Connect (Standard) for onboarding and funds flow; signed webhook verification; idempotency at application layer.</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">Data & storage</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>PostgreSQL via Prisma; indices per access patterns; least-privilege credentials.</li>
					<li>Files (screenshots) via private S3 with signed URLs (planned).</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">Observability</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>Sentry and OpenTelemetry planned; correlation with contract/user/event IDs.</li>
				</ul>
			</section>
			<p className="text-foreground/60 text-sm">For details, see the TrustMeBro documentation (Security, Observability sections).</p>
		</main>
	)
}


