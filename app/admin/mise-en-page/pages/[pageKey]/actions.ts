'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { prisma } from '../../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../../src/lib/adminAuth'
import {
  isPageBlockPageKey,
  pageBlocksTag,
  type PageBlockPageKey,
} from '../../../../../src/lib/content/revalidate'
import type { Prisma } from '../../../../../src/generated/prisma/client'
import { isFreeBlockKind } from '../../../../../src/lib/content/pageBlocks'
import { defaultPageBlocks } from '../../../../../src/lib/content/defaultBlocks'

function pagePath(pageKey: PageBlockPageKey): string {
  return `/admin/mise-en-page/pages/${pageKey}`
}

const PUBLIC_PATH: Record<PageBlockPageKey, string> = {
  disciplines: '/disciplines',
  professeurs: '/instructors',
  salles: '/locations',
  planning: '/planning',
  contact: '/contact',
  actualites: '/actualites',
  tarifs: '/pricing',
  histoire: '/histoire',
}

function revalidatePageAndPublic(pageKey: PageBlockPageKey): void {
  revalidatePath(pagePath(pageKey))
  revalidatePath(PUBLIC_PATH[pageKey])
  revalidateTag(pageBlocksTag(pageKey))
}

export async function reorderBlocks(pageKey: PageBlockPageKey, orderedIds: string[]): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return
  if (!isPageBlockPageKey(pageKey)) return
  if (!Array.isArray(orderedIds) || orderedIds.length === 0) return
  if (!orderedIds.every((id) => typeof id === 'string')) return

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.pageBlock.updateMany({ where: { id, pageKey }, data: { displayOrder: index } })
    )
  )

  revalidatePageAndPublic(pageKey)
}

export async function toggleBlockVisibility(pageKey: PageBlockPageKey, blockId: string): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return
  if (!isPageBlockPageKey(pageKey) || typeof blockId !== 'string') return

  const block = await prisma.pageBlock.findFirst({
    where: { id: blockId, pageKey },
    select: { visible: true },
  })
  if (!block) return

  await prisma.pageBlock.update({ where: { id: blockId }, data: { visible: !block.visible } })

  revalidatePageAndPublic(pageKey)
}

async function materializeDefaultBlocks(pageKey: PageBlockPageKey): Promise<void> {
  const existing = await prisma.pageBlock.count({ where: { pageKey } })
  if (existing > 0) return

  const now = new Date()
  await prisma.pageBlock.createMany({
    data: defaultPageBlocks(pageKey).map((block, index) =>
      block.kind === 'fixed'
        ? { pageKey, kind: 'fixed', fixedKey: block.fixedKey, displayOrder: index, visible: true }
        : {
            pageKey,
            kind: block.kind,
            content: block.content as unknown as Prisma.InputJsonValue,
            publishedSnapshot: block.content as unknown as Prisma.InputJsonValue,
            publishedAt: now,
            displayOrder: index,
            visible: true,
          }
    ),
  })
}

export async function addBlock(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return

  const pageKey = String(formData.get('pageKey') ?? '')
  const kind = String(formData.get('kind') ?? '')
  if (!isPageBlockPageKey(pageKey) || !isFreeBlockKind(kind)) return

  await materializeDefaultBlocks(pageKey)

  const last = await prisma.pageBlock.findFirst({
    where: { pageKey },
    orderBy: { displayOrder: 'desc' },
  })

  await prisma.pageBlock.create({
    data: {
      pageKey,
      kind,
      displayOrder: (last?.displayOrder ?? -1) + 1,
      visible: false,
    },
  })

  revalidatePageAndPublic(pageKey)
}

export async function deleteBlock(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return

  const blockId = String(formData.get('blockId') ?? '')
  const pageKey = String(formData.get('pageKey') ?? '')
  if (!blockId || !isPageBlockPageKey(pageKey)) return

  await prisma.pageBlock.deleteMany({ where: { id: blockId, pageKey, kind: { not: 'fixed' } } })

  revalidatePageAndPublic(pageKey)
}
