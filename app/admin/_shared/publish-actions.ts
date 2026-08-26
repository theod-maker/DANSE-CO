'use server'

import { redirect } from 'next/navigation'
import { publishContent, discardDraft } from '../../../src/lib/content/publish'
import { historyRegistry } from '../../../src/lib/content/historyRegistry'
import type { HistoryContentType } from '../../../src/lib/content/history'

function parse(formData: FormData): { contentType: HistoryContentType; entityId: string } {
  return {
    contentType: String(formData.get('contentType')) as HistoryContentType,
    entityId: String(formData.get('entityId')),
  }
}

export async function publishEntry(formData: FormData): Promise<void> {
  const { contentType, entityId } = parse(formData)
  const result = await publishContent(contentType, entityId)
  if (!result.ok) return
  redirect(historyRegistry[contentType].listPath)
}

export async function discardEntry(formData: FormData): Promise<void> {
  const { contentType, entityId } = parse(formData)
  const result = await discardDraft(contentType, entityId)
  if (!result.ok) return
  redirect(historyRegistry[contentType].listPath)
}
