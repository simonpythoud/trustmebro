import Link from 'next/link'

export default async function Home() {
	return (
		<main>
			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(800px_400px_at_-10%_20%,rgba(16,185,129,0.18),transparent)]" />
				<div className="mx-auto max-w-6xl px-6 py-20">
					<div className="flex flex-col items-start gap-6">
						<span className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs tracking-wide">
							Built for brands and creators
						</span>
						<h1 className="text-4xl md:text-6xl font-semibold leading-tight">
							Secure collaborations that actually deliver
						</h1>
						<p className="max-w-2xl text-base md:text-lg text-foreground/80">
							TrustMeBro is the escrow + contract layer for influencer collaborations. Both sides deposit, deliverables are verified, and payouts are automatic.
						</p>
						<div className="flex flex-wrap items-center gap-3">
							<Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">
								Get started — it’s free
							</Link>
							<Link href="/contracts/new" className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-5 py-3 text-sm font-medium hover:bg-foreground/5 transition">
								Create a contract
							</Link>
						</div>
						<div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-foreground/60">
							<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />Escrow-backed</div>
							<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />Auto-approve in 48h</div>
							<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-amber-500" />Admin resolution</div>
						</div>
					</div>
				</div>
			</section>

			{/* Trust Bar */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
					<div>
						<div className="font-semibold">Dual-deposit escrow</div>
						<p className="text-foreground/70">Both brand and creator commit funds to start.</p>
					</div>
					<div>
						<div className="font-semibold">Legally-binding contract</div>
						<p className="text-foreground/70">Digital signatures with verifiable audit trail.</p>
					</div>
					<div>
						<div className="font-semibold">Auto payouts</div>
						<p className="text-foreground/70">Approve or auto-approve after 48h.</p>
					</div>
					<div>
						<div className="font-semibold">Dispute resolution</div>
						<p className="text-foreground/70">Admin can release, refund or split.</p>
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<h2 className="text-2xl md:text-3xl font-semibold">How it works</h2>
					<div className="mt-8 grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
							<div className="text-sm font-semibold">1) Agree the brief</div>
							<p className="mt-2 text-foreground/70">Create a contract with deliverables, deadline and deposits.</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
							<div className="text-sm font-semibold">2) Fund the escrow</div>
							<p className="mt-2 text-foreground/70">Brand funds budget, both sides fund deposits. Work starts.</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
							<div className="text-sm font-semibold">3) Deliver & release</div>
							<p className="mt-2 text-foreground/70">Creator submits the link. Brand approves (or auto-approve), payouts trigger.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Value props */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<div className="grid gap-10 md:grid-cols-2 items-center">
						<div className="space-y-4">
							<h3 className="text-xl md:text-2xl font-semibold">Why TrustMeBro</h3>
							<ul className="space-y-3 text-foreground/80 text-sm">
								<li>• Zero ghosting: funds are committed up-front.</li>
								<li>• Transparent states: every step logged as an event.</li>
								<li>• Fair outcomes: cancellations and disputes handled cleanly.</li>
								<li>• Built for EU/CH compliance and GDPR.</li>
							</ul>
							<div className="pt-2">
								<Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:opacity-95 transition">
									Create your first contract in minutes
								</Link>
							</div>
						</div>
						<div className="rounded-xl border border-foreground/10 bg-background/60 p-6">
							<div className="grid grid-cols-2 gap-4 text-center">
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold">48h</div>
									<div className="text-xs text-foreground/60">Auto-approve window</div>
								</div>
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold">100%</div>
									<div className="text-xs text-foreground/60">Funds traceability</div>
								</div>
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold">2x</div>
									<div className="text-xs text-foreground/60">Mutual deposits</div>
								</div>
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold"><span className="align-top">CHF</span></div>
									<div className="text-xs text-foreground/60">Currency-first (v1)</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Security */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<h3 className="text-xl md:text-2xl font-semibold">Security & compliance</h3>
					<div className="mt-6 grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<div className="font-semibold">CSP + HSTS</div>
							<p className="mt-1 text-foreground/70">Strict security headers and HTTPS-only.
							</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<div className="font-semibold">Audit trail</div>
							<p className="mt-1 text-foreground/70">Every transition and payout is logged for proof.
							</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<div className="font-semibold">KYC-ready</div>
							<p className="mt-1 text-foreground/70">Stripe Connect onboarding for payouts and compliance.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<h3 className="text-xl md:text-2xl font-semibold">What early users say</h3>
					<div className="mt-6 grid gap-6 md:grid-cols-3">
						<figure className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<blockquote className="text-foreground/80">“No more chasing invoices. We approve and the money moves.”</blockquote>
							<figcaption className="mt-3 text-foreground/60">— Brand owner, CH</figcaption>
						</figure>
						<figure className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<blockquote className="text-foreground/80">“Deposits make everyone serious. It’s finally fair.”</blockquote>
							<figcaption className="mt-3 text-foreground/60">— Creator, FR</figcaption>
						</figure>
						<figure className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<blockquote className="text-foreground/80">“The contract + escrow combo is exactly what was missing.”</blockquote>
							<figcaption className="mt-3 text-foreground/60">— Agency, EU</figcaption>
						</figure>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16 text-center">
					<h3 className="text-2xl md:text-3xl font-semibold">Ready to collaborate with confidence?</h3>
					<p className="mt-3 text-foreground/70 max-w-2xl mx-auto">Spin up a contract, fund the escrow, and protect both sides. It takes 2 minutes.</p>
					<div className="mt-6 flex justify-center gap-3">
						<Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">
							Sign up / Sign in
						</Link>
						<Link href="/contracts/new" className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-5 py-3 text-sm font-medium hover:bg-foreground/5 transition">
							Draft a contract
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}
