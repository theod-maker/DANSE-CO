'use client'

import { useEffect, useRef } from 'react'
import type { MediaOption } from '../medias/queries'

interface MediaPickerProps {
  options: MediaOption[]
  onSelect: (path: string) => void
  onClose: () => void
}

export function MediaPicker({ options, onSelect, onClose }: MediaPickerProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Choisir une image"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-md bg-white p-6 shadow-lg outline-none"
      >
        <div className="flex items-baseline justify-between">
          <h2
            className="text-xl text-[#6C5CA8] tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Choisir une image
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
          >
            Fermer
          </button>
        </div>

        {options.length === 0 ? (
          <p className="mt-6 rounded-md border border-dashed border-neutral-300 px-6 py-10 text-center text-sm text-neutral-500">
            Aucune image dans la bibliothèque.
            <br />
            Rendez-vous dans « Médias » pour en envoyer une.
          </p>
        ) : (
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(option.path)
                    onClose()
                  }}
                  className="w-full overflow-hidden rounded-md border border-neutral-200 text-left transition-colors hover:border-[#6C5CA8]"
                >
                  <img
                    src={option.path}
                    alt={option.label}
                    className="h-24 w-full bg-neutral-100 object-cover"
                  />
                  <span className="block truncate px-2 py-1 text-xs text-neutral-700" title={option.label}>
                    {option.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
