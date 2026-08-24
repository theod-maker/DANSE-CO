'use client'

import { useState, useTransition, type ReactNode } from 'react'

export interface OrderableEntry {
  id: string
  label: string
}

interface OrderableListProps {
  entries: OrderableEntry[]
  onReorder: (orderedIds: string[]) => Promise<void>
  renderActions?: (entry: OrderableEntry) => ReactNode
  renderLabel?: (entry: OrderableEntry) => ReactNode
}

function move(entries: OrderableEntry[], from: number, to: number): OrderableEntry[] {
  if (to < 0 || to >= entries.length || from === to) return entries
  const next = [...entries]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

export function OrderableList({
  entries: initialEntries,
  onReorder,
  renderActions,
  renderLabel,
}: OrderableListProps) {
  const [entries, setEntries] = useState(initialEntries)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  function applyOrder(next: OrderableEntry[]) {
    if (next === entries) return
    setEntries(next)
    startTransition(() => {
      void onReorder(next.map((entry) => entry.id))
    })
  }

  return (
    <ul className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200">
      {entries.map((entry, index) => (
        <li
          key={entry.id}
          draggable
          onDragStart={() => setDraggedIndex(index)}
          onDragEnd={() => setDraggedIndex(null)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            if (draggedIndex === null) return
            applyOrder(move(entries, draggedIndex, index))
            setDraggedIndex(null)
          }}
          className={
            draggedIndex === index
              ? 'flex items-center gap-4 py-4 opacity-40'
              : 'flex items-center gap-4 py-4'
          }
        >
          <span className="cursor-grab select-none text-neutral-300" aria-hidden="true">
            ⠿
          </span>

          <span className="flex shrink-0 flex-col">
            <button
              type="button"
              onClick={() => applyOrder(move(entries, index, index - 1))}
              disabled={index === 0 || isPending}
              aria-label={`Monter ${entry.label}`}
              className="px-1 text-xs text-neutral-500 hover:text-[#6C5CA8] disabled:opacity-30"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => applyOrder(move(entries, index, index + 1))}
              disabled={index === entries.length - 1 || isPending}
              aria-label={`Descendre ${entry.label}`}
              className="px-1 text-xs text-neutral-500 hover:text-[#6C5CA8] disabled:opacity-30"
            >
              ▼
            </button>
          </span>

          <span className="min-w-0 flex-1">
            {renderLabel ? renderLabel(entry) : entry.label}
          </span>

          {renderActions?.(entry)}
        </li>
      ))}
    </ul>
  )
}
