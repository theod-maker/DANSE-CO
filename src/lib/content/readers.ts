import { prisma } from '../db.ts'
import {
  fallbackDisciplines,
  fallbackHomepage,
  fallbackInstructors,
  fallbackNews,
  fallbackPageTexts,
  fallbackPricing,
  fallbackRegistrationInfo,
  fallbackSchedule,
  fallbackSiteInfo,
  fallbackVenues,
  type DisciplineContent,
  type HomepageContent,
  type InstructorContent,
  type NewsContent,
  type PageTextsContent,
  type PricingContent,
  type RegistrationInfoContent,
  type ScheduleEntryContent,
  type SiteInfoContent,
  type VenueContent,
} from '../fallbackContent.ts'
import { unstable_cache } from 'next/cache'
import { readWithFallback } from './source.ts'
import { CONTENT_TAGS, type ContentTag } from './revalidate.ts'
import { HOMEPAGE_KEY, defaultSections, resolveSections, type ResolvedSection } from './sections.ts'

function cached<T>(tag: ContentTag, read: () => Promise<T | null>): () => Promise<T | null> {
  return unstable_cache(read, [CONTENT_TAGS[tag]], { tags: [CONTENT_TAGS[tag]] })
}

const SINGLETON_ID = 'singleton'

const DAY_ORDER = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
  'Samedi (Stages)',
]

