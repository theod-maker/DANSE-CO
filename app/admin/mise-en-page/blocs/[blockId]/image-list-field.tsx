'use client'

import { useState } from 'react'
import { MediaPicker } from '../../../_shared/media-picker'
import type { MediaOption } from '../../../medias/queries'

interface ImageListFieldProps {
  name: string
  label: string
  defaultValue: string[]
  mediaOptions: MediaOption[]
}

export function ImageListField({ name, label, defaultValue, mediaOptions }: ImageListFieldProps) {
  const [paths, setPaths] = useState(defaultValue)
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  return (
    <div>
      <span className="mb-1 block text-sm text-neutral-700">{label}</span>

      {paths.map((path) => (
        <input key={path} type="hidden" name={name} value={path} />
      ))}

      {paths.length > 0 && (
        <ul className="mb-2 grid grid-cols-3 gap-2">
          {paths.map((path, index) => (
            <li key={path} className="relative">
              <img
                src={path}
                alt=""
                className="h-20 w-full rounded-md border border-neutral-200 bg-neutral-100 object-cover"
              />
              <button
                type="button"
                onClick={() => setPaths((current) => current.filter((_, i) => i !== index))}
                className="absolute right-1 top-1 rounded-full bg-white/90 px-2 py-0.5 text-xs text-red-700 shadow"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setIsPickerOpen(true)}
        className="rounded-md border border-[#6C5CA8] px-3 py-2 text-sm text-[#6C5CA8] transition-colors hover:bg-[#6C5CA8]/10"
      >
        Ajouter une image
      </button>

      {isPickerOpen && (
        <MediaPicker
          options={mediaOptions}
          onSelect={(path) => setPaths((current) => [...current, path])}
          onClose={() => setIsPickerOpen(false)}
        />
      )}
    </div>
  )
}
