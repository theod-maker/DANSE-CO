import { optionalImagePath } from '../_shared/validation.ts'

export interface NewsInput {
  title: string
  date: Date
  excerpt: string
  imageUrl: string | null
  link: string | null
}

export interface NewsFieldErrors {
  title?: string
  date?: string
  excerpt?: string
  imageUrl?: string
  link?: string
}

export interface NewsValidationResult {
  data?: NewsInput
  errors?: NewsFieldErrors
}

const MAXIMUM_TITLE_LENGTH = 200
const MAXIMUM_EXCERPT_LENGTH = 2000
const MAXIMUM_URL_LENGTH = 2048
const EARLIEST_YEAR = 1900
const LATEST_YEAR = 2200

function isSafeUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value)
    return protocol === 'https:' || protocol === 'http:'
  } catch {
    return false
  }
}

function normalizeOptionalUrl(raw: string, errors: NewsFieldErrors, field: 'imageUrl' | 'link'): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  if (trimmed.length > MAXIMUM_URL_LENGTH) {
    errors[field] = `Adresse trop longue (${MAXIMUM_URL_LENGTH} caractères maximum).`
    return null
  }

  if (!isSafeUrl(trimmed)) {
    errors[field] = 'Adresse invalide. Elle doit commencer par http:// ou https://'
    return null
  }

  return new URL(trimmed).href
}

export function validateNewsInput(raw: {
  title: string
  date: string
  excerpt: string
  imageUrl: string
  link: string
}): NewsValidationResult {
  const errors: NewsFieldErrors = {}

  const title = raw.title.trim()
  if (!title) {
    errors.title = 'Le titre est obligatoire.'
  } else if (title.length > MAXIMUM_TITLE_LENGTH) {
    errors.title = `Le titre est trop long (${MAXIMUM_TITLE_LENGTH} caractères maximum).`
  }

  const excerpt = raw.excerpt.trim()
  if (!excerpt) {
    errors.excerpt = 'Le résumé est obligatoire.'
  } else if (excerpt.length > MAXIMUM_EXCERPT_LENGTH) {
    errors.excerpt = `Le résumé est trop long (${MAXIMUM_EXCERPT_LENGTH} caractères maximum).`
  }

  const rawDate = raw.date.trim()
  let date: Date | null = null
  if (!rawDate) {
    errors.date = "La date de l'événement est obligatoire."
  } else {
    const parsed = new Date(rawDate)
    if (Number.isNaN(parsed.getTime())) {
      errors.date = 'Date invalide.'
    } else if (parsed.getFullYear() < EARLIEST_YEAR || parsed.getFullYear() > LATEST_YEAR) {
      errors.date = `La date doit se situer entre ${EARLIEST_YEAR} et ${LATEST_YEAR}.`
    } else {
      date = parsed
    }
  }

  const imagePath = optionalImagePath(raw.imageUrl)
  if ('error' in imagePath) errors.imageUrl = imagePath.error
  const imageUrl = 'value' in imagePath ? imagePath.value : null

  const link = normalizeOptionalUrl(raw.link, errors, 'link')

  if (Object.keys(errors).length > 0) return { errors }

  return { data: { title, date: date as Date, excerpt, imageUrl, link } }
}
