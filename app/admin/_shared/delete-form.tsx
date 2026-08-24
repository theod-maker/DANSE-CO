'use client'

import { useState } from 'react'

interface DeleteFormProps {
  id: string
  label: string
  action: (formData: FormData) => Promise<void>
  noun?: string
}

export function DeleteForm({ id, label, action, noun = 'Supprimer' }: DeleteFormProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  if (!isConfirming) {
    return (
      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        className="shrink-0 text-sm text-neutral-500 underline underline-offset-4 hover:text-red-700"
      >
        {noun}
      </button>
    )
  }

  return (
    <form action={action} className="flex shrink-0 items-center gap-3">
      <input type="hidden" name="id" value={id} />
      <span className="text-sm text-neutral-600">Supprimer « {label} » ?</span>
      <button
        type="submit"
        className="rounded-md bg-red-700 px-3 py-1 text-sm text-white transition-opacity hover:opacity-90"
      >
        Confirmer
      </button>
      <button
        type="button"
        onClick={() => setIsConfirming(false)}
        className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
      >
        Annuler
      </button>
    </form>
  )
}
