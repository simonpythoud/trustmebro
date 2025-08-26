import { auth } from '@/lib/auth'
import { StateBadge } from '../../components/StateBadge'
import { cookies, headers } from 'next/headers'
import { getT, normalizeLocale } from '@/lib/i18n'

export const runtime = 'nodejs'

async function getOrigin() {
	const h = await headers()
	const proto = h.get('x-forwarded-proto') || 'https'
	const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000'
	return `${proto}://${host}`
}

async function getContract(id: string) {
	const cookie = (await cookies()).toString()
	const origin = await getOrigin()
	const res = await fetch(`${origin}/api/contracts/${id}`, { cache: 'no-store', headers: { cookie } })
	if (!res.ok) return null
	return res.json()
}

export default async function ContractDetail({ params }: { params: Promise<{ id: string }>}) {
	const { id } = await params
	const session = await auth()
	const cookieStore = await cookies()
	const locale = normalizeLocale(cookieStore.get('lang')?.value || 'en')
	const t = getT(locale)
	if (!session?.user) return <main className="mx-auto max-w-4xl px-6 py-16">{t('contracts.detail.unauthorized')}</main>
	const contract = await getContract(id)
	if (!contract) return <main className="mx-auto max-w-4xl px-6 py-16">{t('contracts.detail.notFound')}</main>
	const role = (session.user as any).role as 'brand'|'creator'|'admin'

	async function fundBrandBudget() {
		'use server'
		const cookie = (await cookies()).toString()
		const origin = await getOrigin()
		await fetch(`${origin}/api/contracts/${id}/fund`, { method: 'POST', headers: { 'Content-Type': 'application/json', cookie }, body: JSON.stringify({ type: 'brand_budget' }) })
	}

	async function fundBrandDeposit() {
		'use server'
		const cookie = (await cookies()).toString()
		const origin = await getOrigin()
		await fetch(`${origin}/api/contracts/${id}/fund`, { method: 'POST', headers: { 'Content-Type': 'application/json', cookie }, body: JSON.stringify({ type: 'brand_deposit' }) })
	}

	async function fundCreatorDeposit() {
		'use server'
		const cookie = (await cookies()).toString()
		const origin = await getOrigin()
		await fetch(`${origin}/api/contracts/${id}/fund`, { method: 'POST', headers: { 'Content-Type': 'application/json', cookie }, body: JSON.stringify({ type: 'creator_deposit' }) })
	}
	async function approve() {
		'use server'
		const cookie = (await cookies()).toString()
		const origin = await getOrigin()
		await fetch(`${origin}/api/contracts/${id}/review`, { method: 'POST', headers: { 'Content-Type': 'application/json', cookie }, body: JSON.stringify({ decision: 'approve' }) })
	}
	return (
		<main className="mx-auto max-w-4xl px-6 py-10 space-y-6">
			<div className="flex items-start justify-between">
				<div>
					<h1 className="text-3xl font-semibold">{contract.title}</h1>
					<p className="mt-2 text-foreground/70">{contract.brief}</p>
				</div>
				<div className="mt-1" data-testid={`state-${contract.state}`}><StateBadge state={contract.state} label={t(`state.${contract.state}`)} /></div>
			</div>
			{role==='brand' && (
				<form action={fundBrandBudget}>
					<button data-testid="fund-brand-budget" className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">{t('contracts.detail.fundBudget')}</button>
				</form>
			)}
			{role==='brand' && contract.brandDepositCents>0 && (
				<form action={fundBrandDeposit}>
					<button data-testid="fund-brand-deposit" className="inline-flex items-center rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/5">{t('contracts.detail.fundBrandDeposit')}</button>
				</form>
			)}
			{role==='creator' && contract.creatorDepositCents>0 && (
				<form action={fundCreatorDeposit}>
					<button data-testid="fund-creator-deposit" className="inline-flex items-center rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/5">{t('contracts.detail.fundCreatorDeposit')}</button>
				</form>
			)}
			{role==='creator' && (
				<form action={async ()=>{
					'use server'
					const cookie = (await cookies()).toString()
					const origin = await getOrigin()
					await fetch(`${origin}/api/contracts/${id}/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json', cookie }, body: JSON.stringify({ url: 'https://example.com', platform: 'tiktok', screenshots: [], notes: '' }) })
				}}>
					<input type="hidden" value="https://example.com" />
					<button data-testid="submission-send" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95">{t('contracts.detail.submit')}</button>
				</form>
			)}
			{role==='brand' && (
				<form action={approve}>
					<button data-testid="review-approve" className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95">{t('contracts.detail.approve')}</button>
				</form>
			)}
		</main>
	)
}
