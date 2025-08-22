import Link from 'next/link'

export default async function Home() {
	return (
		<main className="p-6">
			<h1 className="text-2xl font-semibold mb-4">TrustMeBro</h1>
			<nav className="space-x-4">
				<Link href="/signin" className="underline">Sign in</Link>
				<Link href="/dashboard" className="underline">Dashboard</Link>
				<Link href="/contracts/new" className="underline">Create contract</Link>
			</nav>
		</main>
	)
}
