import { defineType, defineField } from 'sanity'

export const featuredVideoBlockType = defineType({
  name: 'featuredVideoBlock',
  title: '🎥 Image mise en avant',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo principale',
      type: 'image',
      options: { hotspot: true },
      description: 'Grande image pleine largeur avec texte superposé',
    }),
    defineField({
      name: 'description',
      title: 'Texte superposé',
      type: 'text',
      rows: 3,
      description: 'Texte affiché dans la carte en bas à gauche de l\'image',
    }),
  ],
  preview: {
    select: { media: 'image', title: 'description' },
    prepare({ media, title }) {
      return { title: `🎥 ${title?.slice(0, 50) || 'Image mise en avant'}`, media }
    },
  },
})
