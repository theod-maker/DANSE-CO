'use client'

import type { ReactNode } from 'react'
import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextAreaField, TextField } from '../_shared/fields'
import { ImageField } from '../_shared/image-field'
import type { MediaOption } from '../medias/queries'
import { saveHomepage, type HomepageFormState } from './actions'
import type { HomepageInput } from './validation'

const INITIAL_STATE: HomepageFormState = { status: 'idle' }

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-4 rounded-md border border-neutral-200 p-4">
      <legend className="px-2 text-sm text-neutral-700">{title}</legend>
      {children}
    </fieldset>
  )
}

export function HomepageForm({
  initialValues,
  mediaOptions,
}: {
  initialValues: Record<keyof HomepageInput, string>
  mediaOptions: MediaOption[]
}) {
  const [state, formAction] = useActionState(saveHomepage, INITIAL_STATE)
  const values = state.values ?? initialValues
  const errors = state.errors

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

      <Section title="Accroche">
        <TextField name="heroTitle" label="Titre principal" defaultValue={values.heroTitle} error={errors?.heroTitle} />
        <TextAreaField name="heroDescription" label="Description" rows={3} defaultValue={values.heroDescription} error={errors?.heroDescription} />
        <TextField name="heroTagline" label="Petite phrase au-dessus du titre" optional defaultValue={values.heroTagline} error={errors?.heroTagline} />
        <ImageField
          name="heroImageUrl"
          label="Image de fond"
          defaultValue={values.heroImageUrl}
          mediaOptions={mediaOptions}
          error={errors?.heroImageUrl}
        />
      </Section>

      <Section title="Philosophie">
        <TextAreaField name="aboutTitle" label="Phrase de présentation" rows={2} defaultValue={values.aboutTitle} error={errors?.aboutTitle} />
        <TextField name="philosophyTitle" label="Titre de la section" defaultValue={values.philosophyTitle} error={errors?.philosophyTitle} />
        <TextField name="philosophyBlock1Label" label="Libellé du premier bloc" hint="Par exemple : NOTRE HISTOIRE" defaultValue={values.philosophyBlock1Label} error={errors?.philosophyBlock1Label} />
        <TextAreaField name="philosophyBlock1Text" label="Texte du premier bloc" rows={4} defaultValue={values.philosophyBlock1Text} error={errors?.philosophyBlock1Text} />
        <TextField name="philosophyBlock2Label" label="Libellé du second bloc" hint="Par exemple : NOTRE ENGAGEMENT" defaultValue={values.philosophyBlock2Label} error={errors?.philosophyBlock2Label} />
        <TextAreaField name="philosophyBlock2Text" label="Texte du second bloc" rows={4} defaultValue={values.philosophyBlock2Text} error={errors?.philosophyBlock2Text} />
        <ImageField
          name="philosophyImageUrl"
          label="Image"
          defaultValue={values.philosophyImageUrl}
          mediaOptions={mediaOptions}
          error={errors?.philosophyImageUrl}
        />
      </Section>

      <Section title="Mise en avant">
        <TextField name="featuredSectionLabel" label="Libellé de la section" optional defaultValue={values.featuredSectionLabel} error={errors?.featuredSectionLabel} />
        <TextAreaField name="featuredVideoDescription" label="Description" rows={4} defaultValue={values.featuredVideoDescription} error={errors?.featuredVideoDescription} />
        <ImageField
          name="featuredImageUrl"
          label="Image"
          defaultValue={values.featuredImageUrl}
          mediaOptions={mediaOptions}
          error={errors?.featuredImageUrl}
        />
      </Section>

      <Section title="Nos cours">
        <TextField name="servicesSectionTitle" label="Titre de la section" defaultValue={values.servicesSectionTitle} error={errors?.servicesSectionTitle} />
        <TextField name="servicesSectionSubtitle" label="Sous-titre" defaultValue={values.servicesSectionSubtitle} error={errors?.servicesSectionSubtitle} />
        <TextAreaField name="servicesCard1Description" label="Description de la première carte" rows={3} defaultValue={values.servicesCard1Description} error={errors?.servicesCard1Description} />
        <ImageField
          name="servicesCard1ImageUrl"
          label="Image de la première carte"
          defaultValue={values.servicesCard1ImageUrl}
          mediaOptions={mediaOptions}
          error={errors?.servicesCard1ImageUrl}
        />
        <TextAreaField name="servicesCard2Description" label="Description de la seconde carte" rows={3} defaultValue={values.servicesCard2Description} error={errors?.servicesCard2Description} />
        <ImageField
          name="servicesCard2ImageUrl"
          label="Image de la seconde carte"
          defaultValue={values.servicesCard2ImageUrl}
          mediaOptions={mediaOptions}
          error={errors?.servicesCard2ImageUrl}
        />
      </Section>

      <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
    </form>
  )
}
