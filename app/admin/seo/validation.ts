import { optionalText, optionalImagePath } from '../_shared/validation.ts'
import { SEO_PAGES, type PageSeoFields } from '../../../src/lib/content/seoPages.ts'

export const SEO_TITLE_MAXIMUM = 120
export const SEO_DESCRIPTION_MAXIMUM = 320

export const SEO_TITLE_ADVISORY = 60
export const SEO_DESCRIPTION_ADVISORY = 155

export type SeoPagesInput = Record<string, PageSeoFields>
export type SeoFieldErrors = Partial<Record<string, string>>

export interface SeoValidationResult {
  data?: SeoPagesInput
  errors?: SeoFieldErrors
}

export function validateSeoInput(raw: SeoPagesInput): SeoValidationResult {
  const errors: SeoFieldErrors = {}
  const values: SeoPagesInput = {}

  for (const { key, label } of SEO_PAGES) {
    const entry = raw[key] ?? { title: '', description: '', imageUrl: null }

    const title = optionalText(entry.title, `Titre de la page ${label}`, SEO_TITLE_MAXIMUM)
    if ('error' in title) errors[`${key}.title`] = title.error

    const description = optionalText(
      entry.description,
      `Description de la page ${label}`,
      SEO_DESCRIPTION_MAXIMUM
    )
    if ('error' in description) errors[`${key}.description`] = description.error

    const imageUrl = optionalImagePath(entry.imageUrl ?? '')
    if ('error' in imageUrl) errors[`${key}.imageUrl`] = imageUrl.error

    if (!('error' in title) && !('error' in description) && !('error' in imageUrl)) {
      values[key] = { title: title.value, description: description.value, imageUrl: imageUrl.value }
    }
  }

  if (Object.keys(errors).length > 0) return { errors }

  return { data: values }
}
