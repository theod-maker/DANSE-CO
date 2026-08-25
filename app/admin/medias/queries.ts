import { prisma } from '../../../src/lib/db'
import { publicPathFor } from '../../../src/lib/mediaStorage'

export interface MediaOption {
  id: string
  label: string
  path: string
}

export async function listMediaOptions(): Promise<MediaOption[]> {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } })

  return assets.map((asset) => ({
    id: asset.id,
    label: asset.originalName,
    path: publicPathFor(asset.storedName),
  }))
}
