'use client'

import { useActionState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { uploadMedia, type UploadFormState } from './actions'
import { ACCEPTED_MIME_TYPES, MAXIMUM_FILE_BYTES, formatBytes } from './validation'

const INITIAL_STATE: UploadFormState = { status: 'idle' }

function UploadButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="shrink-0 rounded-md bg-[#6C5CA8] px-4 py-2 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? 'Envoi…' : 'Envoyer'}
    </button>
  )
}

export function UploadForm() {
  const [state, formAction] = useActionState(uploadMedia, INITIAL_STATE)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData)
        formRef.current?.reset()
      }}
      className="mt-6 max-w-xl"
    >
      <div className="flex items-center gap-3">
        <input
          type="file"
          name="file"
          accept={ACCEPTED_MIME_TYPES.join(',')}
          aria-label="Image à envoyer"
          className="min-w-0 flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-700 file:mr-3 file:rounded file:border-0 file:bg-[#6C5CA8]/10 file:px-3 file:py-1 file:text-sm file:text-[#6C5CA8]"
        />
        <UploadButton />
      </div>

      <p className="mt-2 text-xs text-neutral-500">
        JPEG, PNG, WebP ou AVIF. {formatBytes(MAXIMUM_FILE_BYTES)} maximum.
      </p>

      {state.status === 'error' && (
        <p role="alert" className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      )}

      {state.status === 'success' && (
        <p role="status" className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          {state.message}
        </p>
      )}
    </form>
  )
}
