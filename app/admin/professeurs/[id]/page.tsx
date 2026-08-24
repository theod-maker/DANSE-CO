import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { InstructorForm } from '../instructor-form'

export const dynamic = 'force-dynamic'

export default async function EditInstructorPage({ params }: { params: Promise<{ id: string }> }) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const { id } = await params
  const instructor = await prisma.instructor.findUnique({ where: { id } })

  if (!instructor) {
    return (
      <div>
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Professeur introuvable
        </h1>
        <p className="mt-4 text-neutral-600">
          Cette fiche a peut-être été supprimée entre-temps.
        </p>
        <Link
          href="/admin/professeurs"
          className="mt-6 inline-block text-sm text-[#6C5CA8] underline underline-offset-4"
        >
          Retour à la liste
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Modifier le professeur
      </h1>

      <InstructorForm
        initialValues={{
          id: instructor.id,
          name: instructor.name,
          specialty: instructor.specialty,
          bio: instructor.bio,
          experience: instructor.experience,
          photoUrl: instructor.photoUrl ?? '',
        }}
      />
    </div>
  )
}
