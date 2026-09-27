export const MAXIMUM_SHORT_TEXT = 200
export const MAXIMUM_LONG_TEXT = 2000
export const MAXIMUM_BIOGRAPHY = 5000
export const MAXIMUM_URL_LENGTH = 2048

export function requiredText(
  raw: string,
  fieldLabel: string,
  maximumLength: number
): { value: string } | { error: string } {
  const value = raw.trim()
  if (!value) return { error: `${fieldLabel} est obligatoire.` }
  if (value.length > maximumLength) {
    return { error: `${fieldLabel} est trop long (${maximumLength} caractères maximum).` }
  }
  return { value }
}

export function optionalText(
  raw: string,
  fieldLabel: string,
  maximumLength: number
): { value: string } | { error: string } {
  const value = raw.trim()
  if (value.length > maximumLength) {
    return { error: `${fieldLabel} est trop long (${maximumLength} caractères maximum).` }
  }
  return { value }
}

export function isSafeUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value)
    return protocol === 'https:' || protocol === 'http:'
  } catch {
    return false
  }
}

export function optionalUrl(raw: string): { value: string | null } | { error: string } {
  const trimmed = raw.trim()
  if (!trimmed) return { value: null }

  if (trimmed.length > MAXIMUM_URL_LENGTH) {
    return { error: `Adresse trop longue (${MAXIMUM_URL_LENGTH} caractères maximum).` }
  }

  if (!isSafeUrl(trimmed)) {
    return { error: 'Adresse invalide. Elle doit commencer par http:// ou https://' }
  }

  return { value: new URL(trimmed).href }
}

export function optionalImagePath(raw: string): { value: string | null } | { error: string } {
  const trimmed = raw.trim()
  if (!trimmed) return { value: null }

  if (trimmed.length > MAXIMUM_URL_LENGTH) {
    return { error: `Adresse trop longue (${MAXIMUM_URL_LENGTH} caractères maximum).` }
  }

  if (trimmed.startsWith('//') || trimmed.includes('\\')) {
    return { error: 'Adresse invalide. Un chemin interne commence par une seule barre oblique.' }
  }

  if (trimmed.startsWith('/')) {
    if (trimmed.includes('..')) {
      return { error: 'Adresse invalide. Un chemin interne ne peut pas contenir « .. ».' }
    }
    return { value: trimmed }
  }

  if (!isSafeUrl(trimmed) || new URL(trimmed).protocol !== 'https:') {
    return {
      error:
        'Adresse invalide. Utilisez un chemin interne comme /images/photo.jpg, ou une adresse commençant par https://',
    }
  }

  return { value: new URL(trimmed).href }
}

const MAP_EMBED_PREFIX = 'https://www.google.com/maps/embed'

export function optionalMapEmbedUrl(raw: string): { value: string | null } | { error: string } {
  const result = optionalUrl(raw)
  if ('error' in result || !result.value) return result
  if (!result.value.startsWith(MAP_EMBED_PREFIX)) {
    return {
      error: `Adresse de carte invalide. Collez le lien d'intégration Google Maps (${MAP_EMBED_PREFIX}…).`,
    }
  }
  return result
}

export function cleanStringList(values: string[], maximumLength: number): string[] {
  return values
    .map((value) => value.trim())
    .filter((value) => value.length > 0 && value.length <= maximumLength)
}
