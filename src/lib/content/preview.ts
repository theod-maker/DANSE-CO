import { cookies, draftMode } from 'next/headers'
import { getCurrentAdmin } from '../adminAuth.ts'

export const PREVIEW_MARKER_COOKIE = 'danseco_apercu'

export async function isPreviewEnabled(): Promise<boolean> {
  const draft = await draftMode()
  if (!draft.isEnabled) return false

  const cookieStore = await cookies()
  if (cookieStore.get(PREVIEW_MARKER_COOKIE)?.value !== '1') return false

  return (await getCurrentAdmin()) !== null
}

export function sanitizeInternalPath(rawPath: string | null): string {
  if (!rawPath) return '/'
  if (!rawPath.startsWith('/')) return '/'
  if (rawPath.startsWith('//')) return '/'
  if (rawPath.includes('://')) return '/'
  return rawPath
}
