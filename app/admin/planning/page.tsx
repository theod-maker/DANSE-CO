import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { DeleteForm } from '../_shared/delete-form'
import { deleteCourse } from './actions'
import { dayRank, startMinutes } from './validation'

export const dynamic = 'force-dynamic'

export default async function PlanningPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const courses = await prisma.scheduleEntry.findMany()

  const sorted = [...courses].sort(
    (a, b) => dayRank(a.day) - dayRank(b.day) || startMinutes(a.time) - startMinutes(b.time)
  )

  const days = [...new Set(sorted.map((course) => course.day))]

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Planning
        </h1>
        <Link
          href="/admin/planning/nouveau"
          className="rounded-md bg-[#6C5CA8] px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          Ajouter un cours
        </Link>
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        Les cours se classent automatiquement par jour puis par heure. Rien à ranger.
      </p>

      {sorted.length === 0 ? (
        <p className="mt-10 rounded-md border border-dashed border-neutral-300 px-6 py-10 text-center text-neutral-500">
          Aucun cours pour le moment.
          <br />
          Utilisez « Ajouter un cours » pour commencer le planning.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {days.map((day) => (
            <section key={day}>
              <h2 className="text-sm uppercase tracking-wider text-neutral-400">{day}</h2>
              <ul className="mt-2 divide-y divide-neutral-200 border-t border-neutral-200">
                {sorted
                  .filter((course) => course.day === day)
                  .map((course) => (
                    <li key={course.id} className="flex items-baseline justify-between gap-6 py-3">
                      <div className="min-w-0">
                        <Link
                          href={`/admin/planning/${course.id}`}
                          className="text-neutral-900 underline-offset-4 hover:text-[#6C5CA8] hover:underline"
                        >
                          {course.name}
                        </Link>
                        <p className="mt-1 text-sm text-neutral-500">
                          {course.time} · {course.level}
                          {course.venue ? ` · ${course.venue}` : ''}
                        </p>
                      </div>
                      <DeleteForm id={course.id} label={course.name} action={deleteCourse} />
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
