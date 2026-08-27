'use client'

import { publishBlockAction, discardBlockAction } from './actions'

export type BlockPublishState = 'upToDate' | 'pending' | 'neverPublished'

interface BlockPublishStatusProps {
  blockId: string
  state: BlockPublishState
}

export function BlockPublishStatus({ blockId, state }: BlockPublishStatusProps) {
  if (state === 'upToDate') return null

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-500">
        {state === 'neverPublished' ? 'Pas encore en ligne' : 'Modifications non publiées'}
      </span>

      <form action={publishBlockAction}>
        <input type="hidden" name="blockId" value={blockId} />
        <button
          type="submit"
          className="rounded-md bg-[#6C5CA8]/10 px-3 py-1 text-sm text-[#6C5CA8] transition-colors hover:bg-[#6C5CA8]/20"
        >
          Publier
        </button>
      </form>

      {state === 'pending' && (
        <form action={discardBlockAction}>
          <input type="hidden" name="blockId" value={blockId} />
          <button
            type="submit"
            className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
          >
            Revenir au dernier publié
          </button>
        </form>
      )}
    </div>
  )
}
