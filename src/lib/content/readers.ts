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
import { isPreviewEnabled } from './preview.ts'
import { resolvePageBlocks, type PageBlockSource, type ResolvedBlock } from './pageBlocks.ts'
import { defaultPageBlocks } from './defaultBlocks.ts'
import { pageBlocksTag, type PageBlockPageKey } from './revalidate.ts'
import { defaultSeoMap, type PageSeoFields } from './seoPages.ts'

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

interface HomepageFields {
  heroImageUrl: string | null
  heroTagline: string | null
  heroTitle: string
  heroDescription: string
  aboutTitle: string
  philosophyTitle: string
  philosophyBlock1Label: string
  philosophyBlock1Text: string
  philosophyBlock2Label: string
  philosophyBlock2Text: string
  philosophyImageUrl: string | null
  featuredVideoDescription: string
  featuredImageUrl: string | null
  featuredSectionLabel: string | null
  servicesSectionTitle: string
  servicesSectionSubtitle: string
  servicesCard1Description: string
  servicesCard1ImageUrl: string | null
  servicesCard2Description: string
  servicesCard2ImageUrl: string | null
}

function toHomepageContent(fields: HomepageFields): HomepageContent {
  return {
    heroImageUrl: optional(fields.heroImageUrl),
    heroTagline: optional(fields.heroTagline),
    heroTitle: fields.heroTitle,
    heroDescription: fields.heroDescription,
    aboutTitle: fields.aboutTitle,
    philosophyTitle: fields.philosophyTitle,
    philosophyBlock1Label: fields.philosophyBlock1Label,
    philosophyBlock1Text: fields.philosophyBlock1Text,
    philosophyBlock2Label: fields.philosophyBlock2Label,
    philosophyBlock2Text: fields.philosophyBlock2Text,
    philosophyImageUrl: optional(fields.philosophyImageUrl),
    featuredVideoDescription: fields.featuredVideoDescription,
    featuredImageUrl: optional(fields.featuredImageUrl),
    featuredSectionLabel: optional(fields.featuredSectionLabel),
    servicesSectionTitle: fields.servicesSectionTitle,
    servicesSectionSubtitle: fields.servicesSectionSubtitle,
    servicesCard1Description: fields.servicesCard1Description,
    servicesCard1ImageUrl: optional(fields.servicesCard1ImageUrl),
    servicesCard2Description: fields.servicesCard2Description,
    servicesCard2ImageUrl: optional(fields.servicesCard2ImageUrl),
  }
}

async function readPublishedHomepage(): Promise<HomepageContent | null> {
  const row = await prisma.homepage.findUnique({
    where: { id: SINGLETON_ID },
    select: { publishedSnapshot: true },
  })
  const snapshot = row?.publishedSnapshot as HomepageFields | undefined
  return snapshot ? toHomepageContent(snapshot) : null
}
const readPublishedHomepageCached = cached('homepage', readPublishedHomepage)

async function readLiveHomepage(): Promise<HomepageContent | null> {
  const row = await prisma.homepage.findUnique({ where: { id: SINGLETON_ID } })
  return row ? toHomepageContent(row) : null
}

export function readHomepage(): Promise<HomepageContent> {
  return readWithFallback('accueil', async () => {
    if (await isPreviewEnabled()) return readLiveHomepage()
    return readPublishedHomepageCached()
  }, fallbackHomepage)
}

interface SiteInfoFields {
  phone: string
  email: string
  mailingAddress: string
  instagramUrl: string
  facebookUrl: string
  twitterUrl: string
  websiteUrl: string
  season: string
  footerTagline: string
}

function toSiteInfoContent(fields: SiteInfoFields): SiteInfoContent {
  return {
    phone: fields.phone,
    email: fields.email,
    mailingAddress: fields.mailingAddress,
    instagramUrl: fields.instagramUrl,
    facebookUrl: fields.facebookUrl,
    twitterUrl: fields.twitterUrl,
    websiteUrl: fields.websiteUrl,
    season: fields.season,
    footerTagline: fields.footerTagline,
  }
}

