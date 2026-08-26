import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { DisciplineList } from './discipline-list'
import { resolvePublishState } from '../_shared/resolve-publish-state'
import { PreviewLink } from '../_shared/preview-link'

export const dynamic = 'force-dynamic'

export default async function DisciplinesPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const disciplines = await prisma.discipline.findMany({ orderBy: { displayOrder: 'asc' } })
  const publishStates = Object.fromEntries(
    await Promise.all(
      disciplines.map(async (d) => [d.id, await resolvePublishState('disciplines', d.id, d.publishedAt)])
    )
  )

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Disciplines
        </h1>
        <Link
          href="/admin/disciplines/nouvelle"
          className="rounded-md bg-[#6C5CA8] px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          Nouvelle danse
        </Link>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          Glissez une danse pour la déplacer, ou utilisez les flèches. L&apos;ordre est celui du site.
        </p>
        <PreviewLink publicPath="/disciplines" />
      </div>

      {disciplines.length === 0 ? (
        <p className="mt-10 rounded-md border border-dashed border-neutral-300 px-6 py-10 text-center text-neutral-500">
          Aucune danse pour le moment.
          <br />
          Utilisez « Nouvelle danse » pour en ajouter une.
        </p>
      ) : (
        <DisciplineList
          entries={disciplines.map((discipline) => ({ id: discipline.id, label: discipline.title }))}
          publishStates={publishStates}
        />
      )}
    </div>
  )
}
