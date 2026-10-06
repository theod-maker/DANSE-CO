export type RegistrationKind = 'RNA' | 'SIREN' | 'SIRET'

export interface LegalIdentity {
  publisherName: string
  legalForm: string
  registrationKind: RegistrationKind
  registrationNumber: string
  headOfficeAddress: string
  publicationDirector: string
  contactEmail: string
  contactPhone: string
  databaseHostName: string
  dataRegion: string
  contactRetention: string
  formspreeTransferSafeguard: string
  analyticsRetentionMonths: number
}

export const HOSTING_PROVIDER = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
} as const

export const LEGAL_IDENTITY: Partial<LegalIdentity> = {
  publisherName: 'Dans’&Co',
  legalForm: 'association déclarée, régie par la loi du 1er juillet 1901',
  registrationKind: 'RNA',
  registrationNumber: 'W443004723',
  headOfficeAddress: '17 rue du Chevecier, 44730 Saint-Michel-Chef-Chef',
  contactEmail: 'dansandco@outlook.fr',
  contactPhone: '06 17 09 93 49',
  databaseHostName: 'Neon',
  dataRegion: 'Londres, Royaume-Uni (AWS eu-west-2)',
  contactRetention: '12 mois après votre dernier message',
  formspreeTransferSafeguard: 'clauses contractuelles types, selon la documentation de Formspree',
  analyticsRetentionMonths: 12,
}

const PROVISIONAL_TEXT = /à compléter|a completer|\btodo\b|\btbd\b|\bn\/a\b|^x+$|^\?+$/i
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REGISTRATION_PATTERNS: Record<RegistrationKind, RegExp> = {
  RNA: /^W\d{9}$/,
  SIREN: /^\d{9}$/,
  SIRET: /^\d{14}$/,
}

const TEXT_FIELDS = [
  'publisherName',
  'legalForm',
  'headOfficeAddress',
  'publicationDirector',
  'contactPhone',
  'databaseHostName',
  'dataRegion',
  'contactRetention',
  'formspreeTransferSafeguard',
] as const satisfies readonly (keyof LegalIdentity)[]

function isFilledText(value: unknown): boolean {
  return typeof value === 'string' && value.trim() !== '' && !PROVISIONAL_TEXT.test(value.trim())
}

export function findMissingLegalFields(identity: Partial<LegalIdentity>): string[] {
  const missing: string[] = []
  for (const field of TEXT_FIELDS) {
    if (!isFilledText(identity[field])) {
      missing.push(field)
    }
  }
  if (!isFilledText(identity.contactEmail) || !EMAIL_PATTERN.test(identity.contactEmail ?? '')) {
    missing.push('contactEmail')
  }
  const kind = identity.registrationKind
  const number = identity.registrationNumber
  const isKindValid = kind !== undefined && kind in REGISTRATION_PATTERNS
  if (!isKindValid) {
    missing.push('registrationKind')
  }
  const isNumberValid = isKindValid ? REGISTRATION_PATTERNS[kind].test(number ?? '') : Boolean(number)
  if (!isNumberValid) {
    missing.push('registrationNumber')
  }
  const months = identity.analyticsRetentionMonths
  if (typeof months !== 'number' || !Number.isInteger(months) || months < 1) {
    missing.push('analyticsRetentionMonths')
  }
  return missing
}

export interface LegalGate {
  isBlocking: boolean
  message: string
}

export function evaluateLegalGate(
  identity: Partial<LegalIdentity>,
  vercelEnvironment: string | undefined
): LegalGate {
  const missing = findMissingLegalFields(identity)
  if (missing.length === 0) {
    return { isBlocking: false, message: '' }
  }
  const message = `Informations légales incomplètes (${missing.join(', ')}) : mentions légales et politique de confidentialité à compléter dans src/lib/legal/legal-identity.ts`
  return { isBlocking: vercelEnvironment === 'production', message }
}

export function legalValue(identity: Partial<LegalIdentity>, field: keyof LegalIdentity): string {
  const value = identity[field]
  return value === undefined || value === '' ? `[à compléter : ${field}]` : String(value)
}
