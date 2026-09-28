import {
  MAXIMUM_LONG_TEXT,
  MAXIMUM_SHORT_TEXT,
  cleanStringList,
  optionalImagePath,
  requiredText,
} from '../_shared/validation.ts'

export const DISCIPLINE_ICONS = ['Zap', 'Star', 'Heart', 'Music', 'Users'] as const

export type DisciplineIconName = (typeof DISCIPLINE_ICONS)[number]

export interface DisciplineInput {
  title: string
  iconName: DisciplineIconName
  description: string
  benefits: string[]
  imageUrl: string | null
}

export interface DisciplineFieldErrors {
  title?: string
  iconName?: string
  description?: string
  imageUrl?: string
}

export interface DisciplineValidationResult {
  data?: DisciplineInput
  errors?: DisciplineFieldErrors
}

function isKnownIcon(value: string): value is DisciplineIconName {
  return (DISCIPLINE_ICONS as readonly string[]).includes(value)
}

export function validateDisciplineInput(raw: {
  title: string
  iconName: string
  description: string
  benefits: string[]
  imageUrl: string
}): DisciplineValidationResult {
  const errors: DisciplineFieldErrors = {}

  const title = requiredText(raw.title, 'Le titre', MAXIMUM_SHORT_TEXT)
  if ('error' in title) errors.title = title.error

  const description = requiredText(raw.description, 'La description', MAXIMUM_LONG_TEXT)
  if ('error' in description) errors.description = description.error

  if (!isKnownIcon(raw.iconName)) {
    errors.iconName = 'Choisissez une icône dans la liste proposée.'
  }

  const imageUrl = optionalImagePath(raw.imageUrl)
  if ('error' in imageUrl) errors.imageUrl = imageUrl.error

  if (Object.keys(errors).length > 0) return { errors }

  return {
    data: {
      title: (title as { value: string }).value,
      iconName: raw.iconName as DisciplineIconName,
      description: (description as { value: string }).value,
      benefits: cleanStringList(raw.benefits, MAXIMUM_SHORT_TEXT),
      imageUrl: (imageUrl as { value: string | null }).value,
    },
  }
}
