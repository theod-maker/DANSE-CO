import type { HistoryContentType } from '../../../src/lib/content/history'
import { publishEntry, discardEntry } from './publish-actions'

export type PublishState = 'upToDate' | 'pending' | 'neverPublished'

interface PublishStatusProps {
  contentType: HistoryContentType
  entityId: string
  state: PublishState
}

export function PublishStatus({ contentType, entityId, state }: PublishStatusProps) {
  if (state === 'upToDate') return null

  return (
    <div className="flex shrink-0 items-center gap-3">
      <span className="text-sm text-neutral-500">
        {state === 'neverPublished' ? 'Pas encore en ligne' : 'Modifications non publiées'}
      </span>

      <form action={publishEntry}>
        <input type="hidden" name="contentType" value={contentType} />
        <input type="hidden" name="entityId" value={entityId} />
        <button
          type="submit"
          className="rounded-md bg-[#6C5CA8]/10 px-3 py-1 text-sm text-[#6C5CA8] transition-colors hover:bg-[#6C5CA8]/20"
        >
          Publier
        </button>
      </form>

      {state === 'pending' && (
        <form action={discardEntry}>
          <input type="hidden" name="contentType" value={contentType} />
          <input type="hidden" name="entityId" value={entityId} />
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
