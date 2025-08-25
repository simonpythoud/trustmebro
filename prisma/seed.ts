import { PrismaClient, type Role, type ContractState, type FundingType } from '../src/generated/prisma'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function upsertUsers() {
	const pass = await hash('Passw0rd!', 10)
	const users: Array<{ email: string; name: string; role: Role }> = [
		{ email: 'brand@example.com', name: 'Brand', role: 'brand' },
		{ email: 'brand2@example.com', name: 'Brand Two', role: 'brand' },
		{ email: 'brand3@example.com', name: 'Brand Three', role: 'brand' },
		{ email: 'creator@example.com', name: 'Creator', role: 'creator' },
		{ email: 'creator2@example.com', name: 'Creator Two', role: 'creator' },
		{ email: 'creator3@example.com', name: 'Creator Three', role: 'creator' },
		{ email: 'admin@example.com', name: 'Admin', role: 'admin' },
	]
	for (const u of users) {
		await prisma.user.upsert({
			where: { email: u.email },
			update: {},
			create: { email: u.email, name: u.name, role: u.role, passwordHash: pass },
		})
	}
	// Minimal profiles with placeholder PSP ids
	const all = await prisma.user.findMany()
	for (const u of all) {
		await prisma.profile.upsert({
			where: { userId: u.id },
			update: { companyName: u.role === 'brand' ? `${u.name ?? 'Brand'} GmbH` : undefined, country: 'CH', pspAccountId: `acct_TEST_${u.id.slice(0,6)}` },
			create: { userId: u.id, companyName: u.role === 'brand' ? `${u.name ?? 'Brand'} GmbH` : undefined, country: 'CH', pspAccountId: `acct_TEST_${u.id.slice(0,6)}` },
		})
	}
	return {
		brand1: await prisma.user.findUniqueOrThrow({ where: { email: 'brand@example.com' } }),
		brand2: await prisma.user.findUniqueOrThrow({ where: { email: 'brand2@example.com' } }),
		brand3: await prisma.user.findUniqueOrThrow({ where: { email: 'brand3@example.com' } }),
		creator1: await prisma.user.findUniqueOrThrow({ where: { email: 'creator@example.com' } }),
		creator2: await prisma.user.findUniqueOrThrow({ where: { email: 'creator2@example.com' } }),
		creator3: await prisma.user.findUniqueOrThrow({ where: { email: 'creator3@example.com' } }),
		admin: await prisma.user.findUniqueOrThrow({ where: { email: 'admin@example.com' } }),
	}
}

function addHours(d: Date, h: number) { return new Date(d.getTime() + h * 3600 * 1000) }

