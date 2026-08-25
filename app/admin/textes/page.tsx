import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { PageTextsForm } from './page-texts-form'
import { PAGE_TEXT_FIELDS, type PageTextsInput } from './validation'

export const dynamic = 'force-dynamic'

export default async function PageTextsPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const stored = await prisma.pageTexts.findUnique({ where: { id: SINGLETON_ID } })

  const initialValues = Object.fromEntries(
    PAGE_TEXT_FIELDS.map(({ key }) => [key, stored ? stored[key] : ''])
  ) as PageTextsInput

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Textes des pages
      </h1>

      <p className="mt-3 text-sm text-neutral-500">
        La phrase d&apos;introduction affichée sous le titre de chaque page du site.
      </p>

      <PageTextsForm initialValues={initialValues} />
    </div>
  )
}
