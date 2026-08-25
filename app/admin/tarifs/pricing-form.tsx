'use client'

import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextField } from '../_shared/fields'
import { StringListField } from '../_shared/string-list-field'
import { PricingRowsField } from './pricing-rows-field'
import { savePricing, type PricingFormState, type PricingFormValues } from './actions'

const INITIAL_STATE: PricingFormState = { status: 'idle' }

export function PricingForm({ initialValues }: { initialValues: PricingFormValues }) {
  const [state, formAction] = useActionState(savePricing, INITIAL_STATE)
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

      <TextField
        name="season"
        label="Saison"
        hint="Par exemple : 2026 - 2027"
        defaultValue={values.season}
        error={state.errors?.season}
      />

      <TextField
        name="membershipFee"
        label="Montant de l'adhésion"
        optional
        defaultValue={values.membershipFee}
        error={state.errors?.membershipFee}
      />

      <div>
        <PricingRowsField defaultValue={values.rows} />
        {state.errors?.rows && <p className="mt-2 text-sm text-red-700">{state.errors.rows}</p>}
      </div>

      <StringListField
        name="infoItems"
        label="Informations complémentaires"
        addLabel="Ajouter"
        hint="Affichées sous la grille tarifaire. Tapez puis validez avec Entrée."
        defaultValue={values.infoItems}
      />

      <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
    </form>
  )
}
