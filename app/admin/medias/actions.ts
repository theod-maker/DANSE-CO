'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { buildStoredName, deleteMediaFile, writeMediaFile } from '../../../src/lib/mediaStorage'
import { validateUpload } from './validation'

const PATH = '/admin/medias'

export interface UploadFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function uploadMedia(
  _previousState: UploadFormState,
  formData: FormData
): Promise<UploadFormState> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { status: 'error', message: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return { status: 'error', message: 'Choisissez une image à envoyer.' }
  }

  const bytes = new Uint8Array(await file.arrayBuffer())
  const result = validateUpload({
    sizeBytes: file.size,
    declaredType: file.type,
    bytes: bytes.slice(0, 16),
  })

  if ('error' in result) {
    return { status: 'error', message: result.error }
  }

  const storedName = buildStoredName(file.name, result.mimeType)

  await writeMediaFile(storedName, bytes)

  try {
    await prisma.mediaAsset.create({
      data: {
        storedName,
        originalName: file.name,
        mimeType: result.mimeType,
        sizeBytes: file.size,
      },
    })
  } catch (error) {
    await deleteMediaFile(storedName)
    throw error
  }

  revalidatePath(PATH)
  return { status: 'success', message: `« ${file.name} » a été ajoutée.` }
}

export async function deleteMedia(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const id = String(formData.get('id') ?? '')
  if (!id) return

  const asset = await prisma.mediaAsset.findUnique({ where: { id } })
  if (!asset) return

  await prisma.mediaAsset.delete({ where: { id } })
  await deleteMediaFile(asset.storedName)

  revalidatePath(PATH)
  redirect(PATH)
}
