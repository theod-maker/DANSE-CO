import { createHash, randomBytes } from 'node:crypto'

export const INVITATION_LIFETIME_MS = 48 * 60 * 60 * 1000

const TOKEN_BYTES = 32
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/

export interface GeneratedInvitation {
  token: string
  tokenHash: string
  expiresAt: Date
}

export function hashInvitationToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export function generateInvitation(now: Date = new Date()): GeneratedInvitation {
  const token = randomBytes(TOKEN_BYTES).toString('base64url')
  return {
    token,
    tokenHash: hashInvitationToken(token),
    expiresAt: new Date(now.getTime() + INVITATION_LIFETIME_MS),
  }
}

export function isWellFormedInvitationToken(token: string): boolean {
  return TOKEN_PATTERN.test(token)
}

export function isInvitationUsable(
  invitation: { expiresAt: Date; usedAt: Date | null },
  now: Date = new Date()
): boolean {
  return invitation.usedAt === null && invitation.expiresAt.getTime() > now.getTime()
}

export function unusablePasswordSecret(): string {
  return randomBytes(TOKEN_BYTES).toString('base64url')
}