function optional(value: string | null): string | undefined {
  return value ?? undefined
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function dayRank(day: string): number {
  const index = DAY_ORDER.indexOf(day)
  return index === -1 ? DAY_ORDER.length : index
}

function startMinutes(time: string): number {
  const [start = ''] = time.split(' - ')
  const match = start.trim().match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return Number.MAX_SAFE_INTEGER
  return Number(match[1]) * 60 + Number(match[2])
}

export function readHomepage(): Promise<HomepageContent> {
  return readWithFallback('accueil', cached('homepage', async () => {
    const row = await prisma.homepage.findUnique({ where: { id: SINGLETON_ID } })
    if (!row) return null

    return {
      heroImageUrl: optional(row.heroImageUrl),
      heroTagline: optional(row.heroTagline),
      heroTitle: row.heroTitle,
      heroDescription: row.heroDescription,
      aboutTitle: row.aboutTitle,
      philosophyTitle: row.philosophyTitle,
      philosophyBlock1Label: row.philosophyBlock1Label,
      philosophyBlock1Text: row.philosophyBlock1Text,
      philosophyBlock2Label: row.philosophyBlock2Label,
      philosophyBlock2Text: row.philosophyBlock2Text,
      philosophyImageUrl: optional(row.philosophyImageUrl),
      featuredVideoDescription: row.featuredVideoDescription,
      featuredImageUrl: optional(row.featuredImageUrl),
      featuredSectionLabel: optional(row.featuredSectionLabel),
      servicesSectionTitle: row.servicesSectionTitle,
      servicesSectionSubtitle: row.servicesSectionSubtitle,
      servicesCard1Description: row.servicesCard1Description,
      servicesCard1ImageUrl: optional(row.servicesCard1ImageUrl),
      servicesCard2Description: row.servicesCard2Description,
      servicesCard2ImageUrl: optional(row.servicesCard2ImageUrl),
    }
  }), fallbackHomepage)
}

export function readSiteInfo(): Promise<SiteInfoContent> {
  return readWithFallback('informations du site', cached('siteInfo', async () => {
    const row = await prisma.siteInfo.findUnique({ where: { id: SINGLETON_ID } })
    if (!row) return null

    return {
      phone: row.phone,
      email: row.email,
      mailingAddress: row.mailingAddress,
      instagramUrl: row.instagramUrl,
      facebookUrl: row.facebookUrl,
      twitterUrl: row.twitterUrl,
      websiteUrl: row.websiteUrl,
      season: row.season,
      footerTagline: row.footerTagline,
    }
  }), fallbackSiteInfo)
}

export function readPageTexts(): Promise<PageTextsContent> {
  return readWithFallback('textes des pages', cached('pageTexts', async () => {
    const row = await prisma.pageTexts.findUnique({ where: { id: SINGLETON_ID } })
    if (!row) return null

    return {
      planningSubtitle: row.planningSubtitle,
      disciplinesSubtitle: row.disciplinesSubtitle,
      locationsSubtitle: row.locationsSubtitle,
      contactSubtitle: row.contactSubtitle,
      instructorsSubtitle: row.instructorsSubtitle,
      pricingSubtitle: row.pricingSubtitle,
    }
  }), fallbackPageTexts)
}

export function readRegistrationInfo(): Promise<RegistrationInfoContent> {
  return readWithFallback('inscriptions', cached('registrationInfo', async () => {
    const row = await prisma.registrationInfo.findUnique({ where: { id: SINGLETON_ID } })
    if (!row) return null

    return {
      permanence1Days: row.permanence1Days,
      permanence1Hours: row.permanence1Hours,
      permanence1Venue: row.permanence1Venue,
      permanence2Days: row.permanence2Days,
      permanence2Hours: row.permanence2Hours,
      permanence2Venue: row.permanence2Venue,
      requiredDocuments: row.requiredDocuments,
      photoNote: row.photoNote,
    }
  }), fallbackRegistrationInfo)
}

export function readPricing(): Promise<PricingContent> {
  return readWithFallback('tarifs', cached('pricing', async () => {
    const row = await prisma.pricing.findUnique({
      where: { id: SINGLETON_ID },
      include: { rows: { orderBy: { displayOrder: 'asc' } } },
    })
    if (!row) return null

    return {
      season: row.season,
      membershipFee: row.membershipFee,
      infoItems: row.infoItems,
      rows: row.rows.map((entry) => ({
        label: entry.label,
        price: entry.price,
        detail: entry.detail,
        highlight: entry.highlight || undefined,
      })),
    }
  }), fallbackPricing)
}

export function readInstructors(): Promise<InstructorContent[]> {
  return readWithFallback('professeurs', cached('instructors', async () => {
    const rows = await prisma.instructor.findMany({ orderBy: { displayOrder: 'asc' } })

    return rows.map((row) => ({
      _id: row.id,
      name: row.name,
      specialty: row.specialty,
      bio: row.bio,
      experience: row.experience,
      photoUrl: optional(row.photoUrl),
    }))
  }), fallbackInstructors)
}

export function readDisciplines(): Promise<DisciplineContent[]> {
  return readWithFallback('disciplines', cached('disciplines', async () => {
    const rows = await prisma.discipline.findMany({ orderBy: { displayOrder: 'asc' } })

    return rows.map((row) => ({
      _id: row.id,
      title: row.title,
      iconName: row.iconName,
      description: row.description,
      benefits: row.benefits,
      imageUrl: optional(row.imageUrl),
    }))
  }), fallbackDisciplines)
}

export function readVenues(): Promise<VenueContent[]> {
  return readWithFallback('salles', cached('venues', async () => {
    const rows = await prisma.venue.findMany({ orderBy: { displayOrder: 'asc' } })

    return rows.map((row) => ({
      _id: row.id,
      name: row.name,
      address: row.address,
      description: row.description,
      amenities: row.amenities,
      mapEmbedUrl: row.mapEmbedUrl,
      googleMapsUrl: row.googleMapsUrl,
      imageUrl: optional(row.imageUrl),
    }))
  }), fallbackVenues)
}

export function readSchedule(): Promise<ScheduleEntryContent[]> {
  return readWithFallback('planning', cached('schedule', async () => {
    const rows = await prisma.scheduleEntry.findMany()

    return [...rows]
      .sort((a, b) => dayRank(a.day) - dayRank(b.day) || startMinutes(a.time) - startMinutes(b.time))
      .map((row) => ({
        _id: row.id,
        name: row.name,
        day: row.day,
        time: row.time,
        venue: optional(row.venue),
        level: row.level,
      }))
  }), fallbackSchedule)
}

export function readNews(): Promise<NewsContent[]> {
  return readWithFallback('actualités', cached('news', async () => {
    const rows = await prisma.news.findMany({ orderBy: { date: 'asc' } })

    return rows.map((row) => ({
      _id: row.id,
      title: row.title,
      date: toIsoDate(row.date),
      imageUrl: optional(row.imageUrl),
      excerpt: row.excerpt,
      link: optional(row.link),
    }))
  }), fallbackNews)
}

export function readHomepageSections(): Promise<ResolvedSection[]> {
  return readWithFallback(
    'sections',
    cached('sections', async () => {
      const stored = await prisma.pageSection.findMany({
        where: { pageKey: HOMEPAGE_KEY },
        orderBy: { displayOrder: 'asc' },
      })
      return resolveSections(stored)
    }),
    defaultSections()
  )
}
