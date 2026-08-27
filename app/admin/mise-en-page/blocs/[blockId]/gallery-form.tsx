'use client'

import { useActionState } from 'react'
import { FormAlert, SubmitButton, TextField } from '../../../_shared/fields'
import type { MediaOption } from '../../../medias/queries'
import { ImageListField } from './image-list-field'
import { BlockPublishStatus, type BlockPublishState } from './block-publish-status'
import type { GalleryBlockContent } from '../../../../../src/lib/content/pageBlocks'
import { saveBlockContent, type SaveBlockFormState } from './actions'

const INITIAL_STATE: SaveBlockFormState = { status: 'idle' }

export function GalleryForm({
  blockId,
  content,
  publishState,
  mediaOptions,
}: {
  blockId: string
  content: GalleryBlockContent | null
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

        <TextField name="title" label="Titre" optional defaultValue={content?.title ?? ''} />

        <ImageListField
          name="imageUrls"
          label="Images"
          defaultValue={content?.imageUrls ?? []}
          mediaOptions={mediaOptions}
        />

        <div>
          <label htmlFor="columns" className="mb-1 block text-sm text-neutral-700">
            Nombre de colonnes
          </label>
          <select
            id="columns"
            name="columns"
            defaultValue={String(content?.columns ?? 3)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-700"
          >
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <SubmitButton label="Enregistrer" pendingLabel="Enregistrement…" />
      </form>
    </div>
  )
}
