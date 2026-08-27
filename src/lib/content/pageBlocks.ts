import { revalidatePath, revalidateTag } from 'next/cache'
import { prisma } from '../db.ts'
import type { Prisma } from '../../generated/prisma/client.ts'
import { getCurrentAdmin } from '../adminAuth.ts'
import { pageBlocksTag, type PageBlockPageKey } from './revalidate.ts'
import { FREE_BLOCK_LABELS } from './pageBlockLabels.ts'

const BLOCK_HISTORY_TYPE = 'pageBlock'

export type FreeBlockKind = 'text' | 'image' | 'gallery' | 'cta' | 'timelineEvent'
export type BlockKind = 'fixed' | FreeBlockKind

export interface TextBlockContent {
  body: string
}

export interface ImageBlockContent {
  imageUrl: string
  caption: string | null
  fullWidth: boolean
}

export interface GalleryBlockContent {
  title: string | null
  imageUrls: string[]
  columns: 2 | 3
}

export interface CtaBlockContent {
  title: string | null
  description: string | null
  buttonLabel: string
  buttonLink: string
}

export interface TimelineEventBlockContent {
  year: string
  label: string
  text: string
  imageUrls: string[]
}

export type FreeBlockContent =
  | TextBlockContent
  | ImageBlockContent
  | GalleryBlockContent
  | CtaBlockContent
  | TimelineEventBlockContent

export interface ResolvedFixedBlock {
  id: string
  kind: 'fixed'
  fixedKey: string
}

export interface ResolvedFreeBlock {
  id: string
  kind: FreeBlockKind
  content: FreeBlockContent | null
}

export type ResolvedBlock = ResolvedFixedBlock | ResolvedFreeBlock

export type PageBlockSource = 'published' | 'live'

export async function resolvePageBlocks(
  pageKey: string,
  source: PageBlockSource
): Promise<ResolvedBlock[]> {
  const rows = await prisma.pageBlock.findMany({
    where: { pageKey, visible: true },
    orderBy: { displayOrder: 'asc' },
  })

  return rows.map((row): ResolvedBlock => {
    if (row.kind === 'fixed') {
      return { id: row.id, kind: 'fixed', fixedKey: row.fixedKey as string }
    }

    const content =
      source === 'live'
        ? (row.content as FreeBlockContent | null)
        : (row.publishedSnapshot as FreeBlockContent | null)

    return { id: row.id, kind: row.kind as FreeBlockKind, content }
  })
}

export async function fetchCurrentBlock(blockId: string): Promise<FreeBlockContent | null> {
  const row = await prisma.pageBlock.findUnique({
    where: { id: blockId },
    select: { content: true },
  })
  return (row?.content as FreeBlockContent | null) ?? null
}

