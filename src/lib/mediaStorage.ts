import { randomBytes } from 'node:crypto'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const UPLOAD_DIRECTORY = join(process.cwd(), 'public', 'uploads')
const PUBLIC_PREFIX = '/uploads'

const EXTENSION_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

export function publicPathFor(storedName: string): string {
  return `${PUBLIC_PREFIX}/${storedName}`
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

export async function writeMediaFile(storedName: string, bytes: Uint8Array): Promise<void> {
  await mkdir(UPLOAD_DIRECTORY, { recursive: true })
  await writeFile(join(UPLOAD_DIRECTORY, storedName), bytes)
}

export async function deleteMediaFile(storedName: string): Promise<void> {
  try {
    await unlink(join(UPLOAD_DIRECTORY, storedName))
  } catch {
    // Fichier déjà absent : la ligne en base doit tout de même être supprimée.
  }
}
