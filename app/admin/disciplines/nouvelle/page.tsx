import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { DisciplineForm } from '../discipline-form'

export const dynamic = 'force-dynamic'

export default async function NewDisciplinePage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Nouvelle danse
      </h1>

      <DisciplineForm
        initialValues={{ title: '', iconName: 'Zap', description: '', benefits: [], imageUrl: '' }}
      />
    </div>
  )
}
