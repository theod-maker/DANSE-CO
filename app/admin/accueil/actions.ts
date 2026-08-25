'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import {
  HOMEPAGE_FIELDS,
  validateHomepageInput,
  type HomepageFieldErrors,
  type HomepageInput,
} from './validation'

const PATH = '/admin/accueil'

export interface HomepageFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: HomepageFieldErrors
  values?: Record<keyof HomepageInput, string>
}

export async function saveHomepage(
  _previousState: HomepageFormState,
  formData: FormData
): Promise<HomepageFormState> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { status: 'error', message: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const values = Object.fromEntries(
    HOMEPAGE_FIELDS.map((field) => [field, String(formData.get(field) ?? '')])
  ) as Record<keyof HomepageInput, string>

  const { data, errors } = validateHomepageInput(values)
  if (errors || !data) {
    return { status: 'error', errors, values }
  }

  await prisma.homepage.upsert({
    where: { id: SINGLETON_ID },
    update: data,
    create: { id: SINGLETON_ID, ...data },
  })

  revalidatePath(PATH)
  return { status: 'success', message: "Page d'accueil enregistrée." }
}
