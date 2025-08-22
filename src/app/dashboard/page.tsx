"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    fetch('/api/contracts?role=brand').then(r=> r.ok ? r.json() : []).then(setItems).catch(()=>setItems([]))
  }, [])
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <Link data-testid="create-contract" className="underline" href="/contracts/new">Create contract</Link>
      <div className="mt-4 grid gap-3">
        {items.map((c)=> (
          <Link key={c.id} href={`/contracts/${c.id}`} className="border rounded p-3 flex justify-between items-center">
            <div>
              <div className="font-medium">{c.title}</div>
              <div className="text-sm text-gray-500">CHF {(c.budgetCents/100).toFixed(2)}</div>
            </div>
            <span data-testid={`state-${c.state}`}>{c.state}</span>
          </Link>
        ))}
        {items.length === 0 && (
          <p>No contracts found. <Link href="/signin" className="underline">Sign in</Link> to get started.</p>
        )}
      </div>
    </main>
  )
}


