'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { HOMEPAGE_KEY } from '../../../src/lib/content/sections'
import { revalidateContent } from '../_shared/revalidate-after-save'

const PATH = '/admin/mise-en-page'

export interface SectionUpdate {
  key: string
  visible: boolean
}

export async function saveSectionLayout(updates: SectionUpdate[]): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return
  if (updates.length === 0) return

  await prisma.$transaction(
    updates.map((update, index) =>
      prisma.pageSection.upsert({
        where: { pageKey_sectionKey: { pageKey: HOMEPAGE_KEY, sectionKey: update.key } },
        update: { displayOrder: index, visible: update.visible },
        create: {
          pageKey: HOMEPAGE_KEY,
          sectionKey: update.key,
          displayOrder: index,
          visible: update.visible,
        },
      })
    )
  )

  revalidatePath(PATH)
  await revalidateContent('sections')
}
