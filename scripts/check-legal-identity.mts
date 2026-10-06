import { evaluateLegalGate, LEGAL_IDENTITY } from '../src/lib/legal/legal-identity.ts'

const gate = evaluateLegalGate(LEGAL_IDENTITY, process.env.VERCEL_ENV)

if (gate.message !== '') {
  console.error(gate.isBlocking ? `ERREUR : ${gate.message}` : `Attention : ${gate.message}`)
}
process.exit(gate.isBlocking ? 1 : 0)
