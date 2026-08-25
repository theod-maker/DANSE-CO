'use client'

import { useState } from 'react'
import { FIELD_CLASSNAME, FieldError } from './fields'
import { MediaPicker } from './media-picker'
import type { MediaOption } from '../medias/queries'

interface ImageFieldProps {
  name: string
  label: string
  defaultValue: string
  mediaOptions: MediaOption[]
  error?: string
  optional?: boolean
}

export function ImageField({
  name,
  label,
  defaultValue,
  mediaOptions,
  error,
  optional = true,
}: ImageFieldProps) {
  const [path, setPath] = useState(defaultValue)
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [isManualOpen, setIsManualOpen] = useState(false)

  return (
    <div>
      <span className="mb-1 block text-sm text-neutral-700">
        {label}
        {optional && <span className="text-neutral-400"> (facultatif)</span>}
      </span>

      <input type="hidden" name={name} value={path} />

      {path && (
        <img
          src={path}
          alt=""
          className="mb-2 h-28 w-full max-w-xs rounded-md border border-neutral-200 bg-neutral-100 object-cover"
        />
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setIsPickerOpen(true)}
          className="rounded-md border border-[#6C5CA8] px-3 py-2 text-sm text-[#6C5CA8] transition-colors hover:bg-[#6C5CA8]/10"
        >
          {path ? 'Changer l’image' : 'Choisir une image'}
        </button>

        {path && (
          <button
            type="button"
            onClick={() => setPath('')}
            className="text-sm text-neutral-500 underline underline-offset-4 hover:text-red-700"
          >
            Retirer
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsManualOpen((current) => !current)}
          className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
        >
          {isManualOpen ? 'Masquer l’adresse' : 'Saisir une adresse'}
        </button>
      </div>

      {isManualOpen && (
        <input
          type="text"
          value={path}
          onChange={(event) => setPath(event.target.value)}
          aria-label={`Adresse de ${label}`}
          placeholder="/images/photo.jpg ou https://…"
          className={`${FIELD_CLASSNAME} mt-2`}
        />
      )}

      {path && !isManualOpen && (
        <p className="mt-1 truncate text-xs text-neutral-400" title={path}>
          {path}
        </p>
      )}

      <FieldError message={error} />

      {isPickerOpen && (
        <MediaPicker
          options={mediaOptions}
          onSelect={setPath}
          onClose={() => setIsPickerOpen(false)}
        />
      )}
    </div>
  )
}
