'use client'

import { restoreHistory } from './actions'

export function RestoreForm({ entryId, label }: { entryId: string; label: string }) {
  return (
    <form action={restoreHistory} className="shrink-0">
      <input type="hidden" name="entryId" value={entryId} />
      <button
        type="submit"
        className="rounded-md bg-[#6C5CA8]/10 px-3 py-1 text-sm text-[#6C5CA8] transition-colors hover:bg-[#6C5CA8]/20"
      >
        Restaurer « {label} »
      </button>
    </form>
  )
}
