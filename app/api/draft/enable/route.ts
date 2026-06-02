import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const previewSecret = searchParams.get('sanity-preview-secret')
  const previewPathname = searchParams.get('sanity-preview-pathname') ?? '/'

  if (!previewSecret) {
    return NextResponse.json({ message: 'No preview secret' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(previewPathname)
}
