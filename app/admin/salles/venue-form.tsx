'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextAreaField, TextField } from '../_shared/fields'
import { StringListField } from '../_shared/string-list-field'
import { ImageField } from '../_shared/image-field'
import type { MediaOption } from '../medias/queries'
import { saveVenue, type VenueFormState } from './actions'

export interface VenueFormValues {
  id?: string
  name: string
  address: string
  description: string
  amenities: string[]
  mapEmbedUrl: string
  googleMapsUrl: string
  imageUrl: string
}

const INITIAL_STATE: VenueFormState = {}

export function VenueForm({
  initialValues,
  mediaOptions,
}: {
  initialValues: VenueFormValues
  mediaOptions: MediaOption[]
}) {
  const [state, formAction] = useActionState(saveVenue, INITIAL_STATE)
  const values = state.values ?? initialValues
  const isEditing = Boolean(initialValues.id)

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-5">
      {initialValues.id && <input type="hidden" name="id" value={initialValues.id} />}

      <FormAlert message={state.generalError} />

      <TextField name="name" label="Nom de la salle" defaultValue={values.name} error={state.errors?.name} />

      <TextField
        name="address"
        label="Adresse"
        defaultValue={values.address}
        error={state.errors?.address}
      />

      <TextAreaField
        name="description"
        label="Description"
        rows={4}
        defaultValue={values.description}
        error={state.errors?.description}
      />

      <StringListField
        name="amenities"
        label="Équipements"
        addLabel="Ajouter"
        hint="Un équipement par ligne. Tapez puis validez avec Entrée."
        defaultValue={values.amenities}
      />

      <TextField
        name="mapEmbedUrl"
        label="Carte à intégrer"
        optional
        hint="Adresse fournie par Google Maps dans « Partager », onglet « Intégrer une carte »."
        defaultValue={values.mapEmbedUrl}
        error={state.errors?.mapEmbedUrl}
      />

      <TextField
        name="googleMapsUrl"
        label="Lien Google Maps"
        optional
        defaultValue={values.googleMapsUrl}
        error={state.errors?.googleMapsUrl}
      />

      <ImageField
        name="imageUrl"
        label="Photo de la salle"
        defaultValue={values.imageUrl}
        mediaOptions={mediaOptions}
        error={state.errors?.imageUrl}
      />

      <div className="flex items-center gap-4">
        <SubmitButton
          label={isEditing ? 'Enregistrer les modifications' : 'Créer la salle'}
          pendingLabel="Enregistrement…"
        />
        <Link
          href="/admin/salles"
          className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
        >
          Annuler
        </Link>
      </div>
    </form>
  )
}
