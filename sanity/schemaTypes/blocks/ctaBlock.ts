import { defineType, defineField } from 'sanity'

export const ctaBlockType = defineType({
  name: 'ctaBlock',
  title: "👆 Appel à l'action",
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Texte du bouton',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Lien du bouton',
      type: 'string',
      description: 'Ex: /contact ou /planning',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'buttonLabel' },
    prepare({ title }) {
      return { title: `👆 CTA: ${title || ''}` }
    },
  },
})
