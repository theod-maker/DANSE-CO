'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextAreaField, TextField } from '../_shared/fields'
import { StringListField } from '../_shared/string-list-field'
import { IconPicker } from './icon-picker'
import { saveDiscipline, type DisciplineFormState } from './actions'
import type { DisciplineIconName } from './validation'

export interface DisciplineFormValues {
  id?: string
  title: string
  iconName: DisciplineIconName
  description: string
  benefits: string[]
  imageUrl: string
}

const INITIAL_STATE: DisciplineFormState = {}

export function DisciplineForm({ initialValues }: { initialValues: DisciplineFormValues }) {
  const [state, formAction] = useActionState(saveDiscipline, INITIAL_STATE)
  const values = state.values ?? initialValues
  const isEditing = Boolean(initialValues.id)

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-5">
      {initialValues.id && <input type="hidden" name="id" value={initialValues.id} />}

      <FormAlert message={state.generalError} />

      <TextField name="title" label="Nom de la danse" defaultValue={values.title} error={state.errors?.title} />

      <IconPicker
        name="iconName"
        defaultValue={values.iconName as DisciplineIconName}
        error={state.errors?.iconName}
      />

      <TextAreaField
        name="description"
        label="Description"
        rows={6}
        defaultValue={values.description}
        error={state.errors?.description}
      />

      <StringListField
        name="benefits"
        label="Bienfaits"
        addLabel="Ajouter"
        hint="Trois suffisent en général. Par exemple : Cardio, Énergie, Convivialité."
        defaultValue={values.benefits}
      />

      <TextField
        name="imageUrl"
        label="Photo"
        optional
        hint="Un chemin interne comme /images/disciplines/salsa.jpeg, ou une adresse https://"
        defaultValue={values.imageUrl}
        error={state.errors?.imageUrl}
      />

      <div className="flex items-center gap-4">
        <SubmitButton
          label={isEditing ? 'Enregistrer les modifications' : 'Créer la danse'}
          pendingLabel="Enregistrement…"
        />
        <Link
          href="/admin/disciplines"
          className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
        >
          Annuler
        </Link>
      </div>
    </form>
  )
}
