"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="max-w-sm mx-auto py-16">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setError(null)
          const res = await signIn('credentials', {
            email,
            password,
            redirect: true,
            callbackUrl: '/'
          })
          if ((res as any)?.error) setError((res as any).error)
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input data-testid="auth-email" className="border rounded w-full px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input data-testid="auth-password" type="password" className="border rounded w-full px-3 py-2" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button data-testid="auth-submit" className="bg-black text-white px-4 py-2 rounded" type="submit">Sign in</button>
      </form>
    </div>
  )
}


