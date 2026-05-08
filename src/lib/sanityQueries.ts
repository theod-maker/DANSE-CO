import groq from 'groq'

export const homepageQuery = groq`*[_type == "homepage" && _id == "homepage"][0]{
  "heroImageUrl": heroImage.asset->url,
  heroTagline,
  heroTitle,
  heroDescription,
  aboutTitle,
  philosophyTitle,
  philosophyBlock1Label,
  philosophyBlock1Text,
  philosophyBlock2Label,
  philosophyBlock2Text,
  "philosophyImageUrl": philosophyImage.asset->url,
  featuredVideoDescription,
  "featuredImageUrl": featuredImage.asset->url,
  featuredSectionLabel,
  servicesSectionTitle,
  servicesSectionSubtitle,
  servicesCard1Description,
  "servicesCard1ImageUrl": servicesCard1Image.asset->url,
  servicesCard2Description,
  "servicesCard2ImageUrl": servicesCard2Image.asset->url,
}`

export const instructorsQuery = groq`*[_type == "instructor"] | order(order asc) {
  _id,
  name,
  specialty,
  bio,
  experience,
  "photoUrl": photo.asset->url,
}`

export const scheduleQuery = groq`*[_type == "scheduleEntry"] | order(order asc) {
  _id,
  name,
  day,
  time,
  venue,
  level,
}`

export const pricingQuery = groq`*[_type == "pricing" && _id == "pricing"][0]{
  season,
  rows[]{
    label,
    price,
    detail,
    highlight,
  },
  infoItems,
  membershipFee,
}`

export const siteInfoQuery = groq`*[_type == "siteInfo" && _id == "siteInfo"][0]{
  phone,
  email,
  mailingAddress,
  instagramUrl,
  facebookUrl,
  twitterUrl,
  websiteUrl,
  season,
  footerTagline,
}`

export const disciplinesQuery = groq`*[_type == "discipline"] | order(order asc) {
  _id,
  title,
  iconName,
  description,
  benefits,
  "imageUrl": image.asset->url,
}`

export const venuesQuery = groq`*[_type == "venue"] | order(order asc) {
  _id,
  name,
  address,
  description,
  amenities,
  mapEmbedUrl,
  googleMapsUrl,
  "imageUrl": image.asset->url,
}`

export const registrationInfoQuery = groq`*[_type == "registrationInfo" && _id == "registrationInfo"][0]{
  permanence1Days,
  permanence1Hours,
  permanence1Venue,
  permanence2Days,
  permanence2Hours,
  permanence2Venue,
  requiredDocuments,
  photoNote,
}`

export const newsQuery = groq`*[_type == "news" && published == true] | order(date desc) {
  _id,
  title,
  date,
  "imageUrl": image.asset->url,
  excerpt,
  link,
}`

export const pageTextsQuery = groq`*[_type == "pageTexts" && _id == "pageTexts"][0]{
  planningSubtitle,
  disciplinesSubtitle,
  locationsSubtitle,
  contactSubtitle,
  instructorsSubtitle,
  pricingSubtitle,
}`
