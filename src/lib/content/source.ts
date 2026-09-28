export function isDatabaseContentEnabled(): boolean {
  return process.env['CONTENT_SOURCE'] === 'database'
}

export async function readWithFallback<T>(
  label: string,
  readFromDatabase: () => Promise<T | null>,
  fallback: T
): Promise<T> {
  if (!isDatabaseContentEnabled()) return fallback

  try {
    const value = await readFromDatabase()
    if (value === null || value === undefined) return fallback
    if (Array.isArray(value) && value.length === 0) return fallback
    return value
  } catch (error) {
    console.error(`[contenu] lecture de « ${label} » impossible, repli sur le contenu local`, error)
    return fallback
  }
}
