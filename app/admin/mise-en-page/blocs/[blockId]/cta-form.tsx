'use client'

import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextField, TextAreaField } from '../../../_shared/fields'
import { BlockPublishStatus, type BlockPublishState } from './block-publish-status'
import type { CtaBlockContent } from '../../../../../src/lib/content/pageBlocks'
import { saveBlockContent, type SaveBlockFormState } from './actions'

const INITIAL_STATE: SaveBlockFormState = { status: 'idle' }

export function CtaForm({
  blockId,
  content,
  publishState,
}: {
  blockId: string
  content: CtaBlockContent | null
  publishState: BlockPublishState
}) {
  const action = saveBlockContent.bind(null, blockId)
  const [state, formAction] = useActionState(action, INITIAL_STATE)

  return (
    <div className="mt-8 max-w-xl">
      <BlockPublishStatus blockId={blockId} state={publishState} />

      <form action={formAction} className="mt-6 space-y-6">
        {state.status === 'error' && <FormAlert message={state.message} />}
        {state.status === 'success' && (
          <p role="status" className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            {state.message}
          </p>
        )}

        <TextField name="title" label="Titre" optional defaultValue={content?.title ?? ''} />
        <TextAreaField name="description" label="Description" optional rows={3} defaultValue={content?.description ?? ''} />
        <TextField name="buttonLabel" label="Libellé du bouton" defaultValue={content?.buttonLabel ?? ''} />
        <TextField
          name="buttonLink"
          label="Lien du bouton"
          hint="Un chemin interne comme /contact, ou une adresse https://"
          defaultValue={content?.buttonLink ?? ''}
        />

        <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
      </form>
    </div>
  )
}
