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

function optional(value: string | null | undefined): string | undefined {
  return value ?? undefined
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
    const row = await prisma.homepage.findUnique({
      where: { id: SINGLETON_ID },
      select: { publishedSnapshot: true },
    })
    const snapshot = row?.publishedSnapshot as HomepageContent | undefined
    if (!snapshot) return null

    return {
      heroImageUrl: optional(snapshot.heroImageUrl),
      heroTagline: optional(snapshot.heroTagline),
      heroTitle: snapshot.heroTitle,
      heroDescription: snapshot.heroDescription,
      aboutTitle: snapshot.aboutTitle,
      philosophyTitle: snapshot.philosophyTitle,
      philosophyBlock1Label: snapshot.philosophyBlock1Label,
      philosophyBlock1Text: snapshot.philosophyBlock1Text,
      philosophyBlock2Label: snapshot.philosophyBlock2Label,
      philosophyBlock2Text: snapshot.philosophyBlock2Text,
      philosophyImageUrl: optional(snapshot.philosophyImageUrl),
      featuredVideoDescription: snapshot.featuredVideoDescription,
      featuredImageUrl: optional(snapshot.featuredImageUrl),
      featuredSectionLabel: optional(snapshot.featuredSectionLabel),
      servicesSectionTitle: snapshot.servicesSectionTitle,
      servicesSectionSubtitle: snapshot.servicesSectionSubtitle,
      servicesCard1Description: snapshot.servicesCard1Description,
      servicesCard1ImageUrl: optional(snapshot.servicesCard1ImageUrl),
      servicesCard2Description: snapshot.servicesCard2Description,
      servicesCard2ImageUrl: optional(snapshot.servicesCard2ImageUrl),
    }
  }), fallbackHomepage)
}

export function readSiteInfo(): Promise<SiteInfoContent> {
  return readWithFallback('informations du site', cached('siteInfo', async () => {
    const row = await prisma.siteInfo.findUnique({
      where: { id: SINGLETON_ID },
      select: { publishedSnapshot: true },
    })
    const snapshot = row?.publishedSnapshot as SiteInfoContent | undefined
    if (!snapshot) return null

    return {
      phone: snapshot.phone,
      email: snapshot.email,
      mailingAddress: snapshot.mailingAddress,
      instagramUrl: snapshot.instagramUrl,
      facebookUrl: snapshot.facebookUrl,
      twitterUrl: snapshot.twitterUrl,
      websiteUrl: snapshot.websiteUrl,
      season: snapshot.season,
      footerTagline: snapshot.footerTagline,
    }
  }), fallbackSiteInfo)
}

export function readPageTexts(): Promise<PageTextsContent> {
  return readWithFallback('textes des pages', cached('pageTexts', async () => {
    const row = await prisma.pageTexts.findUnique({
      where: { id: SINGLETON_ID },
      select: { publishedSnapshot: true },
    })
    const snapshot = row?.publishedSnapshot as PageTextsContent | undefined
    if (!snapshot) return null

    return {
      planningSubtitle: snapshot.planningSubtitle,
      disciplinesSubtitle: snapshot.disciplinesSubtitle,
      locationsSubtitle: snapshot.locationsSubtitle,
      contactSubtitle: snapshot.contactSubtitle,
      instructorsSubtitle: snapshot.instructorsSubtitle,
      pricingSubtitle: snapshot.pricingSubtitle,
    }
  }), fallbackPageTexts)
}

export function readRegistrationInfo(): Promise<RegistrationInfoContent> {
  return readWithFallback('inscriptions', cached('registrationInfo', async () => {
    const row = await prisma.registrationInfo.findUnique({
      where: { id: SINGLETON_ID },
      select: { publishedSnapshot: true },
    })
    const snapshot = row?.publishedSnapshot as RegistrationInfoContent | undefined
    if (!snapshot) return null

    return {
      permanence1Days: snapshot.permanence1Days,
      permanence1Hours: snapshot.permanence1Hours,
      permanence1Venue: snapshot.permanence1Venue,
      permanence2Days: snapshot.permanence2Days,
      permanence2Hours: snapshot.permanence2Hours,
      permanence2Venue: snapshot.permanence2Venue,
      requiredDocuments: snapshot.requiredDocuments,
      photoNote: snapshot.photoNote,
    }
  }), fallbackRegistrationInfo)
}

interface PricingSnapshot {
  season: string
  membershipFee: string
  infoItems: string[]
  rows: { label: string; price: string; detail: string; highlight: boolean; displayOrder: number }[]
}

export function readPricing(): Promise<PricingContent> {
  return readWithFallback('tarifs', cached('pricing', async () => {
    const row = await prisma.pricing.findUnique({
      where: { id: SINGLETON_ID },
      select: { publishedSnapshot: true },
    })
    const snapshot = row?.publishedSnapshot as PricingSnapshot | undefined
    if (!snapshot) return null

    return {
      season: snapshot.season,
      membershipFee: snapshot.membershipFee,
      infoItems: snapshot.infoItems,
      rows: [...snapshot.rows]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((entry) => ({
          label: entry.label,
          price: entry.price,
          detail: entry.detail,
          highlight: entry.highlight || undefined,
        })),
    }
  }), fallbackPricing)
}

