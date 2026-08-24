'use client'

import Link from 'next/link'
import { OrderableList, type OrderableEntry } from '../_shared/orderable-list'
import { DeleteForm } from '../_shared/delete-form'
import { deleteVenue, reorderVenues } from './actions'

export function VenueList({ entries }: { entries: OrderableEntry[] }) {
  return (
    <OrderableList
      entries={entries}
      onReorder={reorderVenues}
      renderLabel={(entry) => (
        <Link
          href={`/admin/salles/${entry.id}`}
          className="text-neutral-900 underline-offset-4 hover:text-[#6C5CA8] hover:underline"
        >
          {entry.label}
        </Link>
      )}
      renderActions={(entry) => (
        <DeleteForm id={entry.id} label={entry.label} action={deleteVenue} />
      )}
    />
  )
}
