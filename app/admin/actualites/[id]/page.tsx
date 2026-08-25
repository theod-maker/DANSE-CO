import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { NewsForm } from '../news-form'
import { listMediaOptions } from '../../medias/queries'

export const dynamic = 'force-dynamic'

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const mediaOptions = await listMediaOptions()

  const { id } = await params
  const entry = await prisma.news.findUnique({ where: { id } })

  if (!entry) {
    return (
      <div>
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Actualité introuvable
        </h1>
        <p className="mt-4 text-neutral-600">
          Cette actualité a peut-être été supprimée entre-temps.
        </p>
        <Link
          href="/admin/actualites"
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
        Modifier l&apos;actualité
      </h1>

      <NewsForm
        mediaOptions={mediaOptions}
        initialValues={{
          id: entry.id,
          title: entry.title,
          date: toDateInputValue(entry.date),
          excerpt: entry.excerpt,
          imageUrl: entry.imageUrl ?? '',
          link: entry.link ?? '',
        }}
      />
    </div>
  )
}
