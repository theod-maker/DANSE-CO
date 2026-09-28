'use server'

import { revalidateTag } from 'next/cache'
import { CONTENT_TAGS, type ContentTag } from '../../../src/lib/content/revalidate'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'

export async function revalidateContent(tag: ContentTag): Promise<void> {
  if (!(await getCurrentAdmin())) return
  revalidateTag(CONTENT_TAGS[tag])
}
