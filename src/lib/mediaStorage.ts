import { randomBytes } from 'node:crypto'
import { del, put } from '@vercel/blob'

const EXTENSION_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

export function buildStoredName(originalName: string, mimeType: string): string {
  const extension = EXTENSION_BY_MIME[mimeType] ?? 'bin'

  const base = originalName
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\.[^.]*$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)

  const suffix = randomBytes(4).toString('hex')

  return `${base || 'image'}-${suffix}.${extension}`
}

export async function uploadMediaFile(
  storedName: string,
  bytes: Uint8Array,
  mimeType: string
): Promise<string> {
  const blob = await put(storedName, Buffer.from(bytes), {
    access: 'public',
    addRandomSuffix: false,
    contentType: mimeType,
  })

  return blob.url
}

export async function deleteMediaFile(url: string): Promise<void> {
  await del(url)
}
