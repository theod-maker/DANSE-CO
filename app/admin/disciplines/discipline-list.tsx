'use client'

import Link from 'next/link'
import { OrderableList, type OrderableEntry } from '../_shared/orderable-list'
import { DeleteForm } from '../_shared/delete-form'
import { HistoryLink } from '../_shared/history-link'
import { PublishStatus, type PublishState } from '../_shared/publish-status'
import { deleteDiscipline, reorderDisciplines } from './actions'

interface DisciplineListProps {
  entries: OrderableEntry[]
  publishStates: Record<string, PublishState>
}

export function DisciplineList({ entries, publishStates }: DisciplineListProps) {
  return (
    <OrderableList
      entries={entries}
      onReorder={reorderDisciplines}
      renderLabel={(entry) => (
        <Link
          href={`/admin/disciplines/${entry.id}`}
          className="text-neutral-900 underline-offset-4 hover:text-[#6C5CA8] hover:underline"
        >
          {entry.label}
        </Link>
      )}
      renderActions={(entry) => (
        <div className="flex shrink-0 items-center gap-4">
          <PublishStatus contentType="disciplines" entityId={entry.id} state={publishStates[entry.id] ?? 'upToDate'} />
          <HistoryLink contentType="disciplines" entityId={entry.id} />
          <DeleteForm id={entry.id} label={entry.label} action={deleteDiscipline} />
        </div>
      )}
    />
  )
}
