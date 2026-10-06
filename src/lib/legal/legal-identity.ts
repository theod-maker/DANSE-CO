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

export const LEGAL_IDENTITY: Partial<LegalIdentity> = {}

const PROVISIONAL_TEXT = /^(à compléter|a completer|todo|tbd|x+|\?+)$/i
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
