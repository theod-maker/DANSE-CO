import { MAXIMUM_SHORT_TEXT, optionalText, requiredText } from '../_shared/validation.ts'

export const KNOWN_DAYS = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
  'Samedi (Stages)',
] as const

export const KNOWN_LEVELS = [
  'Tous niveaux',
  'Débutant',
  'Intermédiaire',
  'Pré-ados',
  'Ados',
  'Adultes',
  'Enfants',
] as const

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/

export interface CourseInput {
  name: string
  day: string
  time: string
  level: string
  venue: string | null
}

export interface CourseFieldErrors {
  name?: string
  day?: string
  time?: string
  level?: string
  venue?: string
}

export interface CourseValidationResult {
  data?: CourseInput
  errors?: CourseFieldErrors
}

export function composeTimeRange(start: string, end: string): string {
  return `${start} - ${end}`
}

export function splitTimeRange(range: string): { start: string; end: string } {
  const [start = '', end = ''] = range.split(' - ').map((part) => part.trim())
  return { start, end }
}

export function startMinutes(range: string): number {
  const { start } = splitTimeRange(range)
  if (!TIME_PATTERN.test(start)) return Number.MAX_SAFE_INTEGER
  const [hours, minutes] = start.split(':').map(Number)
  return hours * 60 + minutes
}

export function dayRank(day: string): number {
  const index = (KNOWN_DAYS as readonly string[]).indexOf(day)
  return index === -1 ? KNOWN_DAYS.length : index
}

export function validateCourseInput(raw: {
  name: string
  day: string
  startTime: string
  endTime: string
  level: string
  venue: string
}): CourseValidationResult {
  const errors: CourseFieldErrors = {}

  const name = requiredText(raw.name, 'Le nom du cours', MAXIMUM_SHORT_TEXT)
  if ('error' in name) errors.name = name.error

  const day = requiredText(raw.day, 'Le jour', MAXIMUM_SHORT_TEXT)
  if ('error' in day) errors.day = day.error

  const level = requiredText(raw.level, 'Le niveau', MAXIMUM_SHORT_TEXT)
  if ('error' in level) errors.level = level.error

  const start = raw.startTime.trim()
  const end = raw.endTime.trim()
  if (!start || !end) {
    errors.time = "L'heure de début et l'heure de fin sont obligatoires."
  } else if (!TIME_PATTERN.test(start) || !TIME_PATTERN.test(end)) {
    errors.time = 'Horaire invalide.'
  }

  const venue = optionalText(raw.venue, 'La salle', MAXIMUM_SHORT_TEXT)
  if ('error' in venue) errors.venue = venue.error

  if (Object.keys(errors).length > 0) return { errors }

  const venueValue = (venue as { value: string }).value

  return {
    data: {
      name: (name as { value: string }).value,
      day: (day as { value: string }).value,
      time: composeTimeRange(start, end),
      level: (level as { value: string }).value,
      venue: venueValue || null,
    },
  }
}