async function readPublishedSiteInfo(): Promise<SiteInfoContent | null> {
  const row = await prisma.siteInfo.findUnique({
    where: { id: SINGLETON_ID },
    select: { publishedSnapshot: true },
  })
  const snapshot = row?.publishedSnapshot as SiteInfoFields | undefined
  return snapshot ? toSiteInfoContent(snapshot) : null
}
const readPublishedSiteInfoCached = cached('siteInfo', readPublishedSiteInfo)

async function readLiveSiteInfo(): Promise<SiteInfoContent | null> {
  const row = await prisma.siteInfo.findUnique({ where: { id: SINGLETON_ID } })
  return row ? toSiteInfoContent(row) : null
}

export function readSiteInfo(): Promise<SiteInfoContent> {
  return readWithFallback('informations du site', async () => {
    if (await isPreviewEnabled()) return readLiveSiteInfo()
    return readPublishedSiteInfoCached()
  }, fallbackSiteInfo)
}

interface PageTextsFields {
  planningSubtitle: string
  disciplinesSubtitle: string
  locationsSubtitle: string
  contactSubtitle: string
  instructorsSubtitle: string
  pricingSubtitle: string
  histoireSubtitle: string
}

function toPageTextsContent(fields: PageTextsFields): PageTextsContent {
  return {
    planningSubtitle: fields.planningSubtitle,
    disciplinesSubtitle: fields.disciplinesSubtitle,
    locationsSubtitle: fields.locationsSubtitle,
    contactSubtitle: fields.contactSubtitle,
    instructorsSubtitle: fields.instructorsSubtitle,
    pricingSubtitle: fields.pricingSubtitle,
    histoireSubtitle: fields.histoireSubtitle,
  }
}

async function readPublishedPageTexts(): Promise<PageTextsContent | null> {
  const row = await prisma.pageTexts.findUnique({
    where: { id: SINGLETON_ID },
    select: { publishedSnapshot: true },
  })
  const snapshot = row?.publishedSnapshot as PageTextsFields | undefined
  return snapshot ? toPageTextsContent(snapshot) : null
}
const readPublishedPageTextsCached = cached('pageTexts', readPublishedPageTexts)

async function readLivePageTexts(): Promise<PageTextsContent | null> {
  const row = await prisma.pageTexts.findUnique({ where: { id: SINGLETON_ID } })
  return row ? toPageTextsContent(row) : null
}

export function readPageTexts(): Promise<PageTextsContent> {
  return readWithFallback('textes des pages', async () => {
    if (await isPreviewEnabled()) return readLivePageTexts()
    return readPublishedPageTextsCached()
  }, fallbackPageTexts)
}

interface RegistrationInfoFields {
  permanence1Days: string
  permanence1Hours: string
  permanence1Venue: string
  permanence2Days: string
  permanence2Hours: string
  permanence2Venue: string
  requiredDocuments: string[]
  photoNote: string
}

function toRegistrationInfoContent(fields: RegistrationInfoFields): RegistrationInfoContent {
  return {
    permanence1Days: fields.permanence1Days,
    permanence1Hours: fields.permanence1Hours,
    permanence1Venue: fields.permanence1Venue,
    permanence2Days: fields.permanence2Days,
    permanence2Hours: fields.permanence2Hours,
    permanence2Venue: fields.permanence2Venue,
    requiredDocuments: fields.requiredDocuments,
    photoNote: fields.photoNote,
  }
}

async function readPublishedRegistrationInfo(): Promise<RegistrationInfoContent | null> {
  const row = await prisma.registrationInfo.findUnique({
    where: { id: SINGLETON_ID },
    select: { publishedSnapshot: true },
  })
  const snapshot = row?.publishedSnapshot as RegistrationInfoFields | undefined
  return snapshot ? toRegistrationInfoContent(snapshot) : null
}
const readPublishedRegistrationInfoCached = cached('registrationInfo', readPublishedRegistrationInfo)

