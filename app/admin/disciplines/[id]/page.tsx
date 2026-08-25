import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { DisciplineForm } from '../discipline-form'

export const dynamic = 'force-dynamic'

export default async function EditDisciplinePage({ params }: { params: Promise<{ id: string }> }) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const { id } = await params
  const discipline = await prisma.discipline.findUnique({ where: { id } })

  if (!discipline) {
    return (
      <div>
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Danse introuvable
        </h1>
        <p className="mt-4 text-neutral-600">Cette danse a peut-être été supprimée entre-temps.</p>
        <Link
          href="/admin/disciplines"
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
        Modifier la danse
      </h1>

      <DisciplineForm
        initialValues={{
          id: discipline.id,
          title: discipline.title,
          iconName: discipline.iconName,
          description: discipline.description,
          benefits: discipline.benefits,
          imageUrl: discipline.imageUrl ?? '',
        }}
      />
    </div>
  )
}
