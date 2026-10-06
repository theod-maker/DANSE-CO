import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TRACKERS } from './trackers.ts'
import { CONSENT_COOKIE_NAME, CONSENT_MAX_AGE_SECONDS } from '../analytics/consent.ts'
import { buildInitConfig } from '../analytics/client.ts'

test('documents the site consent cookie under its real name and lifetime', () => {
  const entry = TRACKERS.find((tracker) => tracker.name.startsWith(CONSENT_COOKIE_NAME))
  assert.ok(entry)
  assert.equal(CONSENT_MAX_AGE_SECONDS, 182 * 24 * 60 * 60)
  assert.equal(entry.lifetime, '6 mois')
})

test('the 12 months announced for PostHog rely on the library default, never overridden here', () => {
  assert.equal('cookie_expiration' in buildInitConfig(true, false), false)
  const posthogEntries = TRACKERS.filter((tracker) => tracker.name.includes('ph_'))
  assert.ok(posthogEntries.length > 0)
  for (const entry of posthogEntries) {
    assert.equal(entry.lifetime, '12 mois au plus')
  }
})

test('every tracker has a name, a purpose, a moment and a lifetime', () => {
  for (const tracker of TRACKERS) {
    assert.ok(tracker.name && tracker.purpose && tracker.when && tracker.lifetime)
  }
})
