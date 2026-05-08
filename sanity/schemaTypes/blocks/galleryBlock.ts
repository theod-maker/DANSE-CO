import { defineType, defineField } from 'sanity'

export const galleryBlockType = defineType({
  name: 'galleryBlock',
  title: '🖼️ Galerie photos',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre (optionnel)',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Colonnes',
      type: 'number',
      options: {
        list: [
          { title: '2 colonnes', value: 2 },
          { title: '3 colonnes', value: 3 },
        ],
      },
      initialValue: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: '🖼️ Galerie photos' }
    },
  },
})
