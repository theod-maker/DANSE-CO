'use client'

import Link from 'next/link'
import { OrderableList, type OrderableEntry } from '../_shared/orderable-list'
import { DeleteForm } from '../_shared/delete-form'
import { HistoryLink } from '../_shared/history-link'
import { PublishStatus, type PublishState } from '../_shared/publish-status'
import { deleteInstructor, reorderInstructors } from './actions'

interface InstructorListProps {
  entries: OrderableEntry[]
  publishStates: Record<string, PublishState>
}

export function InstructorList({ entries, publishStates }: InstructorListProps) {
  return (
    <OrderableList
      entries={entries}
      onReorder={reorderInstructors}
      renderLabel={(entry) => (
        <Link
          href={`/admin/professeurs/${entry.id}`}
          className="text-neutral-900 underline-offset-4 hover:text-[#6C5CA8] hover:underline"
        >
          {entry.label}
        </Link>
      )}
      renderActions={(entry) => (
        <div className="flex shrink-0 items-center gap-4">
          <PublishStatus contentType="instructors" entityId={entry.id} state={publishStates[entry.id] ?? 'upToDate'} />
          <HistoryLink contentType="instructors" entityId={entry.id} />
          <DeleteForm id={entry.id} label={entry.label} action={deleteInstructor} />
        </div>
      )}
    />
  )
}
