'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { validateCourseInput, type CourseFieldErrors } from './validation'

const LIST_PATH = '/admin/planning'

export interface CourseFormState {
  errors?: CourseFieldErrors
  generalError?: string
  values?: {
    name: string
    day: string
    startTime: string
    endTime: string
    level: string
    venue: string
  }
}

function readForm(formData: FormData) {
  return {
    name: String(formData.get('name') ?? ''),
    day: String(formData.get('day') ?? ''),
    startTime: String(formData.get('startTime') ?? ''),
    endTime: String(formData.get('endTime') ?? ''),
    level: String(formData.get('level') ?? ''),
    venue: String(formData.get('venue') ?? ''),
  }
}

export async function saveCourse(
  _previousState: CourseFormState,
  formData: FormData
): Promise<CourseFormState> {
  const account = await getCurrentAdmin()
  if (!account) return { generalError: 'Votre session a expiré. Reconnectez-vous.' }

  const values = readForm(formData)
  const { data, errors } = validateCourseInput(values)
  if (errors || !data) return { errors, values }

  const id = String(formData.get('id') ?? '')

  if (id) {
    const existing = await prisma.scheduleEntry.findUnique({ where: { id }, select: { id: true } })
    if (!existing) return { generalError: 'Ce cours n’existe plus.', values }
    await prisma.scheduleEntry.update({ where: { id }, data })
  } else {
    await prisma.scheduleEntry.create({ data })
  }

  revalidatePath(LIST_PATH)
  redirect(LIST_PATH)
}

export async function deleteCourse(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const id = String(formData.get('id') ?? '')
  if (!id) return

  await prisma.scheduleEntry.deleteMany({ where: { id } })

  revalidatePath(LIST_PATH)
  redirect(LIST_PATH)
}
