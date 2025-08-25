import { describe, it, expect } from 'vitest'
import { isFundingCompleteForContract } from './finance'

describe('finance helpers', () => {
	it('requires budget and deposits unless amount is zero', () => {
		const c = { brandDepositCents: 1000, creatorDepositCents: 2000 }
		const funds = [
			{ type: 'brand_budget', status: 'succeeded' },
			{ type: 'brand_deposit', status: 'succeeded' },
		]
		expect(isFundingCompleteForContract(c, funds as any)).toBe(false)
		funds.push({ type: 'creator_deposit', status: 'succeeded' } as any)
		expect(isFundingCompleteForContract(c, funds as any)).toBe(true)
	})

	it('skips deposit requirements when zero', () => {
		const c = { brandDepositCents: 0, creatorDepositCents: 0 }
		const funds = [{ type: 'brand_budget', status: 'succeeded' }]
		expect(isFundingCompleteForContract(c as any, funds as any)).toBe(true)
	})
})