interface InstructorSnapshot {
  name: string
  specialty: string
  bio: string
  experience: string
  photoUrl: string | null
}

export function readInstructors(): Promise<InstructorContent[]> {
  return readWithFallback('professeurs', cached('instructors', async () => {
    const rows = await prisma.instructor.findMany({
      orderBy: { displayOrder: 'asc' },
      select: { id: true, publishedSnapshot: true },
    })

    return rows
      .filter((row) => row.publishedSnapshot !== null)
      .map((row) => {
        const snapshot = row.publishedSnapshot as unknown as InstructorSnapshot
        return {
          _id: row.id,
          name: snapshot.name,
          specialty: snapshot.specialty,
          bio: snapshot.bio,
          experience: snapshot.experience,
          photoUrl: optional(snapshot.photoUrl),
        }
      })
  }), fallbackInstructors)
}

interface DisciplineSnapshot {
  title: string
  iconName: 'Zap' | 'Star' | 'Heart' | 'Music' | 'Users'
  description: string
  benefits: string[]
  imageUrl: string | null
}

export function readDisciplines(): Promise<DisciplineContent[]> {
  return readWithFallback('disciplines', cached('disciplines', async () => {
    const rows = await prisma.discipline.findMany({
      orderBy: { displayOrder: 'asc' },
      select: { id: true, publishedSnapshot: true },
    })

    return rows
      .filter((row) => row.publishedSnapshot !== null)
      .map((row) => {
        const snapshot = row.publishedSnapshot as unknown as DisciplineSnapshot
        return {
          _id: row.id,
          title: snapshot.title,
          iconName: snapshot.iconName,
          description: snapshot.description,
          benefits: snapshot.benefits,
          imageUrl: optional(snapshot.imageUrl),
        }
      })
  }), fallbackDisciplines)
}

interface VenueSnapshot {
  name: string
  address: string
  description: string
  amenities: string[]
  mapEmbedUrl: string
  googleMapsUrl: string
  imageUrl: string | null
}

export function readVenues(): Promise<VenueContent[]> {
  return readWithFallback('salles', cached('venues', async () => {
    const rows = await prisma.venue.findMany({
      orderBy: { displayOrder: 'asc' },
      select: { id: true, publishedSnapshot: true },
    })

    return rows
      .filter((row) => row.publishedSnapshot !== null)
      .map((row) => {
        const snapshot = row.publishedSnapshot as unknown as VenueSnapshot
        return {
          _id: row.id,
          name: snapshot.name,
          address: snapshot.address,
          description: snapshot.description,
          amenities: snapshot.amenities,
          mapEmbedUrl: snapshot.mapEmbedUrl,
          googleMapsUrl: snapshot.googleMapsUrl,
          imageUrl: optional(snapshot.imageUrl),
        }
      })
  }), fallbackVenues)
}

interface ScheduleSnapshot {
  name: string
  day: string
  time: string
  venue: string | null
  level: string
}

export function readSchedule(): Promise<ScheduleEntryContent[]> {
  return readWithFallback('planning', cached('schedule', async () => {
    const rows = await prisma.scheduleEntry.findMany({
      select: { id: true, publishedSnapshot: true },
    })

    const published = rows
      .filter((row) => row.publishedSnapshot !== null)
      .map((row) => {
        const snapshot = row.publishedSnapshot as unknown as ScheduleSnapshot
        return {
          _id: row.id,
          name: snapshot.name,
          day: snapshot.day,
          time: snapshot.time,
          venue: optional(snapshot.venue),
          level: snapshot.level,
        }
      })

    return [...published].sort(
      (a, b) => dayRank(a.day) - dayRank(b.day) || startMinutes(a.time) - startMinutes(b.time)
    )
  }), fallbackSchedule)
}

interface NewsSnapshot {
  title: string
  date: string
  imageUrl: string | null
  excerpt: string
  link: string | null
}

export function readNews(): Promise<NewsContent[]> {
  return readWithFallback('actualités', cached('news', async () => {
    const rows = await prisma.news.findMany({
      select: { id: true, publishedSnapshot: true },
    })

    const published = rows
      .filter((row) => row.publishedSnapshot !== null)
      .map((row) => {
        const snapshot = row.publishedSnapshot as unknown as NewsSnapshot
        return {
          _id: row.id,
          title: snapshot.title,
          date: snapshot.date.slice(0, 10),
          imageUrl: optional(snapshot.imageUrl),
          excerpt: snapshot.excerpt,
          link: optional(snapshot.link),
        }
      })

    return [...published].sort((a, b) => a.date.localeCompare(b.date))
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
