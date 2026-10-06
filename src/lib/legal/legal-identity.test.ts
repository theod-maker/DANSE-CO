import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  evaluateLegalGate,
  findMissingLegalFields,
  LEGAL_IDENTITY,
  type LegalIdentity,
} from './legal-identity.ts'

const COMPLETE: LegalIdentity = {
  publisherName: 'Association Exemple',
  legalForm: 'Association loi 1901',
  registrationKind: 'RNA',
  registrationNumber: 'W442000001',
  headOfficeAddress: '1 rue Exemple, 44730 Saint-Michel-Chef-Chef',
  publicationDirector: 'Prénom Nom',
  contactEmail: 'contact@example.fr',
  contactPhone: '02 00 00 00 00',
  databaseHostName: 'Neon',
  dataRegion: 'Francfort (Allemagne)',
  contactRetention: '12 mois après la dernière réponse',
  formspreeTransferSafeguard: 'Clauses contractuelles types',
  analyticsRetentionMonths: 25,
}

test('a complete identity has no missing field', () => {
  assert.deepEqual(findMissingLegalFields(COMPLETE), [])
})

test('reports every field of an empty identity', () => {
  assert.equal(findMissingLegalFields({}).length, Object.keys(COMPLETE).length)
})

test('rejects blank and provisional text', () => {
  for (const value of ['', '   ', 'à compléter', 'A COMPLETER', 'TODO', 'tbd', 'xxx', '???']) {
    assert.deepEqual(findMissingLegalFields({ ...COMPLETE, publisherName: value }), ['publisherName'], value)
  }
})

test('validates the email shape', () => {
  assert.deepEqual(findMissingLegalFields({ ...COMPLETE, contactEmail: 'pas-un-email' }), ['contactEmail'])
})

test('validates the registration number against its kind', () => {
  assert.deepEqual(findMissingLegalFields({ ...COMPLETE, registrationNumber: '442000001' }), ['registrationNumber'])
  assert.deepEqual(
    findMissingLegalFields({ ...COMPLETE, registrationKind: 'SIREN', registrationNumber: '123456789' }),
    []
  )
  assert.deepEqual(
    findMissingLegalFields({ ...COMPLETE, registrationKind: 'SIREN', registrationNumber: '12345678' }),
    ['registrationNumber']
  )
  assert.deepEqual(
    findMissingLegalFields({ ...COMPLETE, registrationKind: 'SIRET', registrationNumber: '12345678901234' }),
    []
  )
})

test('validates the analytics retention as a positive whole number of months', () => {
  for (const value of [0, -1, 2.5, Number.NaN]) {
    assert.deepEqual(findMissingLegalFields({ ...COMPLETE, analyticsRetentionMonths: value }), ['analyticsRetentionMonths'], String(value))
  }
})

test('the shipped identity is reported incomplete until the publisher provides it', () => {
  assert.ok(Array.isArray(findMissingLegalFields(LEGAL_IDENTITY)))
})

test('the gate blocks a production build with missing fields', () => {
  const gate = evaluateLegalGate({}, 'production')
  assert.equal(gate.isBlocking, true)
  assert.ok(gate.message.includes('publisherName'))
})

test('the gate only warns outside production', () => {
  for (const environment of ['preview', 'development', undefined]) {
    const gate = evaluateLegalGate({}, environment)
    assert.equal(gate.isBlocking, false)
    assert.ok(gate.message.length > 0)
  }
})

test('the gate is silent and open when the identity is complete', () => {
  assert.deepEqual(evaluateLegalGate(COMPLETE, 'production'), { isBlocking: false, message: '' })
})
