'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { acceptInvitation, type InvitationFormState } from './actions'

const INITIAL_STATE: InvitationFormState = { status: 'idle', message: '' }

const FIELD_CLASSNAME =
  'w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#6C5CA8] focus:outline-none focus:ring-1 focus:ring-[#6C5CA8]'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[#6C5CA8] px-4 py-2 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? 'Enregistrement…' : 'Enregistrer mon mot de passe'}
    </button>
  )
}

export function InvitationForm({ token, minimumLength }: { token: string; minimumLength: number }) {
  const [state, formAction] = useActionState(acceptInvitation, INITIAL_STATE)

  if (state.status === 'success') {
    return (
      <div className="space-y-4">
        <p role="status" className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          {state.message}
        </p>
        <Link
          href="/admin/login"
          className="block w-full rounded-md bg-[#6C5CA8] px-4 py-2 text-center text-white hover:opacity-90"
        >
          Se connecter
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div>
        <label htmlFor="newPassword" className="mb-1 block text-sm text-neutral-700">
          Mot de passe
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={minimumLength}
          required
          className={FIELD_CLASSNAME}
        />
        <p className="mt-1 text-xs text-neutral-500">{minimumLength} caractères minimum.</p>
      </div>

      <div>
        <label htmlFor="confirmation" className="mb-1 block text-sm text-neutral-700">
          Confirmation
        </label>
        <input
          id="confirmation"
          name="confirmation"
          type="password"
          autoComplete="new-password"
          minLength={minimumLength}
          required
          className={FIELD_CLASSNAME}
        />
      </div>

      {state.status === 'error' && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
