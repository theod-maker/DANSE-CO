import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2025-04-05'

export const sanityClient = createClient({
  projectId: projectId || 'z0uyxhwg',
  dataset,
  apiVersion,
  useCdn: true,
})

export const isSanityConfigured = true
