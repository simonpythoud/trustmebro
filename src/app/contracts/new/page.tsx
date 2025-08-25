"use client"
import { useState } from 'react'

export default function NewContractPage() {
  const [title, setTitle] = useState('')
  const [brief, setBrief] = useState('')
  const [platform, setPlatform] = useState<'tiktok'|'instagram'|'youtube'|'other'>('tiktok')
  const [hashtags, setHashtags] = useState('')
  const [budget, setBudget] = useState('600')
  const [depCreator, setDepCreator] = useState('100')
  const [depBrand, setDepBrand] = useState('50')
  const [currency, setCurrency] = useState<'CHF'|'EUR'|'USD'>(()=>{
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const region = url.searchParams.get('region')
      return region === 'us' ? 'USD' : 'CHF'
    }
    return 'CHF'
  })
  const [deadline, setDeadline] = useState<string>('')
  const [creatorId, setCreatorId] = useState('')
  const [msg, setMsg] = useState<string|null>(null)

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create contract</h1>
      <form className="space-y-4" onSubmit={async (e)=>{
        e.preventDefault()
        setMsg(null)
        const res = await fetch('/api/contracts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            brief,
            deliverable: { platform, durationSec: 60, hashtags: hashtags.split(',').map(s=>s.trim()).filter(Boolean) },
            creatorId,
            currency,
            budgetCents: Math.round(parseFloat(budget)*100),
            creatorDepositCents: Math.round(parseFloat(depCreator)*100),
            brandDepositCents: Math.round(parseFloat(depBrand)*100),
            productValueCents: 0,
            deadlineAt: new Date(deadline).toISOString(),
          })
        })
        if (res.ok) setMsg('Created')
        else setMsg('Error creating contract')
      }}>
        <div>
          <label className="block text-sm mb-1">Creator ID</label>
          <input data-testid="creator-id" className="border rounded w-full px-3 py-2" value={creatorId} onChange={(e)=>setCreatorId(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input data-testid="contract-title" className="border rounded w-full px-3 py-2" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Brief</label>
          <textarea data-testid="contract-brief" className="border rounded w-full px-3 py-2" value={brief} onChange={(e)=>setBrief(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Platform</label>
          <select data-testid="contract-platform" className="border rounded w-full px-3 py-2" value={platform} onChange={(e)=>setPlatform(e.target.value as any)}>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Hashtags (comma separated)</label>
          <input data-testid="contract-hashtags" className="border rounded w-full px-3 py-2" value={hashtags} onChange={(e)=>setHashtags(e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Budget ({currency})</label>
            <input data-testid="contract-budget" className="border rounded w-full px-3 py-2" value={budget} onChange={(e)=>setBudget(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Creator deposit ({currency})</label>
            <input data-testid="contract-creator-deposit" className="border rounded w-full px-3 py-2" value={depCreator} onChange={(e)=>setDepCreator(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Brand deposit ({currency})</label>
            <input data-testid="contract-brand-deposit" className="border rounded w-full px-3 py-2" value={depBrand} onChange={(e)=>setDepBrand(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Currency</label>
          <select className="border rounded w-full px-3 py-2" value={currency} onChange={(e)=>setCurrency(e.target.value as any)}>
            <option value="CHF">CHF</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Deadline</label>
          <input data-testid="contract-deadline" type="datetime-local" className="border rounded w-full px-3 py-2" value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
        </div>
        <button data-testid="contract-submit" className="bg-black text-white px-4 py-2 rounded" type="submit">Create</button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  )
}