async function readLiveRegistrationInfo(): Promise<RegistrationInfoContent | null> {
  const row = await prisma.registrationInfo.findUnique({ where: { id: SINGLETON_ID } })
  return row ? toRegistrationInfoContent(row) : null
}

export function readRegistrationInfo(): Promise<RegistrationInfoContent> {
  return readWithFallback('inscriptions', async () => {
    if (await isPreviewEnabled()) return readLiveRegistrationInfo()
    return readPublishedRegistrationInfoCached()
  }, fallbackRegistrationInfo)
}

interface PricingFields {
  season: string
  membershipFee: string
  infoItems: string[]
  rows: { label: string; price: string; detail: string; highlight: boolean; displayOrder: number }[]
}

function toPricingContent(fields: PricingFields): PricingContent {
  return {
    season: fields.season,
    membershipFee: fields.membershipFee,
    infoItems: fields.infoItems,
    rows: [...fields.rows]
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((entry) => ({
        label: entry.label,
        price: entry.price,
        detail: entry.detail,
        highlight: entry.highlight || undefined,
      })),
  }
}

async function readPublishedPricing(): Promise<PricingContent | null> {
  const row = await prisma.pricing.findUnique({
    where: { id: SINGLETON_ID },
    select: { publishedSnapshot: true },
  })
  const snapshot = row?.publishedSnapshot as PricingFields | undefined
  return snapshot ? toPricingContent(snapshot) : null
}
const readPublishedPricingCached = cached('pricing', readPublishedPricing)

async function readLivePricing(): Promise<PricingContent | null> {
  const row = await prisma.pricing.findUnique({
    where: { id: SINGLETON_ID },
    include: { rows: { orderBy: { displayOrder: 'asc' } } },
  })
  return row ? toPricingContent(row) : null
}

export function readPricing(): Promise<PricingContent> {
  return readWithFallback('tarifs', async () => {
    if (await isPreviewEnabled()) return readLivePricing()
    return readPublishedPricingCached()
  }, fallbackPricing)
}

interface InstructorFields {
  name: string
  specialty: string
  bio: string
  experience: string
  photoUrl: string | null
}

function toInstructorContent(id: string, fields: InstructorFields): InstructorContent {
  return {
    _id: id,
    name: fields.name,
    specialty: fields.specialty,
    bio: fields.bio,
    experience: fields.experience,
    photoUrl: optional(fields.photoUrl),
  }
}

async function readPublishedInstructors(): Promise<InstructorContent[] | null> {
  const rows = await prisma.instructor.findMany({
    orderBy: { displayOrder: 'asc' },
    select: { id: true, publishedSnapshot: true },
  })

  return rows
    .filter((row) => row.publishedSnapshot !== null)
    .map((row) => toInstructorContent(row.id, row.publishedSnapshot as unknown as InstructorFields))
}
const readPublishedInstructorsCached = cached('instructors', readPublishedInstructors)

async function readLiveInstructors(): Promise<InstructorContent[]> {
  const rows = await prisma.instructor.findMany({ orderBy: { displayOrder: 'asc' } })
  return rows.map((row) => toInstructorContent(row.id, row))
}

export function readInstructors(): Promise<InstructorContent[]> {
  return readWithFallback('professeurs', async () => {
    if (await isPreviewEnabled()) return readLiveInstructors()
    return readPublishedInstructorsCached()
  }, fallbackInstructors)
}

interface DisciplineFields {
  title: string
  iconName: 'Zap' | 'Star' | 'Heart' | 'Music' | 'Users'
  description: string
  benefits: string[]
  imageUrl: string | null
}

function toDisciplineContent(id: string, fields: DisciplineFields): DisciplineContent {
  return {
    _id: id,
    title: fields.title,
    iconName: fields.iconName,
    description: fields.description,
    benefits: fields.benefits,
    imageUrl: optional(fields.imageUrl),
  }
}

