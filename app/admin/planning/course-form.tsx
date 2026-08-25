'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextField } from '../_shared/fields'
import { saveCourse, type CourseFormState } from './actions'
import { KNOWN_DAYS, KNOWN_LEVELS } from './validation'

export interface CourseFormValues {
  id?: string
  name: string
  day: string
  startTime: string
  endTime: string
  level: string
  venue: string
}

const INITIAL_STATE: CourseFormState = {}

export function CourseForm({
  initialValues,
  venueSuggestions,
}: {
  initialValues: CourseFormValues
  venueSuggestions: string[]
}) {
  const [state, formAction] = useActionState(saveCourse, INITIAL_STATE)
  const values = state.values ?? initialValues
  const isEditing = Boolean(initialValues.id)

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-5">
      {initialValues.id && <input type="hidden" name="id" value={initialValues.id} />}

      <FormAlert message={state.generalError} />

      <TextField name="name" label="Nom du cours" defaultValue={values.name} error={state.errors?.name} />

      <TextField
        name="day"
        label="Jour"
        suggestions={[...KNOWN_DAYS]}
        hint="Les jours proposés sont ceux que le site sait classer. Vous pouvez en saisir un autre."
        defaultValue={values.day}
        error={state.errors?.day}
      />

      <div>
        <span className="mb-1 block text-sm text-neutral-700">Horaire</span>
        <div className="flex items-center gap-3">
          <input
            id="startTime"
            name="startTime"
            type="time"
            defaultValue={values.startTime}
            aria-label="Heure de début"
            className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#6C5CA8] focus:outline-none focus:ring-1 focus:ring-[#6C5CA8]"
          />
          <span className="text-neutral-500">à</span>
          <input
            id="endTime"
            name="endTime"
            type="time"
            defaultValue={values.endTime}
            aria-label="Heure de fin"
            className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#6C5CA8] focus:outline-none focus:ring-1 focus:ring-[#6C5CA8]"
          />
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          Les cours se classent tout seuls par heure, vous n&apos;avez rien à ranger.
        </p>
        {state.errors?.time && <p className="mt-1 text-sm text-red-700">{state.errors.time}</p>}
      </div>

      <TextField
        name="level"
        label="Niveau"
        suggestions={[...KNOWN_LEVELS]}
        defaultValue={values.level}
        error={state.errors?.level}
      />

      <TextField
        name="venue"
        label="Salle"
        optional
        suggestions={venueSuggestions}
        hint="Les salles que vous avez enregistrées sont proposées."
        defaultValue={values.venue}
        error={state.errors?.venue}
      />

      <div className="flex items-center gap-4">
        <SubmitButton
          label={isEditing ? 'Enregistrer les modifications' : 'Ajouter le cours'}
          pendingLabel="Enregistrement…"
        />
        <Link
          href="/admin/planning"
          className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
        >
          Annuler
        </Link>
      </div>
    </form>
  )
}
