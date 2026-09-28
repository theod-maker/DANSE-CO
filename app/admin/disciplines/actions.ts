'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { validateDisciplineInput, type DisciplineFieldErrors } from './validation'
import { revalidateContent } from '../_shared/revalidate-after-save'
import { recordHistory } from '../../../src/lib/content/history'

const LIST_PATH = '/admin/disciplines'

export interface DisciplineFormState {
  errors?: DisciplineFieldErrors
  generalError?: string
  values?: {
    title: string
    iconName: string
    description: string
    benefits: string[]
    imageUrl: string
  }
}

function readForm(formData: FormData) {
  return {
    title: String(formData.get('title') ?? ''),
    iconName: String(formData.get('iconName') ?? ''),
    description: String(formData.get('description') ?? ''),
    benefits: formData.getAll('benefits').map((entry) => String(entry)),
    imageUrl: String(formData.get('imageUrl') ?? ''),
  }
}

export async function saveDiscipline(
  _previousState: DisciplineFormState,
  formData: FormData
): Promise<DisciplineFormState> {
  const account = await getCurrentAdmin()
  if (!account) return { generalError: 'Votre session a expiré. Reconnectez-vous.' }

  const values = readForm(formData)
  const { data, errors } = validateDisciplineInput(values)
  if (errors || !data) return { errors, values }

  const id = String(formData.get('id') ?? '')

  if (id) {
    const existing = await prisma.discipline.findUnique({ where: { id } })
    if (!existing) return { generalError: 'Cette discipline n’existe plus.', values }
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, publishedSnapshot: _publishedSnapshot, publishedAt: _publishedAt, ...existingData } = existing
    await recordHistory({
      contentType: 'disciplines',
      entityId: id,
      action: 'update',
      label: existing.title,
      snapshot: existingData,
      adminUsername: account.username,
    })
    await prisma.discipline.update({ where: { id }, data })
  } else {
    const last = await prisma.discipline.findFirst({ orderBy: { displayOrder: 'desc' } })
    const created = await prisma.discipline.create({
      data: { ...data, displayOrder: (last?.displayOrder ?? -1) + 1 },
    })
    await recordHistory({
      contentType: 'disciplines',
      entityId: created.id,
      action: 'create',
      label: created.title,
      snapshot: null,
      adminUsername: account.username,
    })
  }

  revalidatePath(LIST_PATH)

  redirect(LIST_PATH)
}

export async function deleteDiscipline(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const id = String(formData.get('id') ?? '')
  if (!id) return

  const existing = await prisma.discipline.findUnique({ where: { id } })
  if (existing) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, publishedSnapshot: _publishedSnapshot, publishedAt: _publishedAt, ...existingData } = existing
    await recordHistory({
      contentType: 'disciplines',
      entityId: id,
      action: 'delete',
      label: existing.title,
      snapshot: existingData,
      adminUsername: account.username,
    })
  }

  await prisma.discipline.deleteMany({ where: { id } })

  revalidatePath(LIST_PATH)

  redirect(LIST_PATH)
}

export async function reorderDisciplines(orderedIds: string[]): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return
  if (orderedIds.length === 0) return

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.discipline.update({ where: { id }, data: { displayOrder: index } })
    )
  )

  revalidatePath(LIST_PATH)

  await revalidateContent('disciplines')
}
