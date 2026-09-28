import {
  MAXIMUM_LONG_TEXT,
  MAXIMUM_SHORT_TEXT,
  optionalImagePath,
  optionalText,
  requiredText,
} from '../_shared/validation.ts'

export interface HomepageInput {
  heroImageUrl: string | null
  heroTagline: string
  heroTitle: string
  heroDescription: string
  aboutTitle: string
  philosophyTitle: string
  philosophyBlock1Label: string
  philosophyBlock1Text: string
  philosophyBlock2Label: string
  philosophyBlock2Text: string
  philosophyImageUrl: string | null
  featuredSectionLabel: string
  featuredVideoDescription: string
  featuredImageUrl: string | null
  servicesSectionTitle: string
  servicesSectionSubtitle: string
  servicesCard1Description: string
  servicesCard1ImageUrl: string | null
  servicesCard2Description: string
  servicesCard2ImageUrl: string | null
}

export const HOMEPAGE_FIELDS: (keyof HomepageInput)[] = [
  'heroImageUrl',
  'heroTagline',
  'heroTitle',
  'heroDescription',
  'aboutTitle',
  'philosophyTitle',
  'philosophyBlock1Label',
  'philosophyBlock1Text',
  'philosophyBlock2Label',
  'philosophyBlock2Text',
  'philosophyImageUrl',
  'featuredSectionLabel',
  'featuredVideoDescription',
  'featuredImageUrl',
  'servicesSectionTitle',
  'servicesSectionSubtitle',
  'servicesCard1Description',
  'servicesCard1ImageUrl',
  'servicesCard2Description',
  'servicesCard2ImageUrl',
]

export type HomepageFieldErrors = Partial<Record<keyof HomepageInput, string>>

export interface HomepageValidationResult {
  data?: HomepageInput
  errors?: HomepageFieldErrors
}

const REQUIRED_FIELDS: [keyof HomepageInput, string, number][] = [
  ['heroTitle', 'Le titre principal', MAXIMUM_SHORT_TEXT],
  ['heroDescription', 'La description', MAXIMUM_LONG_TEXT],
  ['aboutTitle', 'Le titre de la section à propos', MAXIMUM_LONG_TEXT],
  ['philosophyTitle', 'Le titre de la philosophie', MAXIMUM_SHORT_TEXT],
  ['philosophyBlock1Label', 'Le libellé du premier bloc', MAXIMUM_SHORT_TEXT],
  ['philosophyBlock1Text', 'Le texte du premier bloc', MAXIMUM_LONG_TEXT],
  ['philosophyBlock2Label', 'Le libellé du second bloc', MAXIMUM_SHORT_TEXT],
  ['philosophyBlock2Text', 'Le texte du second bloc', MAXIMUM_LONG_TEXT],
  ['featuredVideoDescription', 'La description de la mise en avant', MAXIMUM_LONG_TEXT],
  ['servicesSectionTitle', 'Le titre de la section Nos cours', MAXIMUM_SHORT_TEXT],
  ['servicesSectionSubtitle', 'Le sous-titre de la section Nos cours', MAXIMUM_SHORT_TEXT],
  ['servicesCard1Description', 'La description de la première carte', MAXIMUM_LONG_TEXT],
  ['servicesCard2Description', 'La description de la seconde carte', MAXIMUM_LONG_TEXT],
]

const OPTIONAL_TEXT_FIELDS: [keyof HomepageInput, string][] = [
  ['heroTagline', "La phrase d'accroche"],
  ['featuredSectionLabel', 'Le libellé de la section mise en avant'],
]

const IMAGE_FIELDS: (keyof HomepageInput)[] = [
  'heroImageUrl',
  'philosophyImageUrl',
  'featuredImageUrl',
  'servicesCard1ImageUrl',
  'servicesCard2ImageUrl',
]

export function validateHomepageInput(
  raw: Record<keyof HomepageInput, string>
): HomepageValidationResult {
  const errors: HomepageFieldErrors = {}
  const values: Record<string, unknown> = {}

  for (const [field, label, maximum] of REQUIRED_FIELDS) {
    const result = requiredText(raw[field], label, maximum)
    if ('error' in result) errors[field] = result.error
    else values[field] = result.value
  }

  for (const [field, label] of OPTIONAL_TEXT_FIELDS) {
    const result = optionalText(raw[field], label, MAXIMUM_SHORT_TEXT)
    if ('error' in result) errors[field] = result.error
    else values[field] = result.value
  }

  for (const field of IMAGE_FIELDS) {
    const result = optionalImagePath(raw[field])
    if ('error' in result) errors[field] = result.error
    else values[field] = result.value
  }

  if (Object.keys(errors).length > 0) return { errors }

  return { data: values as unknown as HomepageInput }
}
