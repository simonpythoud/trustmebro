import { describe, it, expect } from 'vitest'
import { canPerformAction, assertCanPerform } from './state'

describe('state machine', () => {
	it('allows propose from Draft, not from Released', () => {
		expect(canPerformAction('Draft', 'propose')).toBe(true)
		expect(canPerformAction('Released', 'propose')).toBe(false)
	})

	it('allows accept from Proposed only', () => {
		expect(canPerformAction('Proposed', 'accept')).toBe(true)
		expect(canPerformAction('Draft', 'accept')).toBe(false)
	})

	it('submit allowed from InProgress and RevisionsRequested', () => {
		expect(canPerformAction('InProgress', 'submit')).toBe(true)
		expect(canPerformAction('RevisionsRequested', 'submit')).toBe(true)
		expect(canPerformAction('Draft', 'submit')).toBe(false)
	})

	it('approve/revise allowed from UnderReview', () => {
		expect(canPerformAction('UnderReview', 'approve')).toBe(true)
		expect(canPerformAction('UnderReview', 'revise')).toBe(true)
		expect(canPerformAction('InProgress', 'approve')).toBe(false)
	})

	it('assertCanPerform throws on invalid transitions', () => {
		expect(() => assertCanPerform('Draft', 'approve' as any)).toThrow()
		expect(() => assertCanPerform('UnderReview', 'approve')).not.toThrow()
	})
})


