'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { changePassword, type PasswordChangeState } from './actions'

const INITIAL_STATE: PasswordChangeState = { status: 'idle', message: '' }

const FIELD_CLASSNAME =
  'w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#6C5CA8] focus:outline-none focus:ring-1 focus:ring-[#6C5CA8]'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[#6C5CA8] px-4 py-2 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? 'Enregistrement…' : 'Changer le mot de passe'}
    </button>
  )
}

export function PasswordForm({ minimumLength }: { minimumLength: number }) {
  const [state, formAction] = useActionState(changePassword, INITIAL_STATE)

  return (
    <form action={formAction} className="mt-8 max-w-sm space-y-4">
      <div>
        <label htmlFor="currentPassword" className="mb-1 block text-sm text-neutral-700">
          Mot de passe actuel
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className={FIELD_CLASSNAME}
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="mb-1 block text-sm text-neutral-700">
          Nouveau mot de passe
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={minimumLength}
          className={FIELD_CLASSNAME}
        />
        <p className="mt-1 text-xs text-neutral-500">
          {minimumLength} caractères minimum.
        </p>
      </div>

      <div>
        <label htmlFor="confirmation" className="mb-1 block text-sm text-neutral-700">
          Confirmer le nouveau mot de passe
        </label>
        <input
          id="confirmation"
          name="confirmation"
          type="password"
          autoComplete="new-password"
          required
          className={FIELD_CLASSNAME}
        />
      </div>

      {state.status !== 'idle' && (
        <p
          role="status"
          className={
            state.status === 'success'
              ? 'rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800'
              : 'rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'
          }
        >
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
