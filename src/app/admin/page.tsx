import Link from 'next/link'

export default async function AdminPage() {
	return (
		<main className="mx-auto max-w-4xl px-6 py-10 space-y-6">
			<h1 className="text-3xl font-semibold">Admin Console</h1>
			<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
				<p>Access disputes, force actions, and PSP logs (MVP).</p>
				<ul className="mt-3 list-disc pl-5 space-y-1 text-foreground/70">
					<li><Link className="underline" href="/signin">Sign in</Link> with an admin account</li>
					<li>API: <code>/api/admin/disputes</code>, <code>/api/admin/contracts/:id/force-*</code></li>
				</ul>
			</div>
		</main>
	)
}
