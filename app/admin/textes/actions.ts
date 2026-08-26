'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import {
  PAGE_TEXT_FIELDS,
  validatePageTextsInput,
  type PageTextsFieldErrors,
  type PageTextsInput,
} from './validation'
import { recordHistory } from '../../../src/lib/content/history'

const PATH = '/admin/textes'

export interface PageTextsFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: PageTextsFieldErrors
  values?: PageTextsInput
}

export async function savePageTexts(
  _previousState: PageTextsFormState,
  formData: FormData
): Promise<PageTextsFormState> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { status: 'error', message: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const values = Object.fromEntries(
    PAGE_TEXT_FIELDS.map(({ key }) => [key, String(formData.get(key) ?? '')])
  ) as PageTextsInput

  const { data, errors } = validatePageTextsInput(values)
  if (errors || !data) {
    return { status: 'error', errors, values }
  }

  const existing = await prisma.pageTexts.findUnique({ where: { id: SINGLETON_ID } })
  if (existing) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, publishedSnapshot: _publishedSnapshot, publishedAt: _publishedAt, ...existingData } = existing
    await recordHistory({
      contentType: 'pageTexts',
      entityId: SINGLETON_ID,
      action: 'update',
      label: 'Textes des pages',
      snapshot: existingData,
      adminUsername: account.username,
    })
  }

  await prisma.pageTexts.upsert({
    where: { id: SINGLETON_ID },
    update: data,
    create: { id: SINGLETON_ID, ...data },
  })

  revalidatePath(PATH)

  return { status: 'success', message: 'Textes enregistrés.' }
}
