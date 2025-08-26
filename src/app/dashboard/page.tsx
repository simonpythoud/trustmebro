"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { StateBadge } from '../components/StateBadge'
import ConversionTabs from '../components/ConversionTabs'

export default function DashboardPage() {
  const [items, setItems] = useState<any[] | null>(null)
  const [unauthorized, setUnauthorized] = useState(false)
  useEffect(() => {
    let mounted = true
    fetch('/api/contracts', { cache: 'no-store', credentials: 'include' })
      .then(async (r) => {
        if (!mounted) return
        if (r.status === 401) { setUnauthorized(true); setItems([]); return }
        if (!r.ok) { setItems([]); return }
        setItems(await r.json())
      })
      .catch(() => mounted && setItems([]))
    return () => { mounted = false }
  }, [])
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Link data-testid="create-contract" href="/contracts/new" className="ml-auto inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">Create contract</Link>
      </div>

      {items === null ? (
        <div className="mt-8 text-sm text-foreground/60">Loading…</div>
      ) : items.length === 0 ? (
        <>
          {unauthorized ? (
            <div className="mt-4 rounded-md border border-amber-300/50 bg-amber-50 text-amber-900 px-4 py-2 text-sm">
              You’re not logged in. Please <Link href="/signin" className="underline">sign in</Link> to view your real dashboard.
            </div>
          ) : (
            <div className="mt-4 rounded-md border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm">
              No contracts yet. <Link href="/contracts/new" className="underline">Create your first contract</Link> to get started.
            </div>
          )}

          <section className="mt-8 grid gap-6">
            <div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
              <h2 className="text-xl font-semibold">What you can do with TrustMeBro</h2>
              <ul className="mt-4 grid gap-2 text-sm text-foreground/80">
                <li>• Draft contracts with deliverables, budgets and deadlines</li>
                <li>• Dual-deposit escrow to align incentives</li>
                <li>• Auto-approve with audit trail and dispute resolution</li>
                <li>• Payouts via Stripe with VAT/GDPR awareness</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/signup" className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">Create an account</Link>
                <Link href="/contracts/new" className="inline-flex items-center rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/5">Draft a contract</Link>
              </div>
            </div>

            <div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
              <ConversionTabs
                brand={(
                  <div className="grid gap-3 text-sm">
                    <div>
                      <div className="font-medium">For Brands</div>
                      <ul className="mt-2 space-y-1 text-foreground/80">
                        <li>• Commit budget safely with escrow</li>
                        <li>• Transparent states and audit trail</li>
                        <li>• Approve deliverables or auto‑approve</li>
                        <li>• Handle cancellations and disputes fairly</li>
                      </ul>
                    </div>
                  </div>
                )}
                creator={(
                  <div className="grid gap-3 text-sm">
                    <div>
                      <div className="font-medium">For Creators</div>
                      <ul className="mt-2 space-y-1 text-foreground/80">
                        <li>• No more ghosting: deposits up front</li>
                        <li>• Clear brief and due date</li>
                        <li>• Fast payouts after approval</li>
                        <li>• Admin resolves edge cases</li>
                      </ul>
                    </div>
                  </div>
                )}
              />
            </div>
          </section>
        </>
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


