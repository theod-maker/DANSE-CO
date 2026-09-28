'use client'

import { useState } from 'react'
import { FIELD_CLASSNAME } from '../_shared/fields'

export interface PricingRowValue {
  label: string
  price: string
  detail: string
  highlight: boolean
}

function move(rows: PricingRowValue[], from: number, to: number): PricingRowValue[] {
  if (to < 0 || to >= rows.length) return rows
  const next = [...rows]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

export function PricingRowsField({ defaultValue }: { defaultValue: PricingRowValue[] }) {
  const [rows, setRows] = useState<PricingRowValue[]>(defaultValue)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(
    defaultValue.findIndex((row) => row.highlight)
  )

  function updateRow(index: number, patch: Partial<PricingRowValue>) {
    setRows((current) => current.map((row, position) => (position === index ? { ...row, ...patch } : row)))
  }

  function reorder(from: number, to: number) {
    if (to < 0 || to >= rows.length) return
    setRows((current) => move(current, from, to))
    if (highlightedIndex === from) setHighlightedIndex(to)
    else if (highlightedIndex === to) setHighlightedIndex(from)
  }

  function removeRow(index: number) {
    setRows((current) => current.filter((_, position) => position !== index))
    if (highlightedIndex === index) setHighlightedIndex(-1)
    else if (highlightedIndex > index) setHighlightedIndex(highlightedIndex - 1)
  }

  return (
    <div>
      <span className="mb-1 block text-sm text-neutral-700">Lignes de tarif</span>
      <p className="mb-3 text-xs text-neutral-500">
        Le prix est du texte libre : « 220 € », « à partir de 190 € ». Une seule ligne peut être
        mise en avant.
      </p>

      <input type="hidden" name="highlightedRow" value={highlightedIndex} />

      <ul className="space-y-3">
        {rows.map((row, index) => (
          <li key={index} className="rounded-md border border-neutral-200 p-3">
            <div className="flex gap-2">
              <input
                name="rowLabel"
                value={row.label}
                onChange={(event) => updateRow(index, { label: event.target.value })}
                placeholder="1h de cours — Solo"
                aria-label={`Libellé de la ligne ${index + 1}`}
                className={FIELD_CLASSNAME}
              />
              <input
                name="rowPrice"
                value={row.price}
                onChange={(event) => updateRow(index, { price: event.target.value })}
                placeholder="220 €"
                aria-label={`Prix de la ligne ${index + 1}`}
                className="w-32 shrink-0 rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#6C5CA8] focus:outline-none focus:ring-1 focus:ring-[#6C5CA8]"
              />
            </div>

            <input
              name="rowDetail"
              value={row.detail}
              onChange={(event) => updateRow(index, { detail: event.target.value })}
              placeholder="Précision (facultatif)"
              aria-label={`Détail de la ligne ${index + 1}`}
              className={`${FIELD_CLASSNAME} mt-2`}
            />

            <div className="mt-2 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <input
                  type="radio"
                  name="highlightChoice"
                  checked={highlightedIndex === index}
                  onChange={() => setHighlightedIndex(index)}
                  className="accent-[#6C5CA8]"
                />
                Mettre en avant
              </label>

              <span className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => reorder(index, index - 1)}
                  disabled={index === 0}
                  aria-label={`Monter la ligne ${index + 1}`}
                  className="text-xs text-neutral-500 hover:text-[#6C5CA8] disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => reorder(index, index + 1)}
                  disabled={index === rows.length - 1}
                  aria-label={`Descendre la ligne ${index + 1}`}
                  className="text-xs text-neutral-500 hover:text-[#6C5CA8] disabled:opacity-30"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="text-sm text-neutral-500 underline underline-offset-4 hover:text-red-700"
                >
                  Retirer
                </button>
              </span>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setRows((current) => [...current, { label: '', price: '', detail: '', highlight: false }])}
        className="mt-3 rounded-md border border-[#6C5CA8] px-3 py-2 text-sm text-[#6C5CA8] transition-colors hover:bg-[#6C5CA8]/10"
      >
        Ajouter une ligne
      </button>
    </div>
  )
}
