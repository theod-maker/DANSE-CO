const EMBED_HOST = 'www.google.com'
const EMBED_PATH = '/maps/embed'

function parse(url: string): URL | undefined {
  try {
    return new URL(url)
  } catch {
    return undefined
  }
}

export function isGoogleMapsEmbedUrl(url: string): boolean {
  const parsed = parse(url)
  if (!parsed) {
    return false
  }
  const isEmbedPath = parsed.pathname === EMBED_PATH || parsed.pathname.startsWith(`${EMBED_PATH}/`)
  return (
    parsed.protocol === 'https:' &&
    parsed.hostname === EMBED_HOST &&
    parsed.port === '' &&
    parsed.username === '' &&
    parsed.password === '' &&
    isEmbedPath &&
    !parsed.pathname.includes('..')
  )
}
