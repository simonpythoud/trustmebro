import Link from 'next/link'
import { auth } from '@/lib/auth'

export default async function Home() {
	const session = await auth()
	return (
		<main className="p-6">
			<h1 className="text-2xl font-semibold mb-4">TrustMeBro</h1>
			{!session?.user ? (
				<Link href="/signin" className="underline">Sign in</Link>
			) : (
				<div className="space-y-2">
					<p>Signed in as {session.user.email}</p>
					<nav className="space-x-4">
						<Link href="/contracts/new" className="underline">Create contract</Link>
						<Link href="/api/contracts" className="underline">Contracts API</Link>
						{(session.user as any).role === 'admin' && (
							<Link href="/admin" className="underline">Admin</Link>
						)}
					</nav>
				</div>
			)}
		</main>
	)
}
