'use server'

import { revalidateTag } from 'next/cache'
import { CONTENT_TAGS, type ContentTag } from '../../../src/lib/content/revalidate'

export async function revalidateContent(tag: ContentTag): Promise<void> {
  revalidateTag(CONTENT_TAGS[tag])
}
