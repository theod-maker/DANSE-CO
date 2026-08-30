export const MAXIMUM_FILE_BYTES = 4 * 1024 * 1024

export const ACCEPTED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
] as const

export type AcceptedMimeType = (typeof ACCEPTED_MIME_TYPES)[number]

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

function startsWith(bytes: Uint8Array, signature: number[], offset = 0): boolean {
  return signature.every((value, index) => bytes[offset + index] === value)
}

export function detectImageType(bytes: Uint8Array): AcceptedMimeType | null {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return 'image/jpeg'
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'image/png'

  const isRiff = startsWith(bytes, [0x52, 0x49, 0x46, 0x46])
  const isWebp = startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8)
  if (isRiff && isWebp) return 'image/webp'

  const isFtyp = startsWith(bytes, [0x66, 0x74, 0x79, 0x70], 4)
  const isAvif = startsWith(bytes, [0x61, 0x76, 0x69], 8)
  if (isFtyp && isAvif) return 'image/avif'

  return null
}

export function validateUpload(input: {
  sizeBytes: number
  declaredType: string
  bytes: Uint8Array
}): { mimeType: AcceptedMimeType } | { error: string } {
  if (input.sizeBytes === 0) {
    return { error: 'Choisissez une image à envoyer.' }
  }

  if (input.sizeBytes > MAXIMUM_FILE_BYTES) {
    return {
      error: `Image trop lourde (${formatBytes(input.sizeBytes)}). Maximum ${formatBytes(MAXIMUM_FILE_BYTES)}.`,
    }
  }

  const detected = detectImageType(input.bytes)

  if (!detected) {
    return { error: 'Ce fichier n’est pas une image. Formats acceptés : JPEG, PNG, WebP, AVIF.' }
  }

  if (input.declaredType && input.declaredType !== detected) {
    return { error: 'Le contenu du fichier ne correspond pas à son format annoncé.' }
  }

  return { mimeType: detected }
}
