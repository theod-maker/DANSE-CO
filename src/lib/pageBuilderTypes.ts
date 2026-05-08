export interface PortableTextBlock {
  _type: 'block'
  _key: string
  children: { text: string; marks: string[] }[]
  style: string
  markDefs: { _type: string; _key: string; href?: string }[]
}

export type PortableTextContent = PortableTextBlock[]

export interface HeroBlockType {
  _type: 'heroBlock'
  _key: string
  tagline?: string
  title: string
  description?: string
  imageUrl?: string
  ctaLabel?: string
  ctaLink?: string
}

export interface PageHeaderBlockType {
  _type: 'pageHeaderBlock'
  _key: string
  eyebrow?: string
  title: string
  titleHighlight?: string
  subtitle?: string
}

export interface RichTextBlockType {
  _type: 'richTextBlock'
  _key: string
  content: PortableTextContent
}

export interface ImageBlockType {
  _type: 'imageBlock'
  _key: string
  imageUrl: string
  caption?: string
  fullWidth?: boolean
}

export interface GalleryBlockType {
  _type: 'galleryBlock'
  _key: string
  title?: string
  imageUrls: string[]
  columns?: 2 | 3
}

export interface CtaBlockType {
  _type: 'ctaBlock'
  _key: string
  title?: string
  description?: string
  buttonLabel: string
  buttonLink: string
}

export interface DividerBlockType {
  _type: 'dividerBlock'
  _key: string
}

export interface DisciplinesGridBlockType {
  _type: 'disciplinesGridBlock'
  _key: string
}

export interface InstructorsGridBlockType {
  _type: 'instructorsGridBlock'
  _key: string
}

export interface ScheduleBlockType {
  _type: 'scheduleBlock'
  _key: string
}

export interface PricingBlockType {
  _type: 'pricingBlock'
  _key: string
}

export interface VenuesBlockType {
  _type: 'venuesBlock'
  _key: string
}

export interface NewsBlockType {
  _type: 'newsBlock'
  _key: string
}

export interface ContactBlockType {
  _type: 'contactBlock'
  _key: string
}

export interface AboutBlockType {
  _type: 'aboutBlock'
  _key: string
  title: string
}

export interface PhilosophyBlockType {
  _type: 'philosophyBlock'
  _key: string
  title: string
  imageUrl?: string
  block1Label?: string
  block1Text?: string
  block2Label?: string
  block2Text?: string
}

export interface FeaturedVideoBlockType {
  _type: 'featuredVideoBlock'
  _key: string
  description?: string
  imageUrl?: string
}

export interface ServicesBlockType {
  _type: 'servicesBlock'
  _key: string
  sectionTitle: string
  sectionSubtitle?: string
  card1Description?: string
  card1ImageUrl?: string
  card2Description?: string
  card2ImageUrl?: string
}

export type PageBlock =
  | HeroBlockType
  | PageHeaderBlockType
  | RichTextBlockType
  | ImageBlockType
  | GalleryBlockType
  | CtaBlockType
  | DividerBlockType
  | DisciplinesGridBlockType
  | InstructorsGridBlockType
  | ScheduleBlockType
  | PricingBlockType
  | VenuesBlockType
  | NewsBlockType
  | ContactBlockType
  | AboutBlockType
  | PhilosophyBlockType
  | FeaturedVideoBlockType
  | ServicesBlockType

export interface PageContent {
  _id: string
  title: string
  slug: string
  blocks: PageBlock[]
}
