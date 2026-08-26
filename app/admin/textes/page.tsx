import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { HistoryLink } from '../_shared/history-link'
import { PublishStatus } from '../_shared/publish-status'
import { resolvePublishState } from '../_shared/resolve-publish-state'
import { PageTextsForm } from './page-texts-form'
import { PAGE_TEXT_FIELDS, type PageTextsInput } from './validation'

export const dynamic = 'force-dynamic'

export default async function PageTextsPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const stored = await prisma.pageTexts.findUnique({ where: { id: SINGLETON_ID } })
  const publishState = await resolvePublishState('pageTexts', SINGLETON_ID, stored?.publishedAt ?? null)

  const initialValues = Object.fromEntries(
    PAGE_TEXT_FIELDS.map(({ key }) => [key, stored ? stored[key] : ''])
  ) as PageTextsInput

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Textes des pages
        </h1>
        <div className="flex items-center gap-4">
          <PublishStatus contentType="pageTexts" entityId={SINGLETON_ID} state={publishState} />
          <HistoryLink contentType="pageTexts" entityId={SINGLETON_ID} />
        </div>
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        La phrase d&apos;introduction affichée sous le titre de chaque page du site.
      </p>

      <PageTextsForm initialValues={initialValues} />
    </div>
  )
}
