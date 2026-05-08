import { defineType, defineField } from 'sanity'

export const servicesBlockType = defineType({
  name: 'servicesBlock',
  title: '🃏 Section Services',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Titre de section',
      type: 'string',
      description: 'Ex: Ce que nous proposons',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Ex: Cours hebdomadaires & stages ponctuels',
    }),
    defineField({
      name: 'card1Image',
      title: 'Carte 1 — photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'card1Description',
      title: 'Carte 1 — description (Disciplines)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'card2Image',
      title: 'Carte 2 — photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'card2Description',
      title: 'Carte 2 — description (Cours & Stages)',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'sectionTitle' },
    prepare({ title }) {
      return { title: `🃏 ${title || 'Section Services'}` }
    },
  },
})
