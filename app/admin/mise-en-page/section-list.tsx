'use client'

import { useState, useTransition } from 'react'
import { saveSectionLayout } from './actions'


export interface EditableSection {
  key: string
  label: string
  description: string
  visible: boolean
}

interface SectionListProps {
  sections: EditableSection[]
  fixedTop: { key: string; label: string }[]
  fixedBottom: { key: string; label: string }[]
}

function move(sections: EditableSection[], from: number, to: number): EditableSection[] {
  if (to < 0 || to >= sections.length || from === to) return sections
  const next = [...sections]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

function FixedRow({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-3 rounded-md border border-dashed border-neutral-200 px-4 py-3 text-sm text-neutral-400">
      <span aria-hidden="true">🔒</span>
      <span>{label}</span>
      <span className="ml-auto text-xs">position fixe</span>
    </li>
  )
}

export function SectionList({ sections: initial, fixedTop, fixedBottom }: SectionListProps) {
  const [sections, setSections] = useState(initial)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function persist(next: EditableSection[]) {
    setSections(next)
    startTransition(async () => {
      await saveSectionLayout(next.map((section) => ({ key: section.key, visible: section.visible })))
      setSavedAt(new Date().toLocaleTimeString('fr-FR'))
    })
  }

  function reorder(from: number, to: number) {
    const next = move(sections, from, to)
    if (next !== sections) persist(next)
  }

  function toggle(index: number) {
    persist(
      sections.map((section, position) =>
        position === index ? { ...section, visible: !section.visible } : section
      )
    )
  }

  return (
    <div className="mt-8 max-w-2xl">
      <ul className="space-y-2">
        {fixedTop.map((section) => (
          <FixedRow key={section.key} label={section.label} />
        ))}

        {sections.map((section, index) => (
          <li
            key={section.key}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragEnd={() => setDraggedIndex(null)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              if (draggedIndex !== null) reorder(draggedIndex, index)
              setDraggedIndex(null)
            }}
            className={
              draggedIndex === index
                ? 'flex items-center gap-3 rounded-md border border-neutral-200 bg-white px-4 py-3 opacity-40'
                : 'flex items-center gap-3 rounded-md border border-neutral-200 bg-white px-4 py-3'
            }
          >
            <span className="cursor-grab select-none text-neutral-300" aria-hidden="true">
              ⠿
            </span>

            <span className="flex shrink-0 flex-col">
              <button
                type="button"
                onClick={() => reorder(index, index - 1)}
                disabled={index === 0 || isPending}
                aria-label={`Monter ${section.label}`}
                className="px-1 text-xs text-neutral-500 hover:text-[#6C5CA8] disabled:opacity-30"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => reorder(index, index + 1)}
                disabled={index === sections.length - 1 || isPending}
                aria-label={`Descendre ${section.label}`}
                className="px-1 text-xs text-neutral-500 hover:text-[#6C5CA8] disabled:opacity-30"
              >
                ▼
              </button>
            </span>

            <span className={section.visible ? 'min-w-0 flex-1' : 'min-w-0 flex-1 opacity-40'}>
              <span className="block text-neutral-900">{section.label}</span>
              <span className="block text-xs text-neutral-500">{section.description}</span>
            </span>

            <button
              type="button"
              onClick={() => toggle(index)}
              disabled={isPending}
              aria-pressed={section.visible}
              className={
                section.visible
                  ? 'shrink-0 rounded-md bg-[#6C5CA8]/10 px-3 py-1 text-sm text-[#6C5CA8] disabled:opacity-50'
                  : 'shrink-0 rounded-md bg-neutral-100 px-3 py-1 text-sm text-neutral-500 disabled:opacity-50'
              }
            >
              {section.visible ? 'Affichée' : 'Masquée'}
            </button>
          </li>
        ))}

        {fixedBottom.map((section) => (
          <FixedRow key={section.key} label={section.label} />
        ))}
      </ul>

      <p role="status" className="mt-4 text-sm text-neutral-500">
        {isPending
          ? 'Enregistrement…'
          : savedAt
            ? `Enregistré à ${savedAt}. Rechargez la page d’accueil pour voir le résultat.`
            : 'Les changements sont enregistrés automatiquement.'}
      </p>
    </div>
  )
}
