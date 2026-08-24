import {
  MAXIMUM_BIOGRAPHY,
  MAXIMUM_SHORT_TEXT,
  optionalImagePath,
  optionalText,
  requiredText,
} from '../_shared/validation'

export interface InstructorInput {
  name: string
  specialty: string
  bio: string
  experience: string
  photoUrl: string | null
}

export interface InstructorFieldErrors {
  name?: string
  specialty?: string
  bio?: string
  experience?: string
  photoUrl?: string
}

export interface InstructorValidationResult {
  data?: InstructorInput
  errors?: InstructorFieldErrors
}

export function validateInstructorInput(raw: {
  name: string
  specialty: string
  bio: string
  experience: string
  photoUrl: string
}): InstructorValidationResult {
  const errors: InstructorFieldErrors = {}

  const name = requiredText(raw.name, 'Le nom', MAXIMUM_SHORT_TEXT)
  if ('error' in name) errors.name = name.error

  const specialty = requiredText(raw.specialty, 'La spécialité', MAXIMUM_SHORT_TEXT)
  if ('error' in specialty) errors.specialty = specialty.error

  const bio = requiredText(raw.bio, 'La biographie', MAXIMUM_BIOGRAPHY)
  if ('error' in bio) errors.bio = bio.error

  const experience = optionalText(raw.experience, "L'expérience", MAXIMUM_SHORT_TEXT)
  if ('error' in experience) errors.experience = experience.error

  const photoUrl = optionalImagePath(raw.photoUrl)
  if ('error' in photoUrl) errors.photoUrl = photoUrl.error

  if (Object.keys(errors).length > 0) return { errors }

  return {
    data: {
      name: (name as { value: string }).value,
      specialty: (specialty as { value: string }).value,
      bio: (bio as { value: string }).value,
      experience: (experience as { value: string }).value,
      photoUrl: (photoUrl as { value: string | null }).value,
    },
  }
}
