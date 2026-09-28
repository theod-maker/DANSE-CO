import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { HistoryLink } from '../_shared/history-link'
import { PublishStatus } from '../_shared/publish-status'
import { resolvePublishState } from '../_shared/resolve-publish-state'
import { PreviewLink } from '../_shared/preview-link'
import { listMediaOptions } from '../medias/queries'
import { SeoForm } from './seo-form'
import { SEO_PAGES, type PageSeoFields } from '../../../src/lib/content/seoPages'
import type { SeoPagesInput } from './validation'

export const dynamic = 'force-dynamic'

export default async function SeoPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const [stored, mediaOptions] = await Promise.all([
    prisma.pageSeo.findUnique({ where: { id: SINGLETON_ID } }),
    listMediaOptions(),
  ])

  const publishState = await resolvePublishState('pageSeo', SINGLETON_ID, stored?.publishedAt ?? null)

  const storedPages = (stored?.pages as Record<string, PageSeoFields> | undefined) ?? {}
  const initialValues: SeoPagesInput = Object.fromEntries(
    SEO_PAGES.map(({ key }) => [
      key,
      storedPages[key] ?? { title: '', description: '', imageUrl: null },
    ])
  )

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Référencement
        </h1>
        <div className="flex items-center gap-4">
          <PublishStatus contentType="pageSeo" entityId={SINGLETON_ID} state={publishState} />
          <HistoryLink contentType="pageSeo" entityId={SINGLETON_ID} />
          <PreviewLink publicPath="/" />
        </div>
      </div>

      <p className="mt-3 max-w-2xl text-sm text-neutral-500">
        Pour chaque page, le titre et la description affichés dans les résultats Google, et
        l&apos;image affichée quand la page est partagée sur les réseaux sociaux. Un champ
        laissé vide garde sa valeur par défaut.
      </p>

      <SeoForm initialValues={initialValues} mediaOptions={mediaOptions} />
    </div>
  )
}
