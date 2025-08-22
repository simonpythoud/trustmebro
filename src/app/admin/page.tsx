import Link from 'next/link'

export default async function AdminPage() {
	return (
		<main className="p-6 space-y-4">
			<h1 className="text-2xl font-semibold">Admin Console</h1>
			<p>This page requires admin privileges. Please <Link className="underline" href="/signin">sign in</Link>.</p>
		</main>
	)
}
