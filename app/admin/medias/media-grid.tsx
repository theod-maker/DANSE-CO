'use client'

import { useState } from 'react'
import { DeleteForm } from '../_shared/delete-form'
import { deleteMedia } from './actions'
import { formatBytes } from './validation'

export interface MediaEntry {
  id: string
  originalName: string
  publicPath: string
  sizeBytes: number
}

function CopyPathButton({ path }: { path: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(path)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="text-xs text-[#6C5CA8] underline underline-offset-4 hover:opacity-80"
    >
      {copied ? 'Copié' : 'Copier le chemin'}
    </button>
  )
}

export function MediaGrid({ entries }: { entries: MediaEntry[] }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {entries.map((entry) => (
        <li key={entry.id} className="overflow-hidden rounded-md border border-neutral-200 bg-white">
          <img
            src={entry.publicPath}
            alt={entry.originalName}
            className="h-32 w-full bg-neutral-100 object-cover"
          />
          <div className="p-3">
            <p className="truncate text-sm text-neutral-800" title={entry.originalName}>
              {entry.originalName}
            </p>
            <p className="mt-1 text-xs text-neutral-500">{formatBytes(entry.sizeBytes)}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <CopyPathButton path={entry.publicPath} />
              <DeleteForm id={entry.id} label={entry.originalName} action={deleteMedia} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
