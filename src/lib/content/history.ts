import { revalidatePath, revalidateTag } from 'next/cache'
import { prisma } from '../db.ts'
import { getCurrentAdmin } from '../adminAuth.ts'
import type { Prisma } from '../../generated/prisma/client.ts'
import { CONTENT_TAGS, type ContentTag } from './revalidate.ts'
import { historyRegistry } from './historyRegistry.ts'

export type HistoryContentType = Exclude<ContentTag, 'sections'>
export type HistoryAction = 'create' | 'update' | 'delete'

const MAX_ENTRIES_PER_ENTITY = 20

export interface HistoryEntry {
  id: string
  contentType: HistoryContentType
  entityId: string
  action: HistoryAction
  label: string
  snapshot: Prisma.JsonValue | null
  adminUsername: string
  createdAt: Date
}

export interface RecordHistoryInput {
  contentType: HistoryContentType
  entityId: string
  action: HistoryAction
  label: string
  snapshot: Prisma.InputJsonValue | null
  adminUsername: string
}

export async function recordHistory(input: RecordHistoryInput): Promise<void> {
  await prisma.contentHistoryEntry.create({
    data: {
      contentType: input.contentType,
      entityId: input.entityId,
      action: input.action,
      label: input.label,
      snapshot: input.snapshot ?? undefined,
      adminUsername: input.adminUsername,
    },
  })

  await trimHistory(input.contentType, input.entityId)
}

async function trimHistory(contentType: HistoryContentType, entityId: string): Promise<void> {
  const excess = await prisma.contentHistoryEntry.findMany({
    where: { contentType, entityId },
    orderBy: { createdAt: 'desc' },
    skip: MAX_ENTRIES_PER_ENTITY,
    select: { id: true },
  })

  if (excess.length === 0) return

  await prisma.contentHistoryEntry.deleteMany({
    where: { id: { in: excess.map((entry) => entry.id) } },
  })
}

export async function listHistory(
  contentType: HistoryContentType,
  entityId: string
): Promise<HistoryEntry[]> {
  const rows = await prisma.contentHistoryEntry.findMany({
    where: { contentType, entityId },
    orderBy: { createdAt: 'desc' },
  })

  return rows.map((row) => ({
    id: row.id,
    contentType: row.contentType as HistoryContentType,
    entityId: row.entityId,
    action: row.action as HistoryAction,
    label: row.label,
    snapshot: row.snapshot,
    adminUsername: row.adminUsername,
    createdAt: row.createdAt,
  }))
}

export type RestoreResult =
  | { ok: true; listPath: string }
  | { ok: false; error: string }

export async function restoreHistoryEntry(entryId: string): Promise<RestoreResult> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { ok: false, error: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const entry = await prisma.contentHistoryEntry.findUnique({ where: { id: entryId } })
  if (!entry) {
    return { ok: false, error: 'Cette entrée d’historique n’existe plus.' }
  }

  if (entry.action === 'create' || entry.snapshot === null) {
    return { ok: false, error: 'Rien à restaurer depuis une entrée de création.' }
  }

  if (!Object.hasOwn(historyRegistry, entry.contentType)) {
    return { ok: false, error: 'Cette entrée d’historique ne se restaure pas depuis cet écran.' }
  }

  const contentType = entry.contentType as HistoryContentType
  const registryEntry = historyRegistry[contentType]

  const current = await registryEntry.fetchCurrent(entry.entityId)
  if (current) {
    await recordHistory({
      contentType,
      entityId: entry.entityId,
      action: 'update',
      label: current.label,
      snapshot: current.data,
      adminUsername: account.username,
    })
  }

  await registryEntry.applySnapshot(entry.entityId, entry.snapshot)

  revalidatePath(registryEntry.listPath)
  revalidateTag(CONTENT_TAGS[contentType])

  return { ok: true, listPath: registryEntry.listPath }
}
