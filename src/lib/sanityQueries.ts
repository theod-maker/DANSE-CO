import groq from 'groq'

export const homepageQuery = groq`*[_type == "homepage" && _id == "homepage"][0]{
  "heroImageUrl": heroImage.asset->url,
  heroTitle,
  heroDescription,
  aboutTitle,
  philosophyTitle,
  philosophyBlock1Label,
  philosophyBlock1Text,
  philosophyBlock2Label,
  philosophyBlock2Text,
  featuredVideoDescription,
  servicesSectionTitle,
  servicesSectionSubtitle,
  servicesCard1Description,
  servicesCard2Description,
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
