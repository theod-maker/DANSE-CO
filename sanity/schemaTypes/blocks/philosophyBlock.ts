import { defineType, defineField } from 'sanity'

export const philosophyBlockType = defineType({
  name: 'philosophyBlock',
  title: '🌿 Philosophie',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de section',
      type: 'string',
      description: 'Ex: La danse comme art de vivre.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo illustrant la philosophie de l\'école',
    }),
    defineField({
      name: 'block1Label',
      title: 'Bloc 1 — étiquette',
      type: 'string',
      description: 'Ex: NOTRE HISTOIRE',
    }),
    defineField({
      name: 'block1Text',
      title: 'Bloc 1 — texte',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'block2Label',
      title: 'Bloc 2 — étiquette',
      type: 'string',
      description: 'Ex: NOTRE ENGAGEMENT',
    }),
    defineField({
      name: 'block2Text',
      title: 'Bloc 2 — texte',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `🌿 ${title || 'Philosophie'}` }
    },
  },
})
