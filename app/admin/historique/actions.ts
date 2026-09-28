'use server'

import { redirect } from 'next/navigation'
import { restoreHistoryEntry } from '../../../src/lib/content/history'

export async function restoreHistory(formData: FormData): Promise<void> {
  const entryId = String(formData.get('entryId') ?? '')
  if (!entryId) return

  const result = await restoreHistoryEntry(entryId)
  if (!result.ok) return

  redirect(result.listPath)
}
