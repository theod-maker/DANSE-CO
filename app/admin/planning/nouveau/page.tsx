import { redirect } from 'next/navigation'
import { prisma } from '../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { CourseForm } from '../course-form'

export const dynamic = 'force-dynamic'

export default async function NewCoursePage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const venues = await prisma.venue.findMany({ orderBy: { displayOrder: 'asc' } })

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Ajouter un cours
      </h1>

      <CourseForm
        initialValues={{ name: '', day: '', startTime: '', endTime: '', level: '', venue: '' }}
        venueSuggestions={venues.map((venue) => venue.name)}
      />
    </div>
  )
}
