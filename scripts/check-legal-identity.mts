import { isPublicPosthogKey } from '../src/lib/analytics/public-key.ts'
import { evaluateLegalGate, LEGAL_IDENTITY } from '../src/lib/legal/legal-identity.ts'

const measurementKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
if (measurementKey && !isPublicPosthogKey(measurementKey)) {
  console.error('ERREUR : NEXT_PUBLIC_POSTHOG_KEY doit être une clé publique phc_, jamais une clé personnelle.')
  process.exit(1)
}

const gate = evaluateLegalGate(LEGAL_IDENTITY, process.env.VERCEL_ENV)

if (gate.message !== '') {
  console.error(gate.isBlocking ? `ERREUR : ${gate.message}` : `Attention : ${gate.message}`)
}
process.exit(gate.isBlocking ? 1 : 0)
