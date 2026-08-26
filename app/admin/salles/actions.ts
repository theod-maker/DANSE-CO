'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { validateVenueInput, type VenueFieldErrors } from './validation'
import { revalidateContent } from '../_shared/revalidate-after-save'
import { recordHistory } from '../../../src/lib/content/history'

const LIST_PATH = '/admin/salles'

export interface VenueFormState {
  errors?: VenueFieldErrors
  generalError?: string
  values?: {
    name: string
    address: string
    description: string
    amenities: string[]
    mapEmbedUrl: string
    googleMapsUrl: string
    imageUrl: string
  }
}

function readForm(formData: FormData) {
  return {
    name: String(formData.get('name') ?? ''),
    address: String(formData.get('address') ?? ''),
    description: String(formData.get('description') ?? ''),
    amenities: formData.getAll('amenities').map((entry) => String(entry)),
    mapEmbedUrl: String(formData.get('mapEmbedUrl') ?? ''),
    googleMapsUrl: String(formData.get('googleMapsUrl') ?? ''),
    imageUrl: String(formData.get('imageUrl') ?? ''),
  }
}

export async function saveVenue(
  _previousState: VenueFormState,
  formData: FormData
): Promise<VenueFormState> {
  const account = await getCurrentAdmin()
  if (!account) return { generalError: 'Votre session a expiré. Reconnectez-vous.' }

  const values = readForm(formData)
  const { data, errors } = validateVenueInput(values)
  if (errors || !data) return { errors, values }

  const id = String(formData.get('id') ?? '')

  if (id) {
    const existing = await prisma.venue.findUnique({ where: { id } })
    if (!existing) return { generalError: 'Cette salle n’existe plus.', values }
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...existingData } = existing
    await recordHistory({
      contentType: 'venues',
      entityId: id,
      action: 'update',
      label: existing.name,
      snapshot: existingData,
      adminUsername: account.username,
    })
    await prisma.venue.update({ where: { id }, data })
  } else {
    const last = await prisma.venue.findFirst({ orderBy: { displayOrder: 'desc' } })
    const created = await prisma.venue.create({
      data: { ...data, displayOrder: (last?.displayOrder ?? -1) + 1 },
    })
    await recordHistory({
      contentType: 'venues',
      entityId: created.id,
      action: 'create',
      label: created.name,
      snapshot: null,
      adminUsername: account.username,
    })
  }

  revalidatePath(LIST_PATH)

  await revalidateContent('venues')
  redirect(LIST_PATH)
}

export async function deleteVenue(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const id = String(formData.get('id') ?? '')
  if (!id) return

  const existing = await prisma.venue.findUnique({ where: { id } })
  if (existing) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...existingData } = existing
    await recordHistory({
      contentType: 'venues',
      entityId: id,
      action: 'delete',
      label: existing.name,
      snapshot: existingData,
      adminUsername: account.username,
    })
  }

  await prisma.venue.deleteMany({ where: { id } })

  revalidatePath(LIST_PATH)

  await revalidateContent('venues')
  redirect(LIST_PATH)
}

export async function reorderVenues(orderedIds: string[]): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) return
  if (orderedIds.length === 0) return

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.venue.update({ where: { id }, data: { displayOrder: index } })
    )
  )

  revalidatePath(LIST_PATH)

  await revalidateContent('venues')
}
