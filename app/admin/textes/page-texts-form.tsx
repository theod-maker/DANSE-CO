'use client'

import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextAreaField } from '../_shared/fields'
import { savePageTexts, type PageTextsFormState } from './actions'
import { PAGE_TEXT_FIELDS, type PageTextsInput } from './validation'

const INITIAL_STATE: PageTextsFormState = { status: 'idle' }

export function PageTextsForm({ initialValues }: { initialValues: PageTextsInput }) {
  const [state, formAction] = useActionState(savePageTexts, INITIAL_STATE)
  const values = state.values ?? initialValues

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-5">
      {state.status === 'error' && <FormAlert message={state.message} />}

      {state.status === 'success' && (
        <p
          role="status"
          className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
        >
          {state.message}
        </p>
      )}

      {PAGE_TEXT_FIELDS.map(({ key, label }) => (
        <TextAreaField
          key={key}
          name={key}
          label={label}
          rows={2}
          defaultValue={values[key]}
          error={state.errors?.[key]}
        />
      ))}

      <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
    </form>
  )
}
