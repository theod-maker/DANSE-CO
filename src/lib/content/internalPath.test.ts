import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sanitizeInternalPath } from './internalPath.ts'

test('keeps an internal path with its query string', () => {
  assert.equal(sanitizeInternalPath('/planning?jour=lundi'), '/planning?jour=lundi')
})

test('falls back to home for missing or relative values', () => {
  assert.equal(sanitizeInternalPath(null), '/')
  assert.equal(sanitizeInternalPath(''), '/')
  assert.equal(sanitizeInternalPath('planning'), '/')
  assert.equal(sanitizeInternalPath('https://evil.example'), '/')
})

test('rejects every known way to escape to another site', () => {
  const escapes = ['//evil.example', '/\\evil.example', '/\t/evil.example', '/\n/evil.example']
  for (const escape of escapes) {
    assert.equal(sanitizeInternalPath(escape), '/', JSON.stringify(escape))
  }
})

test('keeps an encoded backslash as a harmless internal path', () => {
  assert.equal(sanitizeInternalPath('/%5Cevil.example'), '/%5Cevil.example')
})
