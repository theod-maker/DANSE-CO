'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { validateSiteInfoInput, type SiteInfoFieldErrors, type SiteInfoInput } from './validation'
import { revalidateContent } from '../_shared/revalidate-after-save'

const PATH = '/admin/informations'

export interface SiteInfoFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: SiteInfoFieldErrors
  values?: Record<keyof SiteInfoInput, string>
}

const FIELDS: (keyof SiteInfoInput)[] = [
  'phone',
  'email',
  'mailingAddress',
  'instagramUrl',
  'facebookUrl',
  'twitterUrl',
  'websiteUrl',
  'season',
  'footerTagline',
]

export async function saveSiteInfo(
  _previousState: SiteInfoFormState,
  formData: FormData
): Promise<SiteInfoFormState> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { status: 'error', message: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? '')])
  ) as Record<keyof SiteInfoInput, string>

  const { data, errors } = validateSiteInfoInput(values)
  if (errors || !data) {
    return { status: 'error', errors, values }
  }

  await prisma.siteInfo.upsert({
    where: { id: SINGLETON_ID },
    update: data,
    create: { id: SINGLETON_ID, ...data },
  })

  revalidatePath(PATH)

  await revalidateContent('siteInfo')
  return { status: 'success', message: 'Informations enregistrées.' }
}
