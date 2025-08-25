export default function ContactPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
			<h1 className="text-3xl font-semibold">Contact</h1>
			<p className="text-foreground/70">Questions, incidents, or legal requests? Reach out using the details below. This page reflects the communication and support expectations in the spec.</p>
			<section className="grid gap-4 md:grid-cols-2 text-sm">
				<div className="rounded-lg border border-foreground/10 p-4">
					<div className="font-semibold">Support</div>
					<p className="text-foreground/70">Email: support@trustmebro.app</p>
				</div>
				<div className="rounded-lg border border-foreground/10 p-4">
					<div className="font-semibold">Security</div>
					<p className="text-foreground/70">Report vulnerabilities: security@trustmebro.app</p>
				</div>
				<div className="rounded-lg border border-foreground/10 p-4">
					<div className="font-semibold">Legal</div>
					<p className="text-foreground/70">Privacy & data rights: privacy@trustmebro.app</p>
				</div>
				<div className="rounded-lg border border-foreground/10 p-4">
					<div className="font-semibold">Press & partnerships</div>
					<p className="text-foreground/70">press@trustmebro.app</p>
				</div>
			</section>
			<p className="text-foreground/60 text-xs">Emails above are placeholders; set valid addresses in production.</p>
		</main>
	)
}


