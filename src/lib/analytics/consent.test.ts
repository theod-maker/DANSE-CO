import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_SECONDS,
  readConsent,
  serializeConsent,
} from './consent.ts'

test('reads a granted choice from a cookie header', () => {
  assert.equal(readConsent(`${CONSENT_COOKIE_NAME}=granted`), 'granted')
})

test('reads a denied choice among other cookies', () => {
  assert.equal(readConsent(`a=1; ${CONSENT_COOKIE_NAME}=denied; b=2`), 'denied')
})

test('returns undefined without the cookie', () => {
  assert.equal(readConsent('a=1; b=2'), undefined)
  assert.equal(readConsent(''), undefined)
})

test('ignores an unknown value', () => {
  assert.equal(readConsent(`${CONSENT_COOKIE_NAME}=maybe`), undefined)
  assert.equal(readConsent(`${CONSENT_COOKIE_NAME}=`), undefined)
})

test('does not match a cookie whose name only ends like ours', () => {
  assert.equal(readConsent(`x${CONSENT_COOKIE_NAME}=granted`), undefined)
})

test('lasts six months', () => {
  assert.equal(CONSENT_MAX_AGE_SECONDS, 182 * 24 * 60 * 60)
})

test('serializes a host-only secure cookie outside the production domain', () => {
  const cookie = serializeConsent('granted', 'localhost')
  assert.ok(cookie.startsWith(`${CONSENT_COOKIE_NAME}=granted;`))
  assert.ok(cookie.includes(`Max-Age=${CONSENT_MAX_AGE_SECONDS}`))
  assert.ok(cookie.includes('Path=/'))
  assert.ok(cookie.includes('SameSite=Lax'))
  assert.ok(cookie.includes('Secure'))
  assert.ok(!cookie.includes('Domain='))
})

test('scopes the cookie to the apex domain on dansandco.fr and www', () => {
  assert.ok(serializeConsent('denied', 'dansandco.fr').includes('Domain=dansandco.fr'))
  assert.ok(serializeConsent('denied', 'www.dansandco.fr').includes('Domain=dansandco.fr'))
})

test('does not scope the cookie for a look-alike host', () => {
  assert.ok(!serializeConsent('granted', 'dansandco.fr.evil.com').includes('Domain='))
  assert.ok(!serializeConsent('granted', 'evil-dansandco.fr').includes('Domain='))
})
