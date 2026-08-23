export const SESSION_COOKIE_NAME = 'danseco_admin_session'
export const SESSION_DURATION_SECONDS = 60 * 60 * 8

interface SessionPayload {
  userId: string
  expiresAt: number
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

async function importSigningKey(): Promise<CryptoKey> {
  const secret = process.env['AUTH_SECRET']
  if (!secret) {
    throw new Error('AUTH_SECRET manquant — impossible de signer ou vérifier les sessions')
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
  const payload: SessionPayload = {
    userId,
    expiresAt: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  }

  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload))
  const encodedPayload = toBase64Url(payloadBytes)

  const key = await importSigningKey()
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(encodedPayload))

  return `${encodedPayload}.${toBase64Url(new Uint8Array(signature))}`
}

export async function verifySessionToken(token: string | undefined): Promise<string | null> {
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

  return payload.userId
}
