export default function PrivacyPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
			<h1 className="text-3xl font-semibold">Privacy Policy (MVP)</h1>
			<p className="text-foreground/70">This outlines how TrustMeBro handles personal data as described in the product spec. A full legal policy will replace this MVP text.</p>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">Data we process</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>Account data: email, name, role (brand/creator/admin).</li>
					<li>Contract data: titles, briefs, deadlines, amounts, events.</li>
					<li>Payment metadata from PSP (Stripe), not card numbers.</li>
					<li>Submission metadata (URLs, platform, screenshots).</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">Purpose & legal basis</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>Contract execution between brands and creators.</li>
					<li>Compliance (KYC/AML via PSP, audit logs, dispute resolution).</li>
					<li>Security and fraud prevention.</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">Retention & rights</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>Retention aligned with legal requirements and dispute windows.</li>
					<li>Right of access, rectification, and erasure per GDPR/LPD; contact us to exercise rights.</li>
				</ul>
			</section>
			<p className="text-foreground/60 text-sm">For production, a lawyer-reviewed policy will be published. This MVP mirrors the privacy aspects in TrustMeBro.md.</p>
		</main>
	)
}


