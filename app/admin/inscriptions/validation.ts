import {
  MAXIMUM_LONG_TEXT,
  MAXIMUM_SHORT_TEXT,
  cleanStringList,
  requiredText,
} from '../_shared/validation.ts'

export interface RegistrationInput {
  permanence1Days: string
  permanence1Hours: string
  permanence1Venue: string
  permanence2Days: string
  permanence2Hours: string
  permanence2Venue: string
  requiredDocuments: string[]
  photoNote: string
}

export type RegistrationFieldErrors = Partial<
  Record<Exclude<keyof RegistrationInput, 'requiredDocuments'>, string>
>

export interface RegistrationValidationResult {
  data?: RegistrationInput
  errors?: RegistrationFieldErrors
}

const TEXT_FIELDS: [Exclude<keyof RegistrationInput, 'requiredDocuments'>, string][] = [
  ['permanence1Days', 'Les jours de la première permanence'],
  ['permanence1Hours', 'Les horaires de la première permanence'],
  ['permanence1Venue', 'Le lieu de la première permanence'],
  ['permanence2Days', 'Les jours de la seconde permanence'],
  ['permanence2Hours', 'Les horaires de la seconde permanence'],
  ['permanence2Venue', 'Le lieu de la seconde permanence'],
  ['photoNote', 'La note sur la photo'],
]

export function validateRegistrationInput(raw: {
  permanence1Days: string
  permanence1Hours: string
  permanence1Venue: string
  permanence2Days: string
  permanence2Hours: string
  permanence2Venue: string
  requiredDocuments: string[]
  photoNote: string
}): RegistrationValidationResult {
  const errors: RegistrationFieldErrors = {}
  const values: Partial<RegistrationInput> = {}

  for (const [field, label] of TEXT_FIELDS) {
    const maximum = field === 'photoNote' ? MAXIMUM_LONG_TEXT : MAXIMUM_SHORT_TEXT
    const result = requiredText(raw[field], label, maximum)
    if ('error' in result) errors[field] = result.error
    else values[field] = result.value
  }

  if (Object.keys(errors).length > 0) return { errors }

  return {
    data: {
      ...(values as Omit<RegistrationInput, 'requiredDocuments'>),
      requiredDocuments: cleanStringList(raw.requiredDocuments, MAXIMUM_LONG_TEXT),
    },
  }
}
