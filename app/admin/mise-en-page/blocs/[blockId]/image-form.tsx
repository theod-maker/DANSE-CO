'use client'

import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextField } from '../../../_shared/fields'
import { ImageField } from '../../../_shared/image-field'
import type { MediaOption } from '../../../medias/queries'
import { BlockPublishStatus, type BlockPublishState } from './block-publish-status'
import type { ImageBlockContent } from '../../../../../src/lib/content/pageBlocks'
import { saveBlockContent, type SaveBlockFormState } from './actions'

const INITIAL_STATE: SaveBlockFormState = { status: 'idle' }

export function ImageForm({
  blockId,
  content,
  publishState,
  mediaOptions,
}: {
  blockId: string
  content: ImageBlockContent | null
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

        <ImageField
          name="imageUrl"
          label="Image"
          defaultValue={content?.imageUrl ?? ''}
          mediaOptions={mediaOptions}
          optional={false}
        />

        <TextField name="caption" label="Légende" optional defaultValue={content?.caption ?? ''} />

        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" name="fullWidth" defaultChecked={content?.fullWidth ?? true} />
          Pleine largeur
        </label>

        <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
      </form>
    </div>
  )
}
