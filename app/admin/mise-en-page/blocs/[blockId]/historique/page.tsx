import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../../../../../src/lib/adminAuth'
import { listBlockHistory } from '../../../../../../src/lib/content/pageBlocks'
import { RestoreBlockForm } from './restore-block-form'

export const dynamic = 'force-dynamic'

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export default async function BlockHistoryPage({
  params,
}: {
  params: Promise<{ blockId: string }>
}) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const { blockId } = await params
  const entries = await listBlockHistory(blockId)

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Historique du bloc
      </h1>

      <p className="mt-3 max-w-2xl text-sm text-neutral-500">
        Chaque enregistrement garde une trace de l&apos;état précédent. Restaurer une
        version ne perd rien.
      </p>

      {entries.length === 0 ? (
        <p className="mt-10 rounded-md border border-dashed border-neutral-300 px-6 py-10 text-center text-neutral-500">
          Aucun historique pour ce bloc.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200">
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between gap-6 py-4">
              <div className="min-w-0">
                <p className="text-neutral-900">Modification</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {dateFormatter.format(entry.createdAt)} · {entry.adminUsername}
                </p>
              </div>
              <RestoreBlockForm entryId={entry.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
