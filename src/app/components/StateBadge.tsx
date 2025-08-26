export function StateBadge({ state, label }: { state: string, label?: string }) {
	const color =
		state === 'Draft' ? 'bg-gray-100 text-gray-700 border-gray-200' :
		state === 'Proposed' ? 'bg-sky-50 text-sky-700 border-sky-200' :
		state === 'Accepted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
		state === 'Funded' ? 'bg-amber-50 text-amber-700 border-amber-200' :
		state === 'InProgress' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
		state === 'UnderReview' ? 'bg-purple-50 text-purple-700 border-purple-200' :
		state === 'RevisionsRequested' ? 'bg-pink-50 text-pink-700 border-pink-200' :
		state === 'Released' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
		state === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
		state === 'Expired' ? 'bg-orange-50 text-orange-700 border-orange-200' :
		'bg-gray-100 text-gray-700 border-gray-200'
	return (
		<span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${color}`}>
			{label ?? state}
		</span>
	)
}


