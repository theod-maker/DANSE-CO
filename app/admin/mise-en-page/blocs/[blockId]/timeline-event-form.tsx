'use client'

import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextField, TextAreaField } from '../../../_shared/fields'
import type { MediaOption } from '../../../medias/queries'
import { ImageListField } from './image-list-field'
import { BlockPublishStatus, type BlockPublishState } from './block-publish-status'
import type { TimelineEventBlockContent } from '../../../../../src/lib/content/pageBlocks'
import { saveBlockContent, type SaveBlockFormState } from './actions'

const INITIAL_STATE: SaveBlockFormState = { status: 'idle' }

export function TimelineEventForm({
  blockId,
  content,
  publishState,
  mediaOptions,
}: {
  blockId: string
  content: TimelineEventBlockContent | null
  publishState: BlockPublishState
  mediaOptions: MediaOption[]
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

        <TextField name="year" label="Année" defaultValue={content?.year ?? ''} />
        <TextField name="label" label="Titre de l'étape" defaultValue={content?.label ?? ''} />
        <TextAreaField name="text" label="Texte" rows={5} defaultValue={content?.text ?? ''} />

        <ImageListField
          name="imageUrls"
          label="Photos"
          defaultValue={content?.imageUrls ?? []}
          mediaOptions={mediaOptions}
        />

        <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
      </form>
    </div>
  )
}
