import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { PREVIEW_MARKER_COOKIE } from '../../../../src/lib/content/preview'
import { sanitizeInternalPath } from '../../../../src/lib/content/internalPath'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = sanitizeInternalPath(searchParams.get('path'))

  const draft = await draftMode()
  draft.disable()

  const cookieStore = await cookies()
  cookieStore.delete(PREVIEW_MARKER_COOKIE)

  redirect(path)
}
