export const SESSION_COOKIE_NAME = 'danseco_admin_session'
export const SESSION_DURATION_SECONDS = 60 * 60 * 8

interface SessionPayload {
  userId: string
  expiresAt: number
  issuedAtMs: number
}

export interface VerifiedSession {
  userId: string
  issuedAtMs: number
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array | null {
  try {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/')
    const binary = atob(padded)
    const bytes = new Uint8Array(binary.length)
    for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index)
    return bytes
  } catch {
    return null
  }
}

const MINIMUM_SECRET_LENGTH = 32
const PLACEHOLDER_SECRET = 'remplacer-par-une-valeur-aleatoire-de-32-octets-minimum'

async function importSigningKey(): Promise<CryptoKey> {
  const secret = process.env['AUTH_SECRET']

  if (!secret) {
    throw new Error(
      'AUTH_SECRET manquant. Générer une valeur avec : openssl rand -base64 48'
    )
  }

  if (secret === PLACEHOLDER_SECRET) {
    throw new Error(
      "AUTH_SECRET vaut encore l'exemple de .env.example, qui est public sur GitHub. " +
        'Générer une vraie valeur avec : openssl rand -base64 48'
    )
  }

  if (secret.length < MINIMUM_SECRET_LENGTH) {
    throw new Error(
      `AUTH_SECRET trop court : ${MINIMUM_SECRET_LENGTH} caractères minimum requis. ` +
        'Générer une valeur avec : openssl rand -base64 48'
    )
  }

  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

export async function createSessionToken(userId: string): Promise<string> {
  const issuedAtMs = Date.now()
  const payload: SessionPayload = {
    userId,
    issuedAtMs,
    expiresAt: Math.floor(issuedAtMs / 1000) + SESSION_DURATION_SECONDS,
  }

  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload))
  const encodedPayload = toBase64Url(payloadBytes)

  const key = await importSigningKey()
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(encodedPayload))

  return `${encodedPayload}.${toBase64Url(new Uint8Array(signature))}`
}

export async function verifySessionToken(token: string | undefined): Promise<string | null> {
  const session = await verifySessionPayload(token)
  return session ? session.userId : null
}

export async function verifySessionPayload(
  token: string | undefined
): Promise<VerifiedSession | null> {
  if (!token) return null

  const segments = token.split('.')
  if (segments.length !== 2) return null

  const [encodedPayload, encodedSignature] = segments
  const signatureBytes = fromBase64Url(encodedSignature)
  if (!signatureBytes) return null

  const key = await importSigningKey()
  const isSignatureValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes as BufferSource,
    new TextEncoder().encode(encodedPayload)
  )
  if (!isSignatureValid) return null

  const payloadBytes = fromBase64Url(encodedPayload)
  if (!payloadBytes) return null

  let payload: SessionPayload
  try {
    payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as SessionPayload
  } catch {
    return null
  }

  if (typeof payload.userId !== 'string' || typeof payload.expiresAt !== 'number') return null
  if (payload.expiresAt <= Math.floor(Date.now() / 1000)) return null

  const issuedAtMs = typeof payload.issuedAtMs === 'number' ? payload.issuedAtMs : 0

  return { userId: payload.userId, issuedAtMs }
}
