import { defineType, defineField } from 'sanity'

export const instructorType = defineType({
  name: 'instructor',
  title: 'Professeur',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Prénom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specialty',
      title: 'Spécialité',
      type: 'string',
      description: 'Ex: Danse Sportive & Salon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'experience',
      title: 'Expérience',
      type: 'string',
      description: 'Ex: 25 ans de pratique',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo du professeur',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Les professeurs sont triés par ce chiffre (1 = premier)',
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'specialty' },
  },
})
