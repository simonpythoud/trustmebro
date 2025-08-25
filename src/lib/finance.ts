export type FundingType = 'brand_budget' | 'brand_deposit' | 'creator_deposit'
export type FundingStatus = 'pending' | 'succeeded' | 'failed'

export interface FundingLike {
	type: FundingType
	status: FundingStatus
}

export interface ContractFundingRequirements {
	brandDepositCents: number
	creatorDepositCents: number
}

export function isFundingCompleteForContract(
	contract: ContractFundingRequirements,
	fundings: ReadonlyArray<FundingLike>,
): boolean {
	const succeeded = fundings.filter(f => f.status === 'succeeded')
	const hasBudget = succeeded.some(f => f.type === 'brand_budget')
	const hasBrandDeposit = contract.brandDepositCents === 0 || succeeded.some(f => f.type === 'brand_deposit')
	const hasCreatorDeposit = contract.creatorDepositCents === 0 || succeeded.some(f => f.type === 'creator_deposit')
	return hasBudget && hasBrandDeposit && hasCreatorDeposit
}


