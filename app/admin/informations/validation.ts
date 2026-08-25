import {
  MAXIMUM_SHORT_TEXT,
  optionalUrl,
  requiredText,
} from '../_shared/validation.ts'

export interface SiteInfoInput {
  phone: string
  email: string
  mailingAddress: string
  instagramUrl: string
  facebookUrl: string
  twitterUrl: string
  websiteUrl: string
  season: string
  footerTagline: string
}

export type SiteInfoFieldErrors = Partial<Record<keyof SiteInfoInput, string>>

export interface SiteInfoValidationResult {
  data?: SiteInfoInput
  errors?: SiteInfoFieldErrors
}

const SOCIAL_FIELDS = ['instagramUrl', 'facebookUrl', 'twitterUrl', 'websiteUrl'] as const

export function validateSiteInfoInput(raw: Record<keyof SiteInfoInput, string>): SiteInfoValidationResult {
  const errors: SiteInfoFieldErrors = {}
  const values: Partial<SiteInfoInput> = {}

  const required: [keyof SiteInfoInput, string][] = [
    ['phone', 'Le téléphone'],
    ['email', 'Le courriel'],
    ['mailingAddress', "L'adresse postale"],
    ['season', 'La saison'],
    ['footerTagline', 'La phrase de pied de page'],
  ]

  for (const [field, label] of required) {
    const result = requiredText(raw[field], label, MAXIMUM_SHORT_TEXT)
    if ('error' in result) errors[field] = result.error
    else values[field] = result.value
  }

  for (const field of SOCIAL_FIELDS) {
    const result = optionalUrl(raw[field])
    if ('error' in result) errors[field] = result.error
    else values[field] = result.value ?? ''
  }

  if (Object.keys(errors).length > 0) return { errors }

  return { data: values as SiteInfoInput }
}
