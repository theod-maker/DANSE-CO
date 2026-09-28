import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { HistoryLink } from '../_shared/history-link'
import { PublishStatus } from '../_shared/publish-status'
import { resolvePublishState } from '../_shared/resolve-publish-state'
import { PreviewLink } from '../_shared/preview-link'
import { HOMEPAGE_FIELDS } from './validation'
import { HomepageForm } from './homepage-form'
import type { HomepageInput } from './validation'
import { listMediaOptions } from '../medias/queries'

export const dynamic = 'force-dynamic'

export default async function HomepageAdminPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const mediaOptions = await listMediaOptions()

  const stored = await prisma.homepage.findUnique({ where: { id: SINGLETON_ID } })
  const publishState = await resolvePublishState('homepage', SINGLETON_ID, stored?.publishedAt ?? null)

  const initialValues = Object.fromEntries(
    HOMEPAGE_FIELDS.map((field) => [field, stored ? (stored[field] ?? '') : ''])
  ) as Record<keyof HomepageInput, string>

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Page d&apos;accueil
        </h1>
        <div className="flex items-center gap-4">
          <PublishStatus contentType="homepage" entityId={SINGLETON_ID} state={publishState} />
          <HistoryLink contentType="homepage" entityId={SINGLETON_ID} />
          <PreviewLink publicPath="/" />
        </div>
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        Les textes et images de la page que voient vos visiteurs en arrivant.
      </p>

      <HomepageForm
        mediaOptions={mediaOptions}
        initialValues={initialValues} />
    </div>
  )
}
