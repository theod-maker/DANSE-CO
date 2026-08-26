import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { listHistory, type HistoryContentType } from '../../../src/lib/content/history'
import { CONTENT_TAGS } from '../../../src/lib/content/revalidate'
import { RestoreForm } from './restore-form'

export const dynamic = 'force-dynamic'

const HISTORY_CONTENT_TYPES = Object.keys(CONTENT_TAGS).filter(
  (key) => key !== 'sections'
) as HistoryContentType[]

function isHistoryContentType(value: string): value is HistoryContentType {
  return (HISTORY_CONTENT_TYPES as string[]).includes(value)
}

const ACTION_LABELS: Record<string, string> = {
  create: 'Création',
  update: 'Modification',
  delete: 'Suppression',
}

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ contentType?: string; entityId?: string }>
}) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const { contentType, entityId } = await searchParams

  if (!contentType || !entityId || !isHistoryContentType(contentType)) {
    return (
      <div>
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Historique
        </h1>
        <p className="mt-3 text-sm text-neutral-500">Aucun élément indiqué.</p>
      </div>
    )
  }

  const entries = await listHistory(contentType, entityId)

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Historique
      </h1>

      <p className="mt-3 max-w-2xl text-sm text-neutral-500">
        Chaque enregistrement garde une trace de l&apos;état précédent. Restaurer une version
        ne perd rien : l&apos;état actuel est lui-même conservé, et reste accessible juste
        au-dessus.
      </p>

      {entries.length === 0 ? (
        <p className="mt-10 rounded-md border border-dashed border-neutral-300 px-6 py-10 text-center text-neutral-500">
          Aucun historique pour cet élément.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200">
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between gap-6 py-4">
              <div className="min-w-0">
                <p className="text-neutral-900">{ACTION_LABELS[entry.action] ?? entry.action}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {dateFormatter.format(entry.createdAt)} · {entry.adminUsername}
                </p>
              </div>

              {entry.action === 'create' ? (
                <span className="shrink-0 text-sm text-neutral-400">Non restaurable</span>
              ) : (
                <RestoreForm entryId={entry.id} label={entry.label} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
