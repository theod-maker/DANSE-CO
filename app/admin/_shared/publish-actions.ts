'use server'

import { redirect } from 'next/navigation'
import { publishContent, discardDraft } from '../../../src/lib/content/publish'
import { historyRegistry } from '../../../src/lib/content/historyRegistry'
import type { HistoryContentType } from '../../../src/lib/content/history'

function parse(formData: FormData): { contentType: HistoryContentType; entityId: string } | null {
  const contentType = String(formData.get('contentType') ?? '')
  const entityId = String(formData.get('entityId') ?? '')
  if (!entityId || !Object.hasOwn(historyRegistry, contentType)) return null
  return { contentType: contentType as HistoryContentType, entityId }
}

export async function publishEntry(formData: FormData): Promise<void> {
  const parsed = parse(formData)
  if (!parsed) return
  const { contentType, entityId } = parsed
  const result = await publishContent(contentType, entityId)
  if (!result.ok) return
  redirect(historyRegistry[contentType].listPath)
}

export async function discardEntry(formData: FormData): Promise<void> {
  const parsed = parse(formData)
  if (!parsed) return
  const { contentType, entityId } = parsed
  const result = await discardDraft(contentType, entityId)
  if (!result.ok) return
  redirect(historyRegistry[contentType].listPath)
}
