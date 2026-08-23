'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        setErrorMessage(body.error ?? 'Connexion impossible')
        return
      }

      router.replace('/admin')
      router.refresh()
    } catch {
      setErrorMessage('Connexion impossible. Vérifiez votre réseau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-4">
      <div className="w-full max-w-sm">
        <h1
          className="text-3xl text-[#6C5CA8] mb-2 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Administration
        </h1>
        <p className="text-sm text-neutral-500 mb-8">Espace réservé à la gestion du site.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-neutral-700 mb-1">
              Identifiant
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#6C5CA8] focus:outline-none focus:ring-1 focus:ring-[#6C5CA8]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-neutral-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#6C5CA8] focus:outline-none focus:ring-1 focus:ring-[#6C5CA8]"
            />
          </div>

          {errorMessage && (
            <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#6C5CA8] px-4 py-2 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </main>
  )
}
