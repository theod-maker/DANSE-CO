'use client'

import { useState } from 'react'
import { FIELD_CLASSNAME, FieldError } from '../_shared/fields'
import { ImageField } from '../_shared/image-field'
import type { MediaOption } from '../medias/queries'
import type { SeoPageDefinition, PageSeoFields } from '../../../src/lib/content/seoPages'
import { SEO_TITLE_ADVISORY, SEO_DESCRIPTION_ADVISORY } from './validation'
import { SeoPreview } from './seo-preview'

const BRAND_SUFFIX = ' | Dans&CO'

function resolved(value: string, fallback: string): string {
  return value.trim() ? value.trim() : fallback
}

function previewTitle(page: SeoPageDefinition, title: string): string {
  const base = resolved(title, page.defaults.title)
  return page.isHomePage ? base : `${base}${BRAND_SUFFIX}`
}

function CharacterCount({ length, advisory }: { length: number; advisory: number }) {
  const isOverAdvisory = length > advisory
  return (
    <span className={isOverAdvisory ? 'text-amber-600' : 'text-neutral-400'}>
      {length}/{advisory}
    </span>
  )
}

interface SeoPageFieldsProps {
  page: SeoPageDefinition
  values: PageSeoFields
  errors?: Partial<Record<'title' | 'description' | 'imageUrl', string>>
  mediaOptions: MediaOption[]
}

export function SeoPageFields({ page, values, errors, mediaOptions }: SeoPageFieldsProps) {
  const [title, setTitle] = useState(values.title)
  const [description, setDescription] = useState(values.description)
  const [imageUrl, setImageUrl] = useState(values.imageUrl ?? '')

  return (
    <fieldset className="rounded-lg border border-neutral-200 p-5">
      <legend className="flex items-baseline gap-2 px-1 text-base text-neutral-800">
        <span className="font-medium">{page.label}</span>
        <span className="text-xs text-neutral-400">{page.path}</span>
      </legend>

      <div className="mt-3 space-y-4">
        <div>
          <div className="mb-1 flex items-baseline justify-between">
            <label htmlFor={`${page.key}.title`} className="text-sm text-neutral-700">
              Titre <span className="text-neutral-400">(facultatif)</span>
            </label>
            <CharacterCount length={title.length} advisory={SEO_TITLE_ADVISORY} />
          </div>
          <input
            id={`${page.key}.title`}
            name={`${page.key}.title`}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={FIELD_CLASSNAME}
          />
          <p className="mt-1 text-xs text-neutral-500">Par défaut : {page.defaults.title}</p>
          <FieldError message={errors?.title} />
        </div>

        <div>
          <div className="mb-1 flex items-baseline justify-between">
            <label htmlFor={`${page.key}.description`} className="text-sm text-neutral-700">
              Description <span className="text-neutral-400">(facultatif)</span>
            </label>
            <CharacterCount length={description.length} advisory={SEO_DESCRIPTION_ADVISORY} />
          </div>
          <textarea
            id={`${page.key}.description`}
            name={`${page.key}.description`}
            rows={2}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className={FIELD_CLASSNAME}
          />
          <p className="mt-1 text-xs text-neutral-500">Par défaut : {page.defaults.description}</p>
          <FieldError message={errors?.description} />
        </div>

        <ImageField
          name={`${page.key}.imageUrl`}
          label="Image de partage"
          defaultValue={values.imageUrl ?? ''}
          mediaOptions={mediaOptions}
          error={errors?.imageUrl}
          optional
          onChange={setImageUrl}
        />
      </div>

      <SeoPreview
        page={page}
        title={previewTitle(page, title)}
        description={resolved(description, page.defaults.description)}
        imageUrl={resolved(imageUrl, page.defaults.imageUrl ?? '')}
      />
    </fieldset>
  )
}
