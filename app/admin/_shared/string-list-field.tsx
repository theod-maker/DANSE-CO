'use client'

import { useState, type KeyboardEvent } from 'react'
import { FIELD_CLASSNAME, FieldError } from './fields'

interface StringListFieldProps {
  name: string
  label: string
  hint?: string
  addLabel?: string
  error?: string
  defaultValue: string[]
}

export function StringListField({
  name,
  label,
  hint,
  addLabel = 'Ajouter',
  error,
  defaultValue,
}: StringListFieldProps) {
  const [entries, setEntries] = useState<string[]>(defaultValue)
  const [draft, setDraft] = useState('')

  function addEntry() {
    const trimmed = draft.trim()
    if (!trimmed) return
    setEntries((current) => [...current, trimmed])
    setDraft('')
  }

  function removeEntry(index: number) {
    setEntries((current) => current.filter((_, position) => position !== index))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return
    event.preventDefault()
    addEntry()
  }

  return (
    <div>
      <span className="mb-1 block text-sm text-neutral-700">{label}</span>

      {entries.map((entry, index) => (
        <input key={`${entry}-${index}`} type="hidden" name={name} value={entry} />
      ))}

      {entries.length > 0 && (
        <ul className="mb-2 space-y-1">
          {entries.map((entry, index) => (
            <li
              key={`${entry}-${index}`}
              className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm text-neutral-800 ring-1 ring-neutral-200"
            >
              <span className="min-w-0 break-words">{entry}</span>
              <button
                type="button"
                onClick={() => removeEntry(index)}
                aria-label={`Retirer ${entry}`}
                className="ml-3 shrink-0 text-neutral-400 transition-colors hover:text-red-700"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={addLabel}
          className={FIELD_CLASSNAME}
        />
        <button
          type="button"
          onClick={addEntry}
          className="shrink-0 rounded-md border border-[#6C5CA8] px-3 py-2 text-sm text-[#6C5CA8] transition-colors hover:bg-[#6C5CA8]/10"
        >
          {addLabel}
        </button>
      </div>

      {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
      <FieldError message={error} />
    </div>
  )
}
