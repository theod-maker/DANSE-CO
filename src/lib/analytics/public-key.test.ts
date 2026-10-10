import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isPublicPosthogKey } from './public-key.ts'

test('accepts a public project key', () => {
  assert.equal(isPublicPosthogKey('phc_abcDEF123'), true)
})

test('refuses a personal api key, an empty value and anything else', () => {
  for (const value of ['phx_abcDEF123', '', undefined, 'phc_', 'phc_ab cd', 'PHC_abc', ' phc_abc']) {
    assert.equal(isPublicPosthogKey(value), false, String(value))
  }
})
