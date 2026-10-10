export type ConsentChoice = 'granted' | 'denied'

export const CONSENT_COOKIE_NAME = 'td_measure_consent'
export const CONSENT_MAX_AGE_SECONDS = 182 * 24 * 60 * 60

const COOKIE_DOMAIN = 'dansandco.fr'
const COOKIE_DOMAIN_HOSTS = new Set([COOKIE_DOMAIN, `www.${COOKIE_DOMAIN}`])

export function readConsent(cookieHeader: string): ConsentChoice | undefined {
  const entry = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`))
  const value = entry?.slice(CONSENT_COOKIE_NAME.length + 1)
  return value === 'granted' || value === 'denied' ? value : undefined
}

export function serializeConsent(choice: ConsentChoice, hostname: string): string {
  const attributes = [
    `${CONSENT_COOKIE_NAME}=${choice}`,
    `Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
    'Path=/',
    'SameSite=Lax',
    'Secure',
  ]
  if (COOKIE_DOMAIN_HOSTS.has(hostname.toLowerCase())) {
    attributes.push(`Domain=${COOKIE_DOMAIN}`)
  }
  return attributes.join('; ')
}
