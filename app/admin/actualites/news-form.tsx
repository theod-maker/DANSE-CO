'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { saveNews, type NewsFormState } from './actions'
import { ImageField } from '../_shared/image-field'
import type { MediaOption } from '../medias/queries'

export interface NewsFormValues {
  id?: string
  title: string
  date: string
  excerpt: string
  imageUrl: string
  link: string
}

const INITIAL_STATE: NewsFormState = {}

const FIELD_CLASSNAME =
  'w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#6C5CA8] focus:outline-none focus:ring-1 focus:ring-[#6C5CA8]'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-sm text-red-700">{message}</p>
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[#6C5CA8] px-4 py-2 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? 'Enregistrement…' : isEditing ? 'Enregistrer les modifications' : 'Publier'}
    </button>
  )
}

export function NewsForm({
  initialValues,
  mediaOptions,
}: {
  initialValues: NewsFormValues
  mediaOptions: MediaOption[]
}) {
  const [state, formAction] = useActionState(saveNews, INITIAL_STATE)
  const values = state.values ?? initialValues
  const isEditing = Boolean(initialValues.id)

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-5">
      {initialValues.id && <input type="hidden" name="id" value={initialValues.id} />}

      {state.generalError && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.generalError}
        </p>
      )}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm text-neutral-700">
          Titre
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={values.title}
          className={FIELD_CLASSNAME}
        />
        <FieldError message={state.errors?.title} />
      </div>

      <div>
        <label htmlFor="date" className="mb-1 block text-sm text-neutral-700">
          Date de l&apos;événement
        </label>
        <input id="date" name="date" type="date" defaultValue={values.date} className={FIELD_CLASSNAME} />
        <p className="mt-1 text-xs text-neutral-500">
          La date de ce que vous annoncez — le forum, la compétition, la reprise des cours.
          Pas la date d&apos;aujourd&apos;hui.
        </p>
        <FieldError message={state.errors?.date} />
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-1 block text-sm text-neutral-700">
          Résumé
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={4}
          defaultValue={values.excerpt}
          className={FIELD_CLASSNAME}
        />
        <FieldError message={state.errors?.excerpt} />
      </div>

      <ImageField
        name="imageUrl"
        label="Image"
        defaultValue={values.imageUrl}
        mediaOptions={mediaOptions}
        error={state.errors?.imageUrl}
      />

      <div>
        <label htmlFor="link" className="mb-1 block text-sm text-neutral-700">
          Lien <span className="text-neutral-400">(facultatif)</span>
        </label>
        <input
          id="link"
          name="link"
          type="text"
          defaultValue={values.link}
          className={FIELD_CLASSNAME}
        />
        <FieldError message={state.errors?.link} />
      </div>

      <div className="flex items-center gap-4">
        <SubmitButton isEditing={isEditing} />
        <Link
          href="/admin/actualites"
          className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
        >
          Annuler
        </Link>
      </div>
    </form>
  )
}
