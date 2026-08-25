import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { HOMEPAGE_FIELDS } from './validation'
import { HomepageForm } from './homepage-form'
import type { HomepageInput } from './validation'

export const dynamic = 'force-dynamic'

export default async function HomepageAdminPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const stored = await prisma.homepage.findUnique({ where: { id: SINGLETON_ID } })

  const initialValues = Object.fromEntries(
    HOMEPAGE_FIELDS.map((field) => [field, stored ? (stored[field] ?? '') : ''])
  ) as Record<keyof HomepageInput, string>

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Page d&apos;accueil
      </h1>

      <p className="mt-3 text-sm text-neutral-500">
        Les textes et images de la page que voient vos visiteurs en arrivant.
      </p>

      <HomepageForm initialValues={initialValues} />
    </div>
  )
}
