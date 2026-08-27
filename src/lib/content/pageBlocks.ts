import { prisma } from '../db.ts'
import type { Prisma } from '../../generated/prisma/client.ts'

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
