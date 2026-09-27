import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  INVITATION_LIFETIME_MS,
  generateInvitation,
  hashInvitationToken,
  isInvitationUsable,
  isWellFormedInvitationToken,
} from './invitation.ts'

test('a generated invitation stores only a hash of its token', () => {
  const invitation = generateInvitation()
  assert.notEqual(invitation.tokenHash, invitation.token)
  assert.equal(invitation.tokenHash, hashInvitationToken(invitation.token))
  assert.ok(isWellFormedInvitationToken(invitation.token))
})

test('two invitations never share a token', () => {
  assert.notEqual(generateInvitation().token, generateInvitation().token)
})

test('an invitation expires after 48 hours', () => {
  const createdAt = new Date('2026-09-27T10:00:00Z')
  const { expiresAt } = generateInvitation(createdAt)
  assert.equal(expiresAt.getTime() - createdAt.getTime(), INVITATION_LIFETIME_MS)
  assert.ok(isInvitationUsable({ expiresAt, usedAt: null }, new Date('2026-09-29T09:59:59Z')))
  assert.ok(!isInvitationUsable({ expiresAt, usedAt: null }, new Date('2026-09-29T10:00:00Z')))
})

test('a used invitation can no longer be used', () => {
  const { expiresAt } = generateInvitation()
  assert.ok(!isInvitationUsable({ expiresAt, usedAt: new Date() }))
})

test('malformed tokens are rejected before any database lookup', () => {
  for (const token of ['', 'abc', 'x'.repeat(44), `${'a'.repeat(42)}!`, '../../etc/passwd']) {
    assert.ok(!isWellFormedInvitationToken(token), token)
  }
})
