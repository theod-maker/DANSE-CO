import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { InstructorForm } from '../instructor-form'
import { listMediaOptions } from '../../medias/queries'

export const dynamic = 'force-dynamic'

export default async function NewInstructorPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const mediaOptions = await listMediaOptions()

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Nouveau professeur
      </h1>

      <InstructorForm
        mediaOptions={mediaOptions}
        initialValues={{ name: '', specialty: '', bio: '', experience: '', photoUrl: '' }}
      />
    </div>
  )
}
