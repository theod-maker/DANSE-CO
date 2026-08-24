'use client'

import { useState } from 'react'
import { deleteNews } from './actions'

export function DeleteForm({ id, title }: { id: string; title: string }) {
  const [isConfirming, setIsConfirming] = useState(false)

  if (!isConfirming) {
    return (
      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        className="text-sm text-neutral-500 underline underline-offset-4 hover:text-red-700"
      >
        Supprimer
      </button>
    )
  }

  return (
    <form action={deleteNews} className="flex items-center gap-3">
      <input type="hidden" name="id" value={id} />
      <span className="text-sm text-neutral-600">Supprimer « {title} » ?</span>
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
