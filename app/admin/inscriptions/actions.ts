'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { validateRegistrationInput, type RegistrationFieldErrors } from './validation'

const PATH = '/admin/inscriptions'

export interface RegistrationFormValues {
  permanence1Days: string
  permanence1Hours: string
  permanence1Venue: string
  permanence2Days: string
  permanence2Hours: string
  permanence2Venue: string
  requiredDocuments: string[]
  photoNote: string
}

export interface RegistrationFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: RegistrationFieldErrors
  values?: RegistrationFormValues
}

export async function saveRegistrationInfo(
  _previousState: RegistrationFormState,
  formData: FormData
): Promise<RegistrationFormState> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { status: 'error', message: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const values: RegistrationFormValues = {
    permanence1Days: String(formData.get('permanence1Days') ?? ''),
    permanence1Hours: String(formData.get('permanence1Hours') ?? ''),
    permanence1Venue: String(formData.get('permanence1Venue') ?? ''),
    permanence2Days: String(formData.get('permanence2Days') ?? ''),
    permanence2Hours: String(formData.get('permanence2Hours') ?? ''),
    permanence2Venue: String(formData.get('permanence2Venue') ?? ''),
    requiredDocuments: formData.getAll('requiredDocuments').map((entry) => String(entry)),
    photoNote: String(formData.get('photoNote') ?? ''),
  }

  const { data, errors } = validateRegistrationInput(values)
  if (errors || !data) {
    return { status: 'error', errors, values }
  }

  await prisma.registrationInfo.upsert({
    where: { id: SINGLETON_ID },
    update: data,
    create: { id: SINGLETON_ID, ...data },
  })

  revalidatePath(PATH)
  return { status: 'success', message: 'Informations enregistrées.' }
}
