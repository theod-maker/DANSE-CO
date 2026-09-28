'use server'

import { redirect } from 'next/navigation'
import { prisma } from '../../../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../../../src/lib/adminAuth'
import { restoreBlockHistoryEntry } from '../../../../../../src/lib/content/pageBlocks'

export async function restoreBlockHistoryAction(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return

  const entryId = String(formData.get('entryId') ?? '')
  if (!entryId) return

  const entry = await prisma.contentHistoryEntry.findUnique({ where: { id: entryId } })
  if (!entry) return

  const result = await restoreBlockHistoryEntry(entryId)
  if (!result.ok) return

  redirect(`/admin/mise-en-page/blocs/${entry.entityId}`)
}
