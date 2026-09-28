'use client'

import { restoreBlockHistoryAction } from './actions'

export function RestoreBlockForm({ entryId }: { entryId: string }) {
  return (
    <form action={restoreBlockHistoryAction} className="shrink-0">
      <input type="hidden" name="entryId" value={entryId} />
      <button
        type="submit"
        className="rounded-md bg-[#6C5CA8]/10 px-3 py-1 text-sm text-[#6C5CA8] transition-colors hover:bg-[#6C5CA8]/20"
      >
        Restaurer
      </button>
    </form>
  )
}
