import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import {
  FIXED_SECTIONS,
  HOMEPAGE_KEY,
  HOMEPAGE_SECTIONS,
  resolveSections,
} from '../../../src/lib/content/sections'
import { SectionList } from './section-list'

export const dynamic = 'force-dynamic'

export default async function LayoutPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const stored = await prisma.pageSection.findMany({
    where: { pageKey: HOMEPAGE_KEY },
    orderBy: { displayOrder: 'asc' },
  })

  const resolved = resolveSections(stored)
  const byKey = new Map(HOMEPAGE_SECTIONS.map((section) => [section.key, section]))

  const sections = resolved.map((section) => ({
    key: section.key,
    label: section.label,
    description: byKey.get(section.key)?.description ?? '',
    visible: section.visible,
  }))

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Mise en page
      </h1>

      <p className="mt-3 max-w-2xl text-sm text-neutral-500">
        L&apos;ordre des sections sur votre page d&apos;accueil. Déplacez-les pour changer
        leur ordre, ou masquez-en une sans perdre son contenu.
      </p>

      <SectionList
        sections={sections}
        fixedTop={FIXED_SECTIONS.filter((s) => s.position === 'top')}
        fixedBottom={FIXED_SECTIONS.filter((s) => s.position === 'bottom')}
      />
    </div>
  )
}
