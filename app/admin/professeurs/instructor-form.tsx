'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextAreaField, TextField } from '../_shared/fields'
import { saveInstructor, type InstructorFormState } from './actions'

export interface InstructorFormValues {
  id?: string
  name: string
  specialty: string
  bio: string
  experience: string
  photoUrl: string
}

const INITIAL_STATE: InstructorFormState = {}

export function InstructorForm({ initialValues }: { initialValues: InstructorFormValues }) {
  const [state, formAction] = useActionState(saveInstructor, INITIAL_STATE)
  const values = state.values ?? initialValues
  const isEditing = Boolean(initialValues.id)

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-5">
      {initialValues.id && <input type="hidden" name="id" value={initialValues.id} />}

      <FormAlert message={state.generalError} />

      <TextField name="name" label="Nom" defaultValue={values.name} error={state.errors?.name} />

      <TextField
        name="specialty"
        label="Spécialité"
        hint="Ce qui s'affiche sous le nom. Par exemple : Professeur."
        defaultValue={values.specialty}
        error={state.errors?.specialty}
      />

      <TextAreaField
        name="bio"
        label="Biographie"
        rows={10}
        defaultValue={values.bio}
        error={state.errors?.bio}
      />

      <TextField
        name="experience"
        label="Expérience"
        optional
        defaultValue={values.experience}
        error={state.errors?.experience}
      />

      <TextField
        name="photoUrl"
        label="Photo"
        optional
        hint="Un chemin interne comme /images/photo.jpg, ou une adresse commençant par https://"
        defaultValue={values.photoUrl}
        error={state.errors?.photoUrl}
      />

      <div className="flex items-center gap-4">
        <SubmitButton
          label={isEditing ? 'Enregistrer les modifications' : 'Créer le professeur'}
          pendingLabel="Enregistrement…"
        />
        <Link
          href="/admin/professeurs"
          className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
        >
          Annuler
        </Link>
      </div>
    </form>
  )
}