export async function applyBlockSnapshot(
  blockId: string,
  snapshot: Prisma.JsonValue
): Promise<void> {
  await prisma.pageBlock.update({
    where: { id: blockId },
    data: { content: snapshot as Prisma.InputJsonValue },
  })
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`
  }
  if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value as Record<string, unknown>).sort()
    const entries = keys.map(
      (key) => `${JSON.stringify(key)}:${stableStringify((value as Record<string, unknown>)[key])}`
    )
    return `{${entries.join(',')}}`
  }
  return JSON.stringify(value)
}

export interface BlockHistoryEntry {
  id: string
  action: string
  label: string
  snapshot: Prisma.JsonValue | null
  adminUsername: string
  createdAt: Date
}

const MAX_BLOCK_HISTORY_ENTRIES = 20

export async function recordBlockHistory(
  blockId: string,
  previousContent: Prisma.InputJsonValue | null,
  adminUsername: string
): Promise<void> {
  const block = await prisma.pageBlock.findUnique({ where: { id: blockId }, select: { kind: true } })
  if (!block) return

  await prisma.contentHistoryEntry.create({
    data: {
      contentType: BLOCK_HISTORY_TYPE,
      entityId: blockId,
      action: 'update',
      label: FREE_BLOCK_LABELS[block.kind] ?? block.kind,
      snapshot: previousContent ?? undefined,
      adminUsername,
    },
  })

  const excess = await prisma.contentHistoryEntry.findMany({
    where: { contentType: BLOCK_HISTORY_TYPE, entityId: blockId },
    orderBy: { createdAt: 'desc' },
    skip: MAX_BLOCK_HISTORY_ENTRIES,
    select: { id: true },
  })
  if (excess.length > 0) {
    await prisma.contentHistoryEntry.deleteMany({ where: { id: { in: excess.map((e) => e.id) } } })
  }
}

export async function listBlockHistory(blockId: string): Promise<BlockHistoryEntry[]> {
  const rows = await prisma.contentHistoryEntry.findMany({
    where: { contentType: BLOCK_HISTORY_TYPE, entityId: blockId },
    orderBy: { createdAt: 'desc' },
  })
  return rows.map((row) => ({
    id: row.id,
    action: row.action,
    label: row.label,
    snapshot: row.snapshot,
    adminUsername: row.adminUsername,
    createdAt: row.createdAt,
  }))
}

export type BlockActionResult = { ok: true } | { ok: false; error: string }

export async function restoreBlockHistoryEntry(entryId: string): Promise<BlockActionResult> {
  const account = await getCurrentAdmin()
  if (!account) return { ok: false, error: 'Votre session a expiré. Reconnectez-vous.' }

  const entry = await prisma.contentHistoryEntry.findUnique({ where: { id: entryId } })
  if (!entry || entry.contentType !== BLOCK_HISTORY_TYPE) {
    return { ok: false, error: 'Cette entrée d’historique n’existe plus.' }
  }

  const block = await prisma.pageBlock.findUnique({ where: { id: entry.entityId } })
  if (!block) return { ok: false, error: 'Ce bloc n’existe plus.' }

  await recordBlockHistory(block.id, block.content as Prisma.InputJsonValue | null, account.username)
  await applyBlockSnapshot(block.id, entry.snapshot)

  revalidatePath(`/admin/mise-en-page/pages/${block.pageKey}`)
  revalidatePath(`/admin/mise-en-page/blocs/${block.id}`)

  return { ok: true }
}

export async function hasBlockPendingChanges(blockId: string): Promise<boolean> {
  const row = await prisma.pageBlock.findUnique({
    where: { id: blockId },
    select: { content: true, publishedSnapshot: true },
  })
  if (!row) return false
  if (row.publishedSnapshot === null) return row.content !== null
  return stableStringify(row.content) !== stableStringify(row.publishedSnapshot)
}

export async function publishBlock(blockId: string): Promise<BlockActionResult> {
  const account = await getCurrentAdmin()
  if (!account) return { ok: false, error: 'Votre session a expiré. Reconnectez-vous.' }

  const block = await prisma.pageBlock.findUnique({ where: { id: blockId } })
  if (!block) return { ok: false, error: 'Ce bloc n’existe plus.' }

  await prisma.pageBlock.update({
    where: { id: blockId },
    data: { publishedSnapshot: block.content ?? undefined, publishedAt: new Date() },
  })

  revalidatePath(`/admin/mise-en-page/pages/${block.pageKey}`)
  revalidatePath(`/admin/mise-en-page/blocs/${block.id}`)
  revalidateTag(pageBlocksTag(block.pageKey as PageBlockPageKey))

  return { ok: true }
}

export async function discardBlockDraft(blockId: string): Promise<BlockActionResult> {
  const account = await getCurrentAdmin()
  if (!account) return { ok: false, error: 'Votre session a expiré. Reconnectez-vous.' }

  const block = await prisma.pageBlock.findUnique({ where: { id: blockId } })
  if (!block) return { ok: false, error: 'Ce bloc n’existe plus.' }
  if (block.publishedSnapshot === null) {
    return { ok: false, error: 'Jamais publié, rien à restaurer.' }
  }

  await recordBlockHistory(block.id, block.content as Prisma.InputJsonValue | null, account.username)
  await prisma.pageBlock.update({
    where: { id: blockId },
    data: { content: block.publishedSnapshot },
  })

  revalidatePath(`/admin/mise-en-page/pages/${block.pageKey}`)
  revalidatePath(`/admin/mise-en-page/blocs/${block.id}`)

  return { ok: true }
}
