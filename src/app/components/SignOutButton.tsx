"use client"
import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 hover:bg-foreground/5"
    >
      Sign out
    </button>
  )
}


