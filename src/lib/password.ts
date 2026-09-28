import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'

export const MINIMUM_PASSWORD_LENGTH = 12

export function validateNewPassword(newPassword: string, confirmation: string): string | null {
  if (!newPassword || !confirmation) {
    return 'Tous les champs sont obligatoires.'
  }
  if (newPassword.length < MINIMUM_PASSWORD_LENGTH) {
    return `Le nouveau mot de passe doit faire au moins ${MINIMUM_PASSWORD_LENGTH} caractères.`
  }
  if (newPassword !== confirmation) {
    return 'Le nouveau mot de passe et sa confirmation diffèrent.'
  }
  return null
}

export function validatePasswordChange(
  currentPassword: string,
  newPassword: string,
  confirmation: string
): string | null {
  if (!currentPassword) {
    return 'Tous les champs sont obligatoires.'
  }
  const newPasswordError = validateNewPassword(newPassword, confirmation)
  if (newPasswordError) return newPasswordError
  if (newPassword === currentPassword) {
    return 'Le nouveau mot de passe doit être différent de l’actuel.'
  }
  return null
}

const MAXIMUM_SCRYPT_COST = 2 ** 20
const MAXIMUM_SCRYPT_BLOCK_SIZE = 32
const MAXIMUM_SCRYPT_PARALLELIZATION = 16

const SCRYPT_COST = 16384
const SCRYPT_BLOCK_SIZE = 8
const SCRYPT_PARALLELIZATION = 1
const KEY_LENGTH = 64
const SALT_LENGTH = 16

interface ScryptParameters {
  cost: number
  blockSize: number
  parallelization: number
}

function derive(password: string, salt: Buffer, parameters: ScryptParameters): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(
      password,
      salt,
      KEY_LENGTH,
      {
        N: parameters.cost,
        r: parameters.blockSize,
        p: parameters.parallelization,
        maxmem: 128 * parameters.cost * parameters.blockSize * 2,
      },
      (error, derivedKey) => {
        if (error) reject(error)
        else resolve(derivedKey)
      }
    )
  })
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH)
  const parameters: ScryptParameters = {
    cost: SCRYPT_COST,
    blockSize: SCRYPT_BLOCK_SIZE,
    parallelization: SCRYPT_PARALLELIZATION,
  }
  const derivedKey = await derive(password, salt, parameters)

  return [
    'scrypt',
    parameters.cost,
    parameters.blockSize,
    parameters.parallelization,
    salt.toString('base64'),
    derivedKey.toString('base64'),
  ].join('$')
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const segments = storedHash.split('$')
  if (segments.length !== 6 || segments[0] !== 'scrypt') return false

  const cost = Number(segments[1])
  const blockSize = Number(segments[2])
  const parallelization = Number(segments[3])
  if (!Number.isInteger(cost) || !Number.isInteger(blockSize) || !Number.isInteger(parallelization)) {
    return false
  }

  if (cost < 2 || cost > MAXIMUM_SCRYPT_COST || (cost & (cost - 1)) !== 0) return false
  if (blockSize < 1 || blockSize > MAXIMUM_SCRYPT_BLOCK_SIZE) return false
  if (parallelization < 1 || parallelization > MAXIMUM_SCRYPT_PARALLELIZATION) return false

  const salt = Buffer.from(segments[4], 'base64')
  const expectedKey = Buffer.from(segments[5], 'base64')
  if (expectedKey.length !== KEY_LENGTH) return false

  const derivedKey = await derive(password, salt, { cost, blockSize, parallelization })

  return timingSafeEqual(derivedKey, expectedKey)
}
