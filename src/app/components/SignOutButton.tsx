"use client"
import { signOut } from 'next-auth/react'
import { useI18n } from '@/lib/i18n-react'

export function SignOutButton() {
  const { t } = useI18n()
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 hover:bg-foreground/5"
    >
      {t('auth.signout')}
    </button>
  )
}


