import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { DisciplineForm } from '../discipline-form'
import { listMediaOptions } from '../../medias/queries'

export const dynamic = 'force-dynamic'

export default async function NewDisciplinePage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const mediaOptions = await listMediaOptions()

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Nouvelle danse
      </h1>

      <DisciplineForm
        mediaOptions={mediaOptions}
        initialValues={{ title: '', iconName: 'Zap', description: '', benefits: [], imageUrl: '' }}
      />
    </div>
  )
}
