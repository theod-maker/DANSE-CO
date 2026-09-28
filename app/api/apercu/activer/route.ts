import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { PREVIEW_MARKER_COOKIE } from '../../../../src/lib/content/preview'
import { sanitizeInternalPath } from '../../../../src/lib/content/internalPath'

export async function GET(request: NextRequest) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const { searchParams } = new URL(request.url)
  const path = sanitizeInternalPath(searchParams.get('path'))

  const draft = await draftMode()
  draft.enable()

  const cookieStore = await cookies()
  cookieStore.set(PREVIEW_MARKER_COOKIE, '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  redirect(path)
}
