'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../../../src/lib/db'
import type { Prisma } from '../../../src/generated/prisma/client'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { recordHistory } from '../../../src/lib/content/history'
import { SEO_PAGES, type PageSeoFields } from '../../../src/lib/content/seoPages'
import { validateSeoInput, type SeoFieldErrors, type SeoPagesInput } from './validation'

const PATH = '/admin/seo'

export interface SeoFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: SeoFieldErrors
  values?: SeoPagesInput
}

export async function saveSeo(
  _previousState: SeoFormState,
  formData: FormData
): Promise<SeoFormState> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { status: 'error', message: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const values: SeoPagesInput = Object.fromEntries(
    SEO_PAGES.map(({ key }): [string, PageSeoFields] => [
      key,
      {
        title: String(formData.get(`${key}.title`) ?? ''),
        description: String(formData.get(`${key}.description`) ?? ''),
        imageUrl: String(formData.get(`${key}.imageUrl`) ?? ''),
      },
    ])
  )

  const { data, errors } = validateSeoInput(values)
  if (errors || !data) {
    return { status: 'error', errors, values }
  }

  const existing = await prisma.pageSeo.findUnique({ where: { id: SINGLETON_ID } })
  if (existing) {
    await recordHistory({
      contentType: 'pageSeo',
      entityId: SINGLETON_ID,
      action: 'update',
      label: 'Référencement',
      snapshot: { pages: existing.pages } as Prisma.InputJsonValue,
      adminUsername: account.username,
    })
  }

  await prisma.pageSeo.upsert({
    where: { id: SINGLETON_ID },
    update: { pages: data as unknown as Prisma.InputJsonValue },
    create: { id: SINGLETON_ID, pages: data as unknown as Prisma.InputJsonValue },
  })

  revalidatePath(PATH)

  return { status: 'success', message: 'Référencement enregistré.' }
}
