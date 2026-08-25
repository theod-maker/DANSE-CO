'use client'

import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextAreaField, TextField } from '../_shared/fields'
import { saveSiteInfo, type SiteInfoFormState } from './actions'
import type { SiteInfoInput } from './validation'

const INITIAL_STATE: SiteInfoFormState = { status: 'idle' }

function SectionTitle({ children }: { children: string }) {
  return <h2 className="pt-2 text-sm uppercase tracking-wider text-neutral-400">{children}</h2>
}

export function SiteInfoForm({ initialValues }: { initialValues: Record<keyof SiteInfoInput, string> }) {
  const [state, formAction] = useActionState(saveSiteInfo, INITIAL_STATE)
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

      <SectionTitle>Coordonnées</SectionTitle>

      <TextField name="phone" label="Téléphone" defaultValue={values.phone} error={state.errors?.phone} />
      <TextField name="email" label="Courriel" defaultValue={values.email} error={state.errors?.email} />
      <TextAreaField
        name="mailingAddress"
        label="Adresse postale"
        rows={2}
        defaultValue={values.mailingAddress}
        error={state.errors?.mailingAddress}
      />

      <SectionTitle>Réseaux sociaux</SectionTitle>

      <TextField name="instagramUrl" label="Instagram" optional defaultValue={values.instagramUrl} error={state.errors?.instagramUrl} />
      <TextField name="facebookUrl" label="Facebook" optional defaultValue={values.facebookUrl} error={state.errors?.facebookUrl} />
      <TextField name="twitterUrl" label="Twitter" optional defaultValue={values.twitterUrl} error={state.errors?.twitterUrl} />
      <TextField name="websiteUrl" label="Autre site" optional defaultValue={values.websiteUrl} error={state.errors?.websiteUrl} />

      <SectionTitle>Saison</SectionTitle>

      <TextField name="season" label="Saison en cours" hint="Par exemple : 2026–2027" defaultValue={values.season} error={state.errors?.season} />
      <TextField
        name="footerTagline"
        label="Phrase de pied de page"
        defaultValue={values.footerTagline}
        error={state.errors?.footerTagline}
      />

      <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
    </form>
  )
}
