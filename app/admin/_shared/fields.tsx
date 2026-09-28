'use client'

import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

export const FIELD_CLASSNAME =
  'w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#6C5CA8] focus:outline-none focus:ring-1 focus:ring-[#6C5CA8]'

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-sm text-red-700">{message}</p>
}

function OptionalMark() {
  return <span className="text-neutral-400"> (facultatif)</span>
}

interface BaseFieldProps {
  name: string
  label: string
  optional?: boolean
  hint?: ReactNode
  error?: string
  defaultValue?: string
}

export function TextField({
  name,
  label,
  optional,
  hint,
  error,
  defaultValue,
  type = 'text',
  suggestions,
}: BaseFieldProps & { type?: string; suggestions?: string[] }) {
  const listId = suggestions && suggestions.length > 0 ? `${name}-suggestions` : undefined

  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm text-neutral-700">
        {label}
        {optional && <OptionalMark />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        list={listId}
        defaultValue={defaultValue}
        className={FIELD_CLASSNAME}
      />
      {listId && (
        <datalist id={listId}>
          {suggestions?.map((value) => (
            <option key={value} value={value} />
          ))}
        </datalist>
      )}
      {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
      <FieldError message={error} />
    </div>
  )
}

export function TextAreaField({
  name,
  label,
  optional,
  hint,
  error,
  defaultValue,
  rows = 4,
}: BaseFieldProps & { rows?: number }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm text-neutral-700">
        {label}
        {optional && <OptionalMark />}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={FIELD_CLASSNAME}
      />
      {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
      <FieldError message={error} />
    </div>
  )
}

export function FormAlert({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {message}
    </p>
  )
}

export function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[#6C5CA8] px-4 py-2 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? pendingLabel : label}
    </button>
  )
}
