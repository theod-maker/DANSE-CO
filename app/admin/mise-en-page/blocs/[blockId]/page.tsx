import { redirect, notFound } from 'next/navigation'
import { prisma } from '../../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../../src/lib/adminAuth'
import { hasBlockPendingChanges } from '../../../../../src/lib/content/pageBlocks'
import type {
  TextBlockContent,
  ImageBlockContent,
  GalleryBlockContent,
  CtaBlockContent,
  TimelineEventBlockContent,
} from '../../../../../src/lib/content/pageBlocks'
import type { PageBlockPageKey } from '../../../../../src/lib/content/revalidate'
import { PAGE_LABELS, FREE_BLOCK_LABELS } from '../../../../../src/lib/content/pageBlockLabels'
import { listMediaOptions } from '../../../medias/queries'
import { PreviewLink } from '../../../_shared/preview-link'
import Link from 'next/link'
import { TextForm } from './text-form'
import { ImageForm } from './image-form'
import { GalleryForm } from './gallery-form'
import { CtaForm } from './cta-form'
import { TimelineEventForm } from './timeline-event-form'
import type { BlockPublishState } from './block-publish-status'

export const dynamic = 'force-dynamic'

const PAGE_PUBLIC_PATH: Record<PageBlockPageKey, string> = {
  disciplines: '/disciplines',
  professeurs: '/instructors',
  salles: '/locations',
  planning: '/planning',
  contact: '/contact',
  actualites: '/actualites',
  tarifs: '/pricing',
  histoire: '/histoire',
}

export default async function BlockEditPage({
  params,
}: {
  params: Promise<{ blockId: string }>
}) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const { blockId } = await params
  const block = await prisma.pageBlock.findUnique({ where: { id: blockId } })
  if (!block || block.kind === 'fixed') notFound()

  const pageKey = block.pageKey as PageBlockPageKey
  const pending = await hasBlockPendingChanges(blockId)
  const publishState: BlockPublishState = !block.publishedAt
    ? 'neverPublished'
    : pending
      ? 'pending'
      : 'upToDate'

  const needsMedia = block.kind === 'image' || block.kind === 'gallery' || block.kind === 'timelineEvent'
  const mediaOptions = needsMedia ? await listMediaOptions() : []

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {FREE_BLOCK_LABELS[block.kind] ?? block.kind} — {PAGE_LABELS[pageKey]}
        </h1>
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/mise-en-page/blocs/${blockId}/historique`}
            className="text-sm text-neutral-500 underline underline-offset-4 hover:text-[#6C5CA8]"
          >
            Historique
          </Link>
          <PreviewLink publicPath={PAGE_PUBLIC_PATH[pageKey]} />
          <Link
            href={`/admin/mise-en-page/pages/${pageKey}`}
            className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
          >
            Retour à la page
          </Link>
        </div>
      </div>

      {block.kind === 'text' && (
        <TextForm blockId={blockId} content={block.content as TextBlockContent | null} publishState={publishState} />
      )}
      {block.kind === 'image' && (
        <ImageForm
          blockId={blockId}
          content={block.content as ImageBlockContent | null}
          publishState={publishState}
          mediaOptions={mediaOptions}
        />
      )}
      {block.kind === 'gallery' && (
        <GalleryForm
          blockId={blockId}
          content={block.content as GalleryBlockContent | null}
          publishState={publishState}
          mediaOptions={mediaOptions}
        />
      )}
      {block.kind === 'cta' && (
        <CtaForm blockId={blockId} content={block.content as CtaBlockContent | null} publishState={publishState} />
      )}
      {block.kind === 'timelineEvent' && (
        <TimelineEventForm
          blockId={blockId}
          content={block.content as TimelineEventBlockContent | null}
          publishState={publishState}
          mediaOptions={mediaOptions}
        />
      )}
    </div>
  )
}
