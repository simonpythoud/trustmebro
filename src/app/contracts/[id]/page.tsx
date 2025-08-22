import { auth } from 'auth'

export const runtime = 'nodejs'

async function getContract(id: string) {
	const res = await fetch(`${process.env.NEXTAUTH_URL}/api/contracts/${id}`, { cache: 'no-store' })
	if (!res.ok) return null
	return res.json()
}

export default async function ContractDetail({ params }: { params: Promise<{ id: string }>}) {
	const { id } = await params
	const session = await auth()
	if (!session?.user) return <main className="p-6">Unauthorized</main>
	const contract = await getContract(id)
	if (!contract) return <main className="p-6">Not found</main>
	const role = (session.user as any).role as 'brand'|'creator'|'admin'
	async function fund(type: string) {
		'use server'
		await fetch(`${process.env.NEXTAUTH_URL}/api/contracts/${id}/fund`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type }) })
	}
	async function approve() {
		'use server'
		await fetch(`${process.env.NEXTAUTH_URL}/api/contracts/${id}/review`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ decision: 'approve' }) })
	}
	return (
		<main className="p-6 space-y-4">
			<h1 className="text-2xl font-semibold">{contract.title}</h1>
			<p>{contract.brief}</p>
			<div className="flex gap-2 items-center">
				<span className="text-sm text-gray-500">State:</span>
				<span data-testid={`state-${contract.state}`}>{contract.state}</span>
			</div>
			{role==='brand' && (
				<form action={async ()=> fund('brand_budget')}>
					<button data-testid="fund-brand-budget" className="bg-black text-white rounded px-3 py-1">Fund budget</button>
				</form>
			)}
			{role==='brand' && contract.brandDepositCents>0 && (
				<form action={async ()=> fund('brand_deposit')}>
					<button data-testid="fund-brand-deposit" className="bg-black text-white rounded px-3 py-1">Fund brand deposit</button>
				</form>
			)}
			{role==='creator' && contract.creatorDepositCents>0 && (
				<form action={async ()=> fund('creator_deposit')}>
					<button data-testid="fund-creator-deposit" className="bg-black text-white rounded px-3 py-1">Fund creator deposit</button>
				</form>
			)}
			{role==='creator' && (
				<form action={async ()=> {
					'use server'
					await fetch(`${process.env.NEXTAUTH_URL}/api/contracts/${id}/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: 'https://example.com', platform: 'tiktok', screenshots: [], notes: '' }) })
				}}>
					<input type="hidden" value="https://example.com" />
					<button data-testid="submission-send" className="bg-blue-600 text-white rounded px-3 py-1">Submit</button>
				</form>
			)}
			{role==='brand' && (
				<form action={approve}>
					<button data-testid="review-approve" className="bg-green-600 text-white rounded px-3 py-1">Approve</button>
				</form>
			)}
		</main>
	)
}
