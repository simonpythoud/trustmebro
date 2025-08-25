export default function StatusPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
			<h1 className="text-3xl font-semibold">Status</h1>
			<p className="text-foreground/70">Current operational status of the TrustMeBro platform. For incidents and maintenance windows, updates will appear here.</p>
			<section className="rounded-lg border border-foreground/10 p-4 text-sm">
				<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> All systems operational</div>
				<p className="mt-2 text-foreground/60">MVP placeholder. Connect to an external status page provider or store incident posts here.</p>
			</section>
		</main>
	)
}


