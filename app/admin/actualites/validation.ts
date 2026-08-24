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
  if (!isSafeUrl(trimmed)) {
    errors[field] = 'Adresse invalide. Elle doit commencer par http:// ou https://'
    return null
  }
  return trimmed
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
  if (!title) errors.title = 'Le titre est obligatoire.'

  const excerpt = raw.excerpt.trim()
  if (!excerpt) errors.excerpt = 'Le résumé est obligatoire.'

  const rawDate = raw.date.trim()
  let date: Date | null = null
  if (!rawDate) {
    errors.date = "La date de l'événement est obligatoire."
  } else {
    const parsed = new Date(rawDate)
    if (Number.isNaN(parsed.getTime())) {
      errors.date = 'Date invalide.'
    } else {
      date = parsed
    }
  }

  const imageUrl = normalizeOptionalUrl(raw.imageUrl, errors, 'imageUrl')
  const link = normalizeOptionalUrl(raw.link, errors, 'link')

  if (Object.keys(errors).length > 0) return { errors }

  return { data: { title, date: date as Date, excerpt, imageUrl, link } }
}
