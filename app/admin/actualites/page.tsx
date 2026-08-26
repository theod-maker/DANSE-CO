import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { DeleteForm } from './delete-form'
import { HistoryLink } from '../_shared/history-link'

export const dynamic = 'force-dynamic'

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default async function NewsListPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const entries = await prisma.news.findMany({ orderBy: { date: 'asc' } })

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Actualités
        </h1>
        <Link
          href="/admin/actualites/nouvelle"
          className="rounded-md bg-[#6C5CA8] px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          Nouvelle actualité
        </Link>
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        Classées par date d&apos;événement, la plus proche en premier.
      </p>

      {entries.length === 0 ? (
        <p className="mt-10 rounded-md border border-dashed border-neutral-300 px-6 py-10 text-center text-neutral-500">
          Aucune actualité pour le moment.
          <br />
          Utilisez « Nouvelle actualité » pour annoncer un événement.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200">
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-baseline justify-between gap-6 py-4">
              <div className="min-w-0">
                <Link
                  href={`/admin/actualites/${entry.id}`}
                  className="text-neutral-900 underline-offset-4 hover:text-[#6C5CA8] hover:underline"
                >
                  {entry.title}
                </Link>
                <p className="mt-1 text-sm text-neutral-500">{dateFormatter.format(entry.date)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <HistoryLink contentType="news" entityId={entry.id} />
                <DeleteForm id={entry.id} title={entry.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
