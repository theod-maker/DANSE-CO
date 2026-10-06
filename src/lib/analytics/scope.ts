export const PRODUCTION_HOSTS: readonly string[] = ['dansandco.fr', 'www.dansandco.fr']
export const EXCLUDED_PATH_ROOTS: readonly string[] = ['admin', 'studio', 'api']

const PREVIEW_HOST_SUFFIX = '.vercel.app'
const LOCAL_HOSTS: readonly string[] = ['localhost', '127.0.0.1']

export function isAnalyticsHost(hostname: string, allowPreview: boolean): boolean {
  const host = hostname.toLowerCase()
  if (PRODUCTION_HOSTS.includes(host)) {
    return true
  }
  if (!allowPreview) {
    return false
  }
  return LOCAL_HOSTS.includes(host) || host.endsWith(PREVIEW_HOST_SUFFIX)
}

function firstSegment(pathname: string): string | undefined {
  let decoded: string
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return undefined
  }
  const resolved: string[] = []
  for (const segment of decoded.toLowerCase().split('/')) {
    if (segment === '' || segment === '.') {
      continue
    }
    if (segment === '..') {
      resolved.pop()
      continue
    }
    resolved.push(segment)
  }
  return resolved[0] ?? ''
}

export function isExcludedPath(pathname: string): boolean {
  const first = firstSegment(pathname)
  return first === undefined || EXCLUDED_PATH_ROOTS.includes(first)
}

export function isEventAllowed(eventUrl: string, allowPreview: boolean): boolean {
  let url: URL
  try {
    url = new URL(eventUrl)
  } catch {
    return false
  }
  return isAnalyticsHost(url.hostname, allowPreview) && !isExcludedPath(url.pathname)
}
