import { MAXIMUM_LONG_TEXT, requiredText } from '../_shared/validation.ts'

export const PAGE_TEXT_FIELDS = [
  { key: 'planningSubtitle', label: 'Sous-titre de la page Planning' },
  { key: 'disciplinesSubtitle', label: 'Sous-titre de la page Disciplines' },
  { key: 'instructorsSubtitle', label: 'Sous-titre de la page Professeurs' },
  { key: 'locationsSubtitle', label: 'Sous-titre de la page Salles' },
  { key: 'pricingSubtitle', label: 'Sous-titre de la page Tarifs' },
  { key: 'contactSubtitle', label: 'Sous-titre de la page Contact' },
  { key: 'histoireSubtitle', label: 'Sous-titre de la page Histoire' },
] as const

export type PageTextKey = (typeof PAGE_TEXT_FIELDS)[number]['key']

export type PageTextsInput = Record<PageTextKey, string>
export type PageTextsFieldErrors = Partial<Record<PageTextKey, string>>

export interface PageTextsValidationResult {
  data?: PageTextsInput
  errors?: PageTextsFieldErrors
}

export function validatePageTextsInput(raw: PageTextsInput): PageTextsValidationResult {
  const errors: PageTextsFieldErrors = {}
  const values: Partial<PageTextsInput> = {}

  for (const { key, label } of PAGE_TEXT_FIELDS) {
    const result = requiredText(raw[key], label, MAXIMUM_LONG_TEXT)
    if ('error' in result) errors[key] = result.error
    else values[key] = result.value
  }

  if (Object.keys(errors).length > 0) return { errors }

  return { data: values as PageTextsInput }
}
