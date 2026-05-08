import { defineType, defineField } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre interne',
      type: 'string',
      description: 'Nom de la page pour le studio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'string',
      description: 'Ex: / pour accueil, /disciplines, /contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'pageHeaderBlock' },
        { type: 'richTextBlock' },
        { type: 'imageBlock' },
        { type: 'galleryBlock' },
        { type: 'ctaBlock' },
        { type: 'dividerBlock' },
        { type: 'disciplinesGridBlock' },
        { type: 'instructorsGridBlock' },
        { type: 'scheduleBlock' },
        { type: 'pricingBlock' },
        { type: 'venuesBlock' },
        { type: 'newsBlock' },
        { type: 'contactBlock' },
        { type: 'aboutBlock' },
        { type: 'philosophyBlock' },
        { type: 'featuredVideoBlock' },
        { type: 'servicesBlock' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug' },
  },
})
