import { prisma } from '../../../src/lib/db'

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
    path: asset.url,
  }))
}
