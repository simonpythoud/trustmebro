"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { StateBadge } from '../components/StateBadge'

export default function DashboardPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    fetch('/api/contracts?role=brand').then(r=> r.ok ? r.json() : []).then(setItems).catch(()=>setItems([]))
  }, [])
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Link data-testid="create-contract" href="/contracts/new" className="ml-auto inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">Create contract</Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-lg border border-foreground/10 p-8 text-center">
          <div className="text-lg font-medium">No contracts yet</div>
          <p className="mt-1 text-foreground/70">Get started by drafting a new contract.</p>
          <div className="mt-4">
            <Link href="/contracts/new" className="inline-flex items-center rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/5">Create contract</Link>
            <span className="mx-2 text-foreground/40">or</span>
            <Link href="/signin" className="underline">Sign in</Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((c)=> (
            <Link key={c.id} href={`/contracts/${c.id}`} className="rounded-lg border border-foreground/10 p-5 hover:bg-foreground/5 transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-foreground/60">#{c.id.slice(0,6)}</div>
                  <div className="mt-1 font-medium text-lg">{c.title}</div>
                  <div className="text-sm text-foreground/60">CHF {(c.budgetCents/100).toFixed(2)}</div>
                </div>
                <span data-testid={`state-${c.state}`}><StateBadge state={c.state} /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}


