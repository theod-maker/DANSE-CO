const INTERNAL_ORIGIN = 'https://internal.invalid'

export function sanitizeInternalPath(rawPath: string | null): string {
  if (!rawPath || !rawPath.startsWith('/')) return '/'
  if (/[\\\u0000-\u001f\u007f]/.test(rawPath)) return '/'

  const resolved = new URL(rawPath, INTERNAL_ORIGIN)
  if (resolved.origin !== INTERNAL_ORIGIN) return '/'
  if (resolved.pathname.startsWith('//')) return '/'
  return `${resolved.pathname}${resolved.search}`
}
