import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { InstructorList } from './instructor-list'
import { resolvePublishState } from '../_shared/resolve-publish-state'

export const dynamic = 'force-dynamic'

export default async function InstructorsPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const instructors = await prisma.instructor.findMany({ orderBy: { displayOrder: 'asc' } })
  const publishStates = Object.fromEntries(
    await Promise.all(
      instructors.map(async (i) => [i.id, await resolvePublishState('instructors', i.id, i.publishedAt)])
    )
  )

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Professeurs
        </h1>
        <Link
          href="/admin/professeurs/nouveau"
          className="rounded-md bg-[#6C5CA8] px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          Nouveau professeur
        </Link>
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        Glissez un professeur pour le déplacer, ou utilisez les flèches. L&apos;ordre est celui du site.
      </p>

      {instructors.length === 0 ? (
        <p className="mt-10 rounded-md border border-dashed border-neutral-300 px-6 py-10 text-center text-neutral-500">
          Aucun professeur pour le moment.
          <br />
          Utilisez « Nouveau professeur » pour en ajouter un.
        </p>
      ) : (
        <InstructorList
          entries={instructors.map((instructor) => ({ id: instructor.id, label: instructor.name }))}
          publishStates={publishStates}
        />
      )}
    </div>
  )
}