async function readPublishedDisciplines(): Promise<DisciplineContent[] | null> {
  const rows = await prisma.discipline.findMany({
    orderBy: { displayOrder: 'asc' },
    select: { id: true, publishedSnapshot: true },
  })

  return rows
    .filter((row) => row.publishedSnapshot !== null)
    .map((row) => toDisciplineContent(row.id, row.publishedSnapshot as unknown as DisciplineFields))
}
const readPublishedDisciplinesCached = cached('disciplines', readPublishedDisciplines)

async function readLiveDisciplines(): Promise<DisciplineContent[]> {
  const rows = await prisma.discipline.findMany({ orderBy: { displayOrder: 'asc' } })
  return rows.map((row) => toDisciplineContent(row.id, row))
}

export function readDisciplines(): Promise<DisciplineContent[]> {
  return readWithFallback('disciplines', async () => {
    if (await isPreviewEnabled()) return readLiveDisciplines()
    return readPublishedDisciplinesCached()
  }, fallbackDisciplines)
}

interface VenueFields {
  name: string
  address: string
  description: string
  amenities: string[]
  mapEmbedUrl: string
  googleMapsUrl: string
  imageUrl: string | null
}

function toVenueContent(id: string, fields: VenueFields): VenueContent {
  return {
    _id: id,
    name: fields.name,
    address: fields.address,
    description: fields.description,
    amenities: fields.amenities,
    mapEmbedUrl: fields.mapEmbedUrl,
    googleMapsUrl: fields.googleMapsUrl,
    imageUrl: optional(fields.imageUrl),
  }
}

async function readPublishedVenues(): Promise<VenueContent[] | null> {
  const rows = await prisma.venue.findMany({
    orderBy: { displayOrder: 'asc' },
    select: { id: true, publishedSnapshot: true },
  })

  return rows
    .filter((row) => row.publishedSnapshot !== null)
    .map((row) => toVenueContent(row.id, row.publishedSnapshot as unknown as VenueFields))
}
const readPublishedVenuesCached = cached('venues', readPublishedVenues)

async function readLiveVenues(): Promise<VenueContent[]> {
  const rows = await prisma.venue.findMany({ orderBy: { displayOrder: 'asc' } })
  return rows.map((row) => toVenueContent(row.id, row))
}

export function readVenues(): Promise<VenueContent[]> {
  return readWithFallback('salles', async () => {
    if (await isPreviewEnabled()) return readLiveVenues()
    return readPublishedVenuesCached()
  }, fallbackVenues)
}

interface ScheduleFields {
  name: string
  day: string
  time: string
  venue: string | null
  level: string
}

function toScheduleContent(id: string, fields: ScheduleFields): ScheduleEntryContent {
  return {
    _id: id,
    name: fields.name,
    day: fields.day,
    time: fields.time,
    venue: optional(fields.venue),
    level: fields.level,
  }
}

function sortSchedule(entries: ScheduleEntryContent[]): ScheduleEntryContent[] {
  return [...entries].sort(
    (a, b) => dayRank(a.day) - dayRank(b.day) || startMinutes(a.time) - startMinutes(b.time)
  )
}

async function readPublishedSchedule(): Promise<ScheduleEntryContent[] | null> {
  const rows = await prisma.scheduleEntry.findMany({
    select: { id: true, publishedSnapshot: true },
  })

  const published = rows
    .filter((row) => row.publishedSnapshot !== null)
    .map((row) => toScheduleContent(row.id, row.publishedSnapshot as unknown as ScheduleFields))

  return sortSchedule(published)
}
const readPublishedScheduleCached = cached('schedule', readPublishedSchedule)

async function readLiveSchedule(): Promise<ScheduleEntryContent[]> {
  const rows = await prisma.scheduleEntry.findMany()
  return sortSchedule(rows.map((row) => toScheduleContent(row.id, row)))
}

export function readSchedule(): Promise<ScheduleEntryContent[]> {
  return readWithFallback('planning', async () => {
    if (await isPreviewEnabled()) return readLiveSchedule()
    return readPublishedScheduleCached()
  }, fallbackSchedule)
}

interface NewsFields {
  title: string
  date: Date | string
  imageUrl: string | null
  excerpt: string
  link: string | null
}

