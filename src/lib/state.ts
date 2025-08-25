// Lightweight state machine helpers for guarding API routes

export type ContractState =
	| 'Draft'
	| 'Proposed'
	| 'Accepted'
	| 'Funded'
	| 'InProgress'
	| 'Submitted'
	| 'UnderReview'
	| 'RevisionsRequested'
	| 'Released'
	| 'Closed'
	| 'Expired'
	| 'Cancelled'
	| 'Disputed'
	| 'AdminResolved'

export type ContractAction =
	| 'propose'
	| 'accept'
	| 'fund'
	| 'start'
	| 'submit'
	| 'approve'
	| 'revise'
	| 'cancel'

const allowedActionsByState: Record<ContractState, ReadonlyArray<ContractAction>> = {
	Draft: ['propose', 'cancel'],
	Proposed: ['accept', 'cancel'],
	Accepted: ['fund', 'cancel'],
	Funded: ['start', 'cancel'],
	InProgress: ['submit', 'cancel'],
	Submitted: [], // we do not keep Submitted as a stable state; we switch to UnderReview
	UnderReview: ['approve', 'revise', 'cancel'],
	RevisionsRequested: ['submit', 'cancel'],
	Released: [],
	Closed: [],
	Expired: [],
	Cancelled: [],
	Disputed: [], // transitions handled separately via disputes/admin
	AdminResolved: [],
}

export function canPerformAction(state: ContractState, action: ContractAction): boolean {
	const list = allowedActionsByState[state] || []
	return list.includes(action)
}

export function assertCanPerform(state: ContractState, action: ContractAction) {
	if (!canPerformAction(state, action)) {
		throw new Error(`Invalid action ${action} for state ${state}`)
	}
}


