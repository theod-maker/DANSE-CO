'use client'

import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextAreaField, TextField } from '../_shared/fields'
import { StringListField } from '../_shared/string-list-field'
import { saveRegistrationInfo, type RegistrationFormState, type RegistrationFormValues } from './actions'

const INITIAL_STATE: RegistrationFormState = { status: 'idle' }

export function RegistrationForm({ initialValues }: { initialValues: RegistrationFormValues }) {
  const [state, formAction] = useActionState(saveRegistrationInfo, INITIAL_STATE)
  const values = state.values ?? initialValues

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-6">
      {state.status === 'error' && <FormAlert message={state.message} />}

      {state.status === 'success' && (
        <p
          role="status"
          className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
        >
          {state.message}
        </p>
      )}

      <fieldset className="space-y-4 rounded-md border border-neutral-200 p-4">
        <legend className="px-2 text-sm text-neutral-700">Première permanence</legend>
        <TextField name="permanence1Days" label="Jours" hint="Par exemple : Lundis & Mercredis" defaultValue={values.permanence1Days} error={state.errors?.permanence1Days} />
        <TextField name="permanence1Hours" label="Horaires" hint="Par exemple : 19h30 – 21h30" defaultValue={values.permanence1Hours} error={state.errors?.permanence1Hours} />
        <TextField name="permanence1Venue" label="Lieu" defaultValue={values.permanence1Venue} error={state.errors?.permanence1Venue} />
      </fieldset>

      <fieldset className="space-y-4 rounded-md border border-neutral-200 p-4">
        <legend className="px-2 text-sm text-neutral-700">Seconde permanence</legend>
        <TextField name="permanence2Days" label="Jours" defaultValue={values.permanence2Days} error={state.errors?.permanence2Days} />
        <TextField name="permanence2Hours" label="Horaires" defaultValue={values.permanence2Hours} error={state.errors?.permanence2Hours} />
        <TextField name="permanence2Venue" label="Lieu" defaultValue={values.permanence2Venue} error={state.errors?.permanence2Venue} />
      </fieldset>

      <StringListField
        name="requiredDocuments"
        label="Documents à fournir"
        addLabel="Ajouter"
        hint="Un document par ligne. Tapez puis validez avec Entrée."
        defaultValue={values.requiredDocuments}
      />

      <TextAreaField
        name="photoNote"
        label="Note sur la photo d'identité"
        rows={3}
        defaultValue={values.photoNote}
        error={state.errors?.photoNote}
      />

      <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
    </form>
  )
}
