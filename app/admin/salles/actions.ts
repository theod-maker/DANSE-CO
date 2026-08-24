'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { validateVenueInput, type VenueFieldErrors } from './validation'

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
    const existing = await prisma.venue.findUnique({ where: { id }, select: { id: true } })
    if (!existing) return { generalError: 'Cette salle n’existe plus.', values }
    await prisma.venue.update({ where: { id }, data })
  } else {
    const last = await prisma.venue.findFirst({ orderBy: { displayOrder: 'desc' } })
    await prisma.venue.create({ data: { ...data, displayOrder: (last?.displayOrder ?? -1) + 1 } })
  }

  revalidatePath(LIST_PATH)
  redirect(LIST_PATH)
}

export async function deleteVenue(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const id = String(formData.get('id') ?? '')
  if (!id) return

  await prisma.venue.deleteMany({ where: { id } })

  revalidatePath(LIST_PATH)
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
}
