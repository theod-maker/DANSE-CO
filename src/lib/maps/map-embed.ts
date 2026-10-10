const EMBED_HOST = 'www.google.com'
const EMBED_PATH = '/maps/embed'

function parse(url: string): URL | undefined {
  try {
    return new URL(url)
  } catch {
    return undefined
  }
}

export function googleMapsEmbedHref(url: string): string | undefined {
  const parsed = parse(url)
  if (!parsed) {
    return undefined
  }
  const isEmbedPath = parsed.pathname === EMBED_PATH || parsed.pathname.startsWith(`${EMBED_PATH}/`)
  const isAllowed =
    parsed.protocol === 'https:' &&
    parsed.hostname === EMBED_HOST &&
    parsed.port === '' &&
    parsed.username === '' &&
    parsed.password === '' &&
    isEmbedPath &&
    !parsed.pathname.includes('..')
  return isAllowed ? parsed.href : undefined
}

export function isGoogleMapsEmbedUrl(url: string): boolean {
  return googleMapsEmbedHref(url) !== undefined
}
