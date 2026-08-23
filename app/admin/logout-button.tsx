'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleLogout() {
    setIsSigningOut(true)
    await fetch('/api/admin/session', { method: 'DELETE' })
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSigningOut}
      className="text-sm text-neutral-600 underline underline-offset-4 hover:text-[#6C5CA8] disabled:opacity-50"
    >
      {isSigningOut ? 'Déconnexion…' : 'Se déconnecter'}
    </button>
  )
}
