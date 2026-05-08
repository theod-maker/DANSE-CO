import { defineType, defineField } from 'sanity'

export const heroBlockType = defineType({
  name: 'heroBlock',
  title: '🎬 Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Texte au-dessus du titre',
      type: 'string',
      description: 'Ex: École de Danse · Saint-Michel-Chef-Chef',
    }),
    defineField({
      name: 'title',
      title: 'Titre principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image de fond',
      type: 'image',
      options: { hotspot: true },
      description: 'Si vide, image par défaut',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Bouton — texte',
      type: 'string',
      description: 'Ex: Voir le planning',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Bouton — lien',
      type: 'string',
      description: 'Ex: /planning',
    }),
  ],
  preview: {
    prepare() {
      return { title: '🎬 Section Hero' }
    },
  },
})
