import { hasPendingChanges } from '../../../src/lib/content/publish'
import type { HistoryContentType } from '../../../src/lib/content/history'
import type { PublishState } from './publish-status'

export async function resolvePublishState(
  contentType: HistoryContentType,
  entityId: string,
  publishedAt: Date | null
): Promise<PublishState> {
  if (!publishedAt) return 'neverPublished'
  return (await hasPendingChanges(contentType, entityId)) ? 'pending' : 'upToDate'
}