async function seedContract(params: {
	brandId: string
	creatorId: string
	state: ContractState
	title: string
	budgetCents: number
	creatorDepositCents?: number
	brandDepositCents?: number
	currency?: 'CHF' | 'EUR' | 'USD'
	deadlineAt: Date
}) {
	const {
		brandId, creatorId, state, title, budgetCents,
		creatorDepositCents = 10000,
		brandDepositCents = 5000,
		currency = 'CHF',
		deadlineAt,
	} = params

	const base = await prisma.contract.create({
		data: {
			title,
			brief: 'Seeded demo contract. Showcase of state machine and flows.',
			deliverableType: 'tiktok',
			deliverableRequirements: { durationSec: 30 },
			hashtags: ['#trustmebro', '#demo'],
			productName: 'Demo Product',
			productValueCents: 2000,
			currency,
			budgetCents,
			creatorDepositCents,
			brandDepositCents,
			deadlineAt,
			autoApproveAfterH: 48,
			brand: { connect: { id: brandId } },
			creator: { connect: { id: creatorId } },
			state: 'Draft',
		},
	})

	const ev = (type: string, payload: any = {}, actorId?: string | null) =>
		prisma.contractEvent.create({ data: { contractId: base.id, actorId: actorId ?? null, type, payload } })

	await ev('DRAFT_CREATED', {})

	const fund = async (type: FundingType, amountCents: number, succeed = true) => {
		const pi = `pi_${base.id}_${type}`
		await prisma.funding.create({ data: { contractId: base.id, type, amountCents, pspPaymentIntentId: pi, status: succeed ? 'succeeded' : 'pending' } })
		await ev(`FUNDING_INIT.${type}`, { pi, amountCents })
		if (succeed) await ev(`FUNDED.${type}`, { pi })
	}

	// Progress to requested state
	if (state !== 'Draft') {
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'Proposed' } })
		await ev('PROPOSED', {}, brandId)
	}
	if (['Accepted','Funded','InProgress','Submitted','UnderReview','RevisionsRequested','Released','Cancelled','Expired','Disputed','AdminResolved','Closed'].includes(state)) {
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'Accepted' } })
		await ev('ACCEPTED', {}, creatorId)
	}
	if (['Funded','InProgress','Submitted','UnderReview','RevisionsRequested','Released','Cancelled','Expired','Disputed','AdminResolved','Closed'].includes(state)) {
		await fund('brand_budget', budgetCents, true)
		if (brandDepositCents > 0) await fund('brand_deposit', brandDepositCents, true)
		if (creatorDepositCents > 0) await fund('creator_deposit', creatorDepositCents, true)
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'Funded' } })
		await ev('FUNDED.all', {})
	}
	if (['InProgress','Submitted','UnderReview','RevisionsRequested','Released','Cancelled','Expired','Disputed','AdminResolved','Closed'].includes(state)) {
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'InProgress' } })
		await ev('STARTED', {})
	}
	if (['Submitted','UnderReview','RevisionsRequested','Released','Cancelled','Expired','Disputed','AdminResolved','Closed'].includes(state)) {
		await prisma.submission.create({ data: { contractId: base.id, url: 'https://example.com/video/123', platform: 'tiktok', screenshots: [{ url: 'https://example.com/s1.png' }], notes: 'Seed submission' } })
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'UnderReview' } })
		await ev('SUBMITTED', { url: 'https://example.com/video/123' }, creatorId)
	}
	if (state === 'RevisionsRequested') {
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'RevisionsRequested' } })
		await ev('REVISIONS_REQUESTED', { comment: 'Please show the product closer.' }, brandId)
	}
	if (state === 'Released') {
		await prisma.review.create({ data: { contractId: base.id, reviewerId: brandId, decision: 'approve', comment: 'Looks great' } })
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'Released' } })
		await ev('APPROVED', {}, brandId)
		// Fee and payout
		const feePct = 0.1
		const fee = Math.round(budgetCents * feePct)
		await prisma.fee.create({ data: { contractId: base.id, baseAmountCents: budgetCents, percentage: feePct * 100, amountCents: fee } })
		await prisma.payout.create({ data: { contractId: base.id, beneficiaryId: creatorId, amountCents: budgetCents - fee, pspTransferId: `tr_${base.id}`, status: 'paid' } })
	}
	if (state === 'Cancelled') {
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'Cancelled' } })
		await ev('CANCELLED.confirm', {})
	}
	if (state === 'Expired') {
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'Expired' } })
		await ev('EXPIRED', {})
	}
	if (state === 'Disputed' || state === 'AdminResolved') {
		await prisma.dispute.create({ data: { contractId: base.id, openerId: brandId, reason: 'Content quality disagreement', evidence: { notes: 'Seed dispute' }, status: state === 'Disputed' ? 'open' : 'resolved', resolution: state === 'AdminResolved' ? 'split' : null } })
		await ev('DISPUTE_OPENED', {})
		if (state === 'AdminResolved') await ev('ADMIN_RESOLVED', { resolution: 'split' }, null)
	}

	// Close if needed
	if (state === 'Closed') {
		await prisma.contract.update({ where: { id: base.id }, data: { state: 'Closed' } })
		await ev('CLOSED', {})
	}

	return base
}

