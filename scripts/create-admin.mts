import { createInterface, type Interface } from 'node:readline'
import { stdin, stdout } from 'node:process'
import { config } from 'dotenv'
import { hashPassword } from '../src/lib/password.ts'

config({ path: '.env.local' })

const { prisma } = await import('../src/lib/db.ts')

const MINIMUM_PASSWORD_LENGTH = 12

interface MaskableInterface extends Interface {
  _writeToOutput?: (message: string) => void
}

function ask(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const readline = createInterface({ input: stdin, output: stdout }) as MaskableInterface

    readline.question(question, (answer) => {
      if (hidden) stdout.write('\n')
      readline.close()
      resolve(answer.trim())
    })

    if (hidden) {
      readline._writeToOutput = (message: string) => {
        if (message.includes(question)) stdout.write(question)
      }
    }
  })
}

async function resolveField(variableName: string, question: string, hidden = false): Promise<string> {
  const fromEnvironment = process.env[variableName]
  if (fromEnvironment) return fromEnvironment.trim()
  return ask(question, hidden)
}

async function main(): Promise<void> {
  const username = await resolveField('ADMIN_USERNAME', 'Identifiant de connexion : ')
  const displayName = await resolveField('ADMIN_DISPLAY_NAME', 'Nom affiché : ')

  if (!username || !displayName) {
    throw new Error("L'identifiant et le nom affiché sont obligatoires")
  }

  const password = await resolveField('ADMIN_PASSWORD', 'Mot de passe : ', true)

  if (password.length < MINIMUM_PASSWORD_LENGTH) {
    throw new Error(`Le mot de passe doit faire au moins ${MINIMUM_PASSWORD_LENGTH} caractères`)
  }

  const passwordHash = await hashPassword(password)

  const account = await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash, displayName },
    create: { username, passwordHash, displayName },
  })

  console.log(`Compte enregistré : ${account.username} (${account.displayName})`)
}

try {
  await main()
} finally {
  await prisma.$disconnect()
}

process.exit(0)
