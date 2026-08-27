'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { prisma } from '../../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../../src/lib/adminAuth'
import { pageBlocksTag, type PageBlockPageKey } from '../../../../../src/lib/content/revalidate'
import type { FreeBlockKind } from '../../../../../src/lib/content/pageBlocks'

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
  if (orderedIds.length === 0) return

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.pageBlock.update({ where: { id }, data: { displayOrder: index } })
    )
  )

  revalidatePageAndPublic(pageKey)
}

export async function toggleBlockVisibility(pageKey: PageBlockPageKey, blockId: string): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return

  const block = await prisma.pageBlock.findUnique({ where: { id: blockId }, select: { visible: true } })
  if (!block) return

  await prisma.pageBlock.update({ where: { id: blockId }, data: { visible: !block.visible } })

  revalidatePageAndPublic(pageKey)
}

export async function addBlock(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return

  const pageKey = String(formData.get('pageKey') ?? '') as PageBlockPageKey
  const kind = String(formData.get('kind') ?? '') as FreeBlockKind
  if (!pageKey || !kind) return

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
  const pageKey = String(formData.get('pageKey') ?? '') as PageBlockPageKey
  if (!blockId || !pageKey) return

  await prisma.pageBlock.deleteMany({ where: { id: blockId, kind: { not: 'fixed' } } })

  revalidatePageAndPublic(pageKey)
}
