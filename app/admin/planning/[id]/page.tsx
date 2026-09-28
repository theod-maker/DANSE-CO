import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { CourseForm } from '../course-form'
import { splitTimeRange } from '../validation'

export const dynamic = 'force-dynamic'

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const { id } = await params
  const [course, venues] = await Promise.all([
    prisma.scheduleEntry.findUnique({ where: { id } }),
    prisma.venue.findMany({ orderBy: { displayOrder: 'asc' } }),
  ])

  if (!course) {
    return (
      <div>
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Cours introuvable
        </h1>
        <p className="mt-4 text-neutral-600">Ce cours a peut-être été supprimé entre-temps.</p>
        <Link
          href="/admin/planning"
          className="mt-6 inline-block text-sm text-[#6C5CA8] underline underline-offset-4"
        >
          Retour au planning
        </Link>
      </div>
    )
  }

  const { start, end } = splitTimeRange(course.time)

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Modifier le cours
      </h1>

      <CourseForm
        initialValues={{
          id: course.id,
          name: course.name,
          day: course.day,
          startTime: start,
          endTime: end,
          level: course.level,
          venue: course.venue ?? '',
        }}
        venueSuggestions={venues.map((venue) => venue.name)}
      />
    </div>
  )
}
