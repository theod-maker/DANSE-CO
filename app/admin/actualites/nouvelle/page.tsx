import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { NewsForm } from '../news-form'

export const dynamic = 'force-dynamic'

export default async function NewNewsPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Nouvelle actualité
      </h1>

      <NewsForm initialValues={{ title: '', date: '', excerpt: '', imageUrl: '', link: '' }} />
    </div>
  )
}