async function seedDemoData() {
	const { brand1, brand2, brand3, creator1, creator2, creator3, admin } = await upsertUsers()
	const now = new Date()
	// Spread deadlines across past/future
	await seedContract({ brandId: brand1.id, creatorId: creator1.id, state: 'Draft', title: 'Draft — Tripod TikTok', budgetCents: 50000, deadlineAt: addHours(now, 48) })
	await seedContract({ brandId: brand1.id, creatorId: creator1.id, state: 'Proposed', title: 'Proposed — Microphone Review', budgetCents: 65000, deadlineAt: addHours(now, 72) })
	await seedContract({ brandId: brand1.id, creatorId: creator2.id, state: 'Accepted', title: 'Accepted — Golf Glove', budgetCents: 40000, deadlineAt: addHours(now, 96) })
	await seedContract({ brandId: brand2.id, creatorId: creator1.id, state: 'Funded', title: 'Funded — Phone Case', budgetCents: 30000, deadlineAt: addHours(now, 120) })
	await seedContract({ brandId: brand2.id, creatorId: creator2.id, state: 'InProgress', title: 'InProgress — Coffee Beans', budgetCents: 45000, deadlineAt: addHours(now, 72) })
	await seedContract({ brandId: brand2.id, creatorId: creator3.id, state: 'UnderReview', title: 'UnderReview — Headphones', budgetCents: 80000, deadlineAt: addHours(now, 48) })
	await seedContract({ brandId: brand3.id, creatorId: creator1.id, state: 'RevisionsRequested', title: 'Revisions — Backpack', budgetCents: 70000, deadlineAt: addHours(now, 48) })
	await seedContract({ brandId: brand3.id, creatorId: creator2.id, state: 'Released', title: 'Released — Running Shoes', budgetCents: 120000, deadlineAt: addHours(now, -24) })
	await seedContract({ brandId: brand3.id, creatorId: creator3.id, state: 'Cancelled', title: 'Cancelled — Watch Strap', budgetCents: 25000, deadlineAt: addHours(now, 24) })
	await seedContract({ brandId: brand1.id, creatorId: creator3.id, state: 'Expired', title: 'Expired — Notebook', budgetCents: 20000, deadlineAt: addHours(now, -1) })
	await seedContract({ brandId: brand2.id, creatorId: creator1.id, state: 'Disputed', title: 'Disputed — Smart Light', budgetCents: 55000, deadlineAt: addHours(now, 24) })
	await seedContract({ brandId: brand2.id, creatorId: creator2.id, state: 'AdminResolved', title: 'Resolved — Drone Filter', budgetCents: 90000, deadlineAt: addHours(now, 24) })

	await prisma.auditLog.create({ data: { actorId: admin.id, action: 'SEED_COMPLETED', resource: 'System', resourceId: null, metadata: { users: true, contracts: true } } })
}

async function main() {
	await resetAll()
	await seedDemoData()
	console.log('✓ Seeded users, profiles, demo contracts, fundings, submissions, events, payouts, fees, disputes.')
}

main().finally(async () => {
	await prisma.$disconnect()
})

async function resetAll() {
	// Clear in dependency order
	await prisma.review.deleteMany({})
	await prisma.submission.deleteMany({})
	await prisma.funding.deleteMany({})
	await prisma.dispute.deleteMany({})
	await prisma.fee.deleteMany({})
	await prisma.payout.deleteMany({})
	await prisma.contractEvent.deleteMany({})
	await prisma.contract.deleteMany({})
	await prisma.auditLog.deleteMany({})
	// NextAuth tables (optional cleanup in test env)
	await prisma.account.deleteMany({})
	await prisma.session.deleteMany({})
	await prisma.verificationToken.deleteMany({})
	await prisma.user.deleteMany({})
}