function toNewsContent(id: string, fields: NewsFields): NewsContent {
  const isoDate = typeof fields.date === 'string' ? fields.date : fields.date.toISOString()
  return {
    _id: id,
    title: fields.title,
    date: isoDate.slice(0, 10),
    imageUrl: optional(fields.imageUrl),
    excerpt: fields.excerpt,
    link: optional(fields.link),
  }
}

function sortNews(entries: NewsContent[]): NewsContent[] {
  return [...entries].sort((a, b) => a.date.localeCompare(b.date))
}

async function readPublishedNews(): Promise<NewsContent[] | null> {
  const rows = await prisma.news.findMany({
    select: { id: true, publishedSnapshot: true },
  })

  const published = rows
    .filter((row) => row.publishedSnapshot !== null)
    .map((row) => toNewsContent(row.id, row.publishedSnapshot as unknown as NewsFields))

  return sortNews(published)
}
const readPublishedNewsCached = cached('news', readPublishedNews)

async function readLiveNews(): Promise<NewsContent[]> {
  const rows = await prisma.news.findMany()
  return sortNews(rows.map((row) => toNewsContent(row.id, row)))
}

export function readNews(): Promise<NewsContent[]> {
  return readWithFallback('actualités', async () => {
    if (await isPreviewEnabled()) return readLiveNews()
    return readPublishedNewsCached()
  }, fallbackNews)
}

async function readStoredPageBlocks(
  pageKey: PageBlockPageKey,
  source: PageBlockSource
): Promise<{ blocks: ResolvedBlock[] } | null> {
  const blocks = await resolvePageBlocks(pageKey, source)
  return blocks === null ? null : { blocks }
}

export async function readPageBlocks(pageKey: PageBlockPageKey): Promise<ResolvedBlock[]> {
  const readPublishedCached = unstable_cache(
    () => readStoredPageBlocks(pageKey, 'published'),
    [`${pageBlocksTag(pageKey)}-with-defaults`],
    { tags: [pageBlocksTag(pageKey)] }
  )

  const stored = await readWithFallback(
    `blocs de la page ${pageKey}`,
    async () => {
      if (await isPreviewEnabled()) return readStoredPageBlocks(pageKey, 'live')
      return readPublishedCached()
    },
    { blocks: defaultPageBlocks(pageKey) }
  )
  return stored.blocks
}

function resolvePageSeo(
  stored: Record<string, Partial<PageSeoFields>> | null | undefined,
  pageKey: string
): PageSeoFields {
  const defaults = defaultSeoMap()[pageKey]
  const entry = stored?.[pageKey]

  const title = entry?.title?.trim() ? entry.title.trim() : defaults.title
  const description = entry?.description?.trim() ? entry.description.trim() : defaults.description
  const imageUrl = entry?.imageUrl?.trim() ? entry.imageUrl.trim() : defaults.imageUrl

  return { title, description, imageUrl }
}

async function readPublishedPageSeoMap(): Promise<Record<string, PageSeoFields> | null> {
  const row = await prisma.pageSeo.findUnique({
    where: { id: SINGLETON_ID },
    select: { publishedSnapshot: true },
  })
  const snapshot = row?.publishedSnapshot as { pages?: Record<string, PageSeoFields> } | undefined
  return snapshot?.pages ?? null
}
const readPublishedPageSeoMapCached = cached('pageSeo', readPublishedPageSeoMap)

async function readLivePageSeoMap(): Promise<Record<string, PageSeoFields> | null> {
  const row = await prisma.pageSeo.findUnique({ where: { id: SINGLETON_ID } })
  return (row?.pages as Record<string, PageSeoFields> | undefined) ?? null
}

export function readPageSeo(pageKey: string): Promise<PageSeoFields> {
  return readWithFallback(
    `SEO de la page ${pageKey}`,
    async () => {
      const map = (await isPreviewEnabled()) ? await readLivePageSeoMap() : await readPublishedPageSeoMapCached()
      return resolvePageSeo(map, pageKey)
    },
    resolvePageSeo(null, pageKey)
  )
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
