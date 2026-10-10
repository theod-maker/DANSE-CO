import { test } from 'node:test'
import assert from 'node:assert/strict'
import { listThirdParties } from './third-parties.ts'

test('lists Google Fonts while fonts are not self-hosted', () => {
  const ids = listThirdParties(false).map((party) => party.id)
  assert.ok(ids.includes('google-fonts'))
})

test('drops Google Fonts once fonts are self-hosted', () => {
  const ids = listThirdParties(true).map((party) => party.id)
  assert.ok(!ids.includes('google-fonts'))
  assert.ok(ids.includes('google-maps'))
  assert.ok(ids.includes('formspree'))
})

test('every third party names at least one host, a purpose and a moment', () => {
  for (const party of listThirdParties(false)) {
    assert.ok(party.hosts.length > 0, party.id)
    assert.ok(party.purpose.length > 0, party.id)
    assert.ok(party.when.length > 0, party.id)
  }
})

test('Google Maps is only contacted after a click on the map', () => {
  const maps = listThirdParties(true).find((party) => party.id === 'google-maps')
  assert.ok(maps)
  assert.ok(maps.when.includes('seulement si vous avez accepté les cookies'))
})
