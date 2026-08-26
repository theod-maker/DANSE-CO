'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { validateInstructorInput, type InstructorFieldErrors } from './validation'
import { revalidateContent } from '../_shared/revalidate-after-save'
import { recordHistory } from '../../../src/lib/content/history'

const LIST_PATH = '/admin/professeurs'

export interface InstructorFormState {
  errors?: InstructorFieldErrors
  generalError?: string
  values?: {
    name: string
    specialty: string
    bio: string
    experience: string
    photoUrl: string
  }
}

function readForm(formData: FormData) {
  return {
    name: String(formData.get('name') ?? ''),
    specialty: String(formData.get('specialty') ?? ''),
    bio: String(formData.get('bio') ?? ''),
    experience: String(formData.get('experience') ?? ''),
    photoUrl: String(formData.get('photoUrl') ?? ''),
  }
}

export async function saveInstructor(
  _previousState: InstructorFormState,
  formData: FormData
): Promise<InstructorFormState> {
  const account = await getCurrentAdmin()
  if (!account) return { generalError: 'Votre session a expiré. Reconnectez-vous.' }

  const values = readForm(formData)
  const { data, errors } = validateInstructorInput(values)
  if (errors || !data) return { errors, values }

  const id = String(formData.get('id') ?? '')

  if (id) {
    const existing = await prisma.instructor.findUnique({ where: { id } })
    if (!existing) return { generalError: 'Ce professeur n’existe plus.', values }
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, publishedSnapshot: _publishedSnapshot, publishedAt: _publishedAt, ...existingData } = existing
    await recordHistory({
      contentType: 'instructors',
      entityId: id,
      action: 'update',
      label: existing.name,
      snapshot: existingData,
      adminUsername: account.username,
    })
    await prisma.instructor.update({ where: { id }, data })
  } else {
    const last = await prisma.instructor.findFirst({ orderBy: { displayOrder: 'desc' } })
    const created = await prisma.instructor.create({
      data: { ...data, displayOrder: (last?.displayOrder ?? -1) + 1 },
    })
    await recordHistory({
      contentType: 'instructors',
      entityId: created.id,
      action: 'create',
      label: created.name,
      snapshot: null,
      adminUsername: account.username,
    })
  }

  revalidatePath(LIST_PATH)

  redirect(LIST_PATH)
}

export async function deleteInstructor(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const id = String(formData.get('id') ?? '')
  if (!id) return

  const existing = await prisma.instructor.findUnique({ where: { id } })
  if (existing) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, publishedSnapshot: _publishedSnapshot, publishedAt: _publishedAt, ...existingData } = existing
    await recordHistory({
      contentType: 'instructors',
      entityId: id,
      action: 'delete',
      label: existing.name,
      snapshot: existingData,
      adminUsername: account.username,
    })
  }

  await prisma.instructor.deleteMany({ where: { id } })

  revalidatePath(LIST_PATH)

  redirect(LIST_PATH)
}

export async function reorderInstructors(orderedIds: string[]): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return
  if (orderedIds.length === 0) return

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.instructor.update({ where: { id }, data: { displayOrder: index } })
    )
  )

  revalidatePath(LIST_PATH)

  await revalidateContent('instructors')
}
