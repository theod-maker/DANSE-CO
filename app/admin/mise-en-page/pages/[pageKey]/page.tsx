import { redirect, notFound } from 'next/navigation'
import { prisma } from '../../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../../src/lib/adminAuth'
import { PAGE_BLOCK_PAGE_KEYS, type PageBlockPageKey } from '../../../../../src/lib/content/revalidate'
import type { FreeBlockContent } from '../../../../../src/lib/content/pageBlocks'
import { PAGE_LABELS, FIXED_BLOCK_LABELS, FREE_BLOCK_LABELS } from '../../../../../src/lib/content/pageBlockLabels'
import { BlockList, type BlockListEntry } from './block-list'

export const dynamic = 'force-dynamic'

function isValidPageKey(value: string): value is PageBlockPageKey {
  return (PAGE_BLOCK_PAGE_KEYS as readonly string[]).includes(value)
}

function previewFor(content: FreeBlockContent | null): string {
  if (!content) return 'Sans contenu'
  if ('body' in content) return content.body.slice(0, 60) || 'Sans contenu'
  if ('imageUrl' in content) return content.caption || content.imageUrl || 'Sans contenu'
  if ('imageUrls' in content && 'columns' in content) return content.title || `${content.imageUrls.length} image(s)`
  if ('buttonLabel' in content) return content.title || content.buttonLabel
  if ('year' in content) return `${content.year} — ${content.label}`
  return 'Sans contenu'
}

export default async function PageBlocksPage({
  params,
}: {
  params: Promise<{ pageKey: string }>
}) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const { pageKey } = await params
  if (!isValidPageKey(pageKey)) notFound()

  const blocks = await prisma.pageBlock.findMany({
    where: { pageKey },
    orderBy: { displayOrder: 'asc' },
  })

  const entries: BlockListEntry[] = blocks.map((block) => {
    if (block.kind === 'fixed') {
      return {
        id: block.id,
        isFixed: true,
        visible: block.visible,
        label: FIXED_BLOCK_LABELS[block.fixedKey ?? ''] ?? block.fixedKey ?? '',
      }
    }
    return {
      id: block.id,
      isFixed: false,
      visible: block.visible,
      label: FREE_BLOCK_LABELS[block.kind] ?? block.kind,
      preview: previewFor(block.content as FreeBlockContent | null),
    }
  })

  const availableFreeKinds = Object.entries(FREE_BLOCK_LABELS).filter(
    ([kind]) => kind !== 'timelineEvent' || pageKey === 'histoire'
  )

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Mise en page — {PAGE_LABELS[pageKey]}
      </h1>

      <p className="mt-3 max-w-2xl text-sm text-neutral-500">
        Déplacez et masquez les blocs de cette page, ou ajoutez-en de nouveaux.
      </p>

      <BlockList pageKey={pageKey} entries={entries} availableFreeKinds={availableFreeKinds} />
    </div>
  )
}
