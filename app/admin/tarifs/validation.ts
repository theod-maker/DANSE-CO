import {
  MAXIMUM_LONG_TEXT,
  MAXIMUM_SHORT_TEXT,
  cleanStringList,
  optionalText,
  requiredText,
} from '../_shared/validation.ts'

export interface PricingRowInput {
  label: string
  price: string
  detail: string
  highlight: boolean
}

export interface PricingInput {
  season: string
  membershipFee: string
  infoItems: string[]
  rows: PricingRowInput[]
}

export interface PricingFieldErrors {
  season?: string
  membershipFee?: string
  rows?: string
}

export interface PricingValidationResult {
  data?: PricingInput
  errors?: PricingFieldErrors
}

export function validatePricingInput(raw: {
  season: string
  membershipFee: string
  infoItems: string[]
  rows: { label: string; price: string; detail: string; highlight: boolean }[]
}): PricingValidationResult {
  const errors: PricingFieldErrors = {}

  const season = requiredText(raw.season, 'La saison', MAXIMUM_SHORT_TEXT)
  if ('error' in season) errors.season = season.error

  const membershipFee = optionalText(raw.membershipFee, "Le montant d'adhésion", MAXIMUM_SHORT_TEXT)
  if ('error' in membershipFee) errors.membershipFee = membershipFee.error

  const rows: PricingRowInput[] = []
  for (const row of raw.rows) {
    const label = row.label.trim()
    const price = row.price.trim()
    if (!label && !price) continue

    if (!label || !price) {
      errors.rows = 'Chaque ligne doit avoir un libellé et un prix.'
      break
    }

    if (label.length > MAXIMUM_SHORT_TEXT || price.length > MAXIMUM_SHORT_TEXT) {
      errors.rows = `Libellé ou prix trop long (${MAXIMUM_SHORT_TEXT} caractères maximum).`
      break
    }

    rows.push({ label, price, detail: row.detail.trim(), highlight: row.highlight })
  }

  const highlighted = rows.filter((row) => row.highlight)
  if (highlighted.length > 1) {
    errors.rows = 'Une seule ligne peut être mise en avant.'
  }

  if (Object.keys(errors).length > 0) return { errors }

  return {
    data: {
      season: (season as { value: string }).value,
      membershipFee: (membershipFee as { value: string }).value,
      infoItems: cleanStringList(raw.infoItems, MAXIMUM_LONG_TEXT),
      rows,
    },
  }
}
