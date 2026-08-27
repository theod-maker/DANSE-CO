'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'
import type { PageBlockPageKey } from '../../../../../src/lib/content/revalidate'
import { reorderBlocks, toggleBlockVisibility, addBlock, deleteBlock } from './actions'

export interface BlockListEntry {
  id: string
  isFixed: boolean
  visible: boolean
  label: string
  preview?: string
}

interface BlockListProps {
  pageKey: PageBlockPageKey
  entries: BlockListEntry[]
  availableFreeKinds: [string, string][]
}

function move<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length || from === to) return items
  const next = [...items]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

export function BlockList({ pageKey, entries: initial, availableFreeKinds }: BlockListProps) {
  const [entries, setEntries] = useState(initial)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function applyOrder(next: BlockListEntry[]) {
    if (next === entries) return
    setEntries(next)
    startTransition(() => {
      void reorderBlocks(pageKey, next.map((entry) => entry.id))
    })
  }

  function toggleVisible(index: number) {
    const next = entries.map((entry, position) =>
      position === index ? { ...entry, visible: !entry.visible } : entry
    )
    setEntries(next)
    startTransition(() => {
      void toggleBlockVisibility(pageKey, entries[index].id)
    })
  }

  return (
    <div className="mt-8 max-w-2xl">
      <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
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

            <span className={entry.visible ? 'min-w-0 flex-1' : 'min-w-0 flex-1 opacity-40'}>
              {entry.isFixed ? (
                <span className="block text-neutral-900">{entry.label}</span>
              ) : (
                <Link
                  href={`/admin/mise-en-page/blocs/${entry.id}`}
                  className="block text-neutral-900 underline-offset-4 hover:text-[#6C5CA8] hover:underline"
                >
                  {entry.label}
                </Link>
              )}
              {entry.preview && (
                <span className="block truncate text-xs text-neutral-500">{entry.preview}</span>
              )}
            </span>

            {entry.isFixed && (
              <span className="shrink-0 rounded-md bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
                Non éditable
              </span>
            )}

            <button
              type="button"
              onClick={() => toggleVisible(index)}
              disabled={isPending}
              aria-pressed={entry.visible}
              className={
                entry.visible
                  ? 'shrink-0 rounded-md bg-[#6C5CA8]/10 px-3 py-1 text-sm text-[#6C5CA8] disabled:opacity-50'
                  : 'shrink-0 rounded-md bg-neutral-100 px-3 py-1 text-sm text-neutral-500 disabled:opacity-50'
              }
            >
              {entry.visible ? 'Affiché' : 'Masqué'}
            </button>

            {!entry.isFixed && (
              pendingDeleteId === entry.id ? (
                <form action={deleteBlock} className="flex shrink-0 items-center gap-2">
                  <input type="hidden" name="blockId" value={entry.id} />
                  <input type="hidden" name="pageKey" value={pageKey} />
                  <button
                    type="submit"
                    className="rounded-md bg-red-700 px-3 py-1 text-sm text-white transition-opacity hover:opacity-90"
                  >
                    Confirmer
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDeleteId(null)}
                    className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
                  >
                    Annuler
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setPendingDeleteId(entry.id)}
                  className="shrink-0 text-sm text-neutral-500 underline underline-offset-4 hover:text-red-700"
                >
                  Supprimer
                </button>
              )
            )}
          </li>
        ))}
      </ul>

      <form action={addBlock} className="mt-8 flex items-center gap-3">
        <input type="hidden" name="pageKey" value={pageKey} />
        <select
          name="kind"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-700"
        >
          {availableFreeKinds.map(([kind, label]) => (
            <option key={kind} value={kind}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-[#6C5CA8] px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          Ajouter un bloc
        </button>
      </form>
    </div>
  )
}
