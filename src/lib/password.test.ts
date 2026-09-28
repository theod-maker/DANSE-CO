import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateNewPassword, validatePasswordChange } from './password.ts'

test('a new password needs 12 characters and a matching confirmation', () => {
  assert.match(validateNewPassword('court', 'court') ?? '', /au moins 12/)
  assert.match(validateNewPassword('assez-long-1234', 'assez-long-1235') ?? '', /diffèrent/)
  assert.equal(validateNewPassword('assez-long-1234', 'assez-long-1234'), null)
})

test('changing a password still requires the current one and a different value', () => {
  assert.match(validatePasswordChange('', 'assez-long-1234', 'assez-long-1234') ?? '', /obligatoires/)
  assert.match(
    validatePasswordChange('assez-long-1234', 'assez-long-1234', 'assez-long-1234') ?? '',
    /différent/
  )
  assert.equal(
    validatePasswordChange('ancien-mot-de-passe', 'assez-long-1234', 'assez-long-1234'),
    null
  )
})
