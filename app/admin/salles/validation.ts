import {
  MAXIMUM_LONG_TEXT,
  MAXIMUM_SHORT_TEXT,
  cleanStringList,
  optionalImagePath,
  optionalMapEmbedUrl,
  optionalUrl,
  requiredText,
} from '../_shared/validation'

export interface VenueInput {
  name: string
  address: string
  description: string
  amenities: string[]
  mapEmbedUrl: string
  googleMapsUrl: string
  imageUrl: string | null
}

export interface VenueFieldErrors {
  name?: string
  address?: string
  description?: string
  mapEmbedUrl?: string
  googleMapsUrl?: string
  imageUrl?: string
}

export interface VenueValidationResult {
  data?: VenueInput
  errors?: VenueFieldErrors
}

export function validateVenueInput(raw: {
  name: string
  address: string
  description: string
  amenities: string[]
  mapEmbedUrl: string
  googleMapsUrl: string
  imageUrl: string
}): VenueValidationResult {
  const errors: VenueFieldErrors = {}

  const name = requiredText(raw.name, 'Le nom', MAXIMUM_SHORT_TEXT)
  if ('error' in name) errors.name = name.error

  const address = requiredText(raw.address, "L'adresse", MAXIMUM_SHORT_TEXT)
  if ('error' in address) errors.address = address.error

  const description = requiredText(raw.description, 'La description', MAXIMUM_LONG_TEXT)
  if ('error' in description) errors.description = description.error

  const mapEmbedUrl = optionalMapEmbedUrl(raw.mapEmbedUrl)
  if ('error' in mapEmbedUrl) errors.mapEmbedUrl = mapEmbedUrl.error

  const googleMapsUrl = optionalUrl(raw.googleMapsUrl)
  if ('error' in googleMapsUrl) errors.googleMapsUrl = googleMapsUrl.error

  const imageUrl = optionalImagePath(raw.imageUrl)
  if ('error' in imageUrl) errors.imageUrl = imageUrl.error

  if (Object.keys(errors).length > 0) return { errors }

  return {
    data: {
      name: (name as { value: string }).value,
      address: (address as { value: string }).value,
      description: (description as { value: string }).value,
      amenities: cleanStringList(raw.amenities, MAXIMUM_SHORT_TEXT),
      mapEmbedUrl: (mapEmbedUrl as { value: string | null }).value ?? '',
      googleMapsUrl: (googleMapsUrl as { value: string | null }).value ?? '',
      imageUrl: (imageUrl as { value: string | null }).value,
    },
  }
}
