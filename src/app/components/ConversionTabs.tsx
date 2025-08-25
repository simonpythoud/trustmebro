"use client"
import { useState } from 'react'

type Props = {
  brand: React.ReactNode
  creator: React.ReactNode
}

export default function ConversionTabs({ brand, creator }: Props) {
  const [tab, setTab] = useState<'brand'|'creator'>('brand')
  return (
    <div>
      <div className="inline-flex rounded-md border border-foreground/10 bg-background/60 p-1 text-sm">
        <button
          type="button"
          className={`px-3 py-1.5 rounded ${tab==='brand' ? 'bg-foreground text-background' : 'hover:bg-foreground/5'}`}
          onClick={()=>setTab('brand')}
        >Brands</button>
        <button
          type="button"
          className={`px-3 py-1.5 rounded ${tab==='creator' ? 'bg-foreground text-background' : 'hover:bg-foreground/5'}`}
          onClick={()=>setTab('creator')}
        >Creators</button>
      </div>
      <div className="mt-6">
        {tab === 'brand' ? brand : creator}
      </div>
    </div>
  )
}


