import { defineType, defineField } from 'sanity'

export const imageBlockType = defineType({
  name: 'imageBlock',
  title: '🖼️ Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Légende (optionnel)',
      type: 'string',
    }),
    defineField({
      name: 'fullWidth',
      title: 'Pleine largeur',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { media: 'image', title: 'caption' },
    prepare({ media, title }) {
      return { title: `🖼️ ${title || 'Image'}`, media }
    },
  },
})
