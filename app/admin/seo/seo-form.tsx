'use client'

import { useActionState } from 'react'
import { FormAlert, SubmitButton } from '../_shared/fields'
import { saveSeo, type SeoFormState } from './actions'
import { SeoPageFields } from './seo-page-fields'
import { SEO_PAGES } from '../../../src/lib/content/seoPages'
import type { SeoPagesInput } from './validation'
import type { MediaOption } from '../medias/queries'

const INITIAL_STATE: SeoFormState = { status: 'idle' }

export function SeoForm({
  initialValues,
  mediaOptions,
}: {
  initialValues: SeoPagesInput
  mediaOptions: MediaOption[]
}) {
  const [state, formAction] = useActionState(saveSeo, INITIAL_STATE)
  const values = state.values ?? initialValues

  return (
    <form action={formAction} className="mt-8 max-w-2xl space-y-6">
      {state.status === 'error' && <FormAlert message={state.message} />}

      {state.status === 'success' && (
        <p
          role="status"
          className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
        >
          {state.message}
        </p>
      )}

      {SEO_PAGES.map((page) => (
        <SeoPageFields
          key={page.key}
          page={page}
          values={values[page.key] ?? { title: '', description: '', imageUrl: null }}
          errors={{
            title: state.errors?.[`${page.key}.title`],
            description: state.errors?.[`${page.key}.description`],
            imageUrl: state.errors?.[`${page.key}.imageUrl`],
          }}
          mediaOptions={mediaOptions}
        />
      ))}

      <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
    </form>
  )
}
