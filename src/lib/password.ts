import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'

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

  const salt = Buffer.from(segments[4], 'base64')
  const expectedKey = Buffer.from(segments[5], 'base64')
  if (expectedKey.length !== KEY_LENGTH) return false

  const derivedKey = await derive(password, salt, { cost, blockSize, parallelization })

  return timingSafeEqual(derivedKey, expectedKey)
}
