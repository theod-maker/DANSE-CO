'use client'

import type { SeoPageDefinition } from '../../../src/lib/content/seoPages'
import { SEO_TITLE_ADVISORY, SEO_DESCRIPTION_ADVISORY } from './validation'

const DEFAULT_SHARE_IMAGE = '/og-image.jpg'

function siteHost(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://danse-co.vercel.app'
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

function truncate(value: string, maximum: number): string {
  if (value.length <= maximum) return value
  return `${value.slice(0, maximum).trimEnd()}…`
}

function displayPath(page: SeoPageDefinition): string {
  if (page.path === '/') return siteHost()
  return `${siteHost()} › ${page.path.replace(/^\//, '')}`
}

interface SeoPreviewProps {
  page: SeoPageDefinition
  title: string
  description: string
  imageUrl: string
}

function GoogleResult({ page, title, description }: Omit<SeoPreviewProps, 'imageUrl'>) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-4">
      <p className="mb-1 text-xs text-neutral-500">{displayPath(page)}</p>
      <p className="text-lg leading-snug text-[#1a0dab]">{truncate(title, SEO_TITLE_ADVISORY)}</p>
      <p className="mt-1 text-sm leading-snug text-neutral-600">
        {truncate(description, SEO_DESCRIPTION_ADVISORY)}
      </p>
    </div>
  )
}

function ShareCard({ title, description, imageUrl }: Omit<SeoPreviewProps, 'page'>) {
  return (
    <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
      {imageUrl ? (
        <img src={imageUrl} alt="" className="aspect-[1200/630] w-full bg-neutral-100 object-cover" />
      ) : (
        <div className="flex aspect-[1200/630] w-full items-center justify-center bg-neutral-100 px-4 text-center text-xs text-neutral-500">
          Aucune image choisie — l&apos;image du site ({DEFAULT_SHARE_IMAGE}) sera utilisée
        </div>
      )}
      <div className="border-t border-neutral-200 p-3">
        <p className="text-xs uppercase tracking-wide text-neutral-400">{siteHost()}</p>
        <p className="mt-1 text-sm font-medium leading-snug text-neutral-800">
          {truncate(title, SEO_TITLE_ADVISORY)}
        </p>
        <p className="mt-1 text-xs leading-snug text-neutral-600">
          {truncate(description, SEO_DESCRIPTION_ADVISORY)}
        </p>
      </div>
    </div>
  )
}

export function SeoPreview({ page, title, description, imageUrl }: SeoPreviewProps) {
  return (
    <div className="mt-5 border-t border-neutral-200 pt-4">
      <p className="mb-3 text-xs uppercase tracking-wide text-neutral-400">
        Aperçu indicatif — le rendu réel peut varier légèrement
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs text-neutral-500">Résultat Google</p>
          <GoogleResult page={page} title={title} description={description} />
        </div>

        <div>
          <p className="mb-2 text-xs text-neutral-500">Partage sur les réseaux sociaux</p>
          <ShareCard title={title} description={description} imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  )
}
