import { defineType, defineField } from 'sanity'

export const scheduleEntryType = defineType({
  name: 'scheduleEntry',
  title: 'Cours',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du cours',
      type: 'string',
      description: 'Ex: Rock & Roll, Salsa Cubaine',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'day',
      title: 'Jour',
      type: 'string',
      options: {
        list: [
          { title: 'Lundi', value: 'Lundi' },
          { title: 'Mercredi', value: 'Mercredi' },
          { title: 'Samedi (Stages)', value: 'Samedi (Stages)' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Horaire',
      type: 'string',
      description: 'Ex: 19:30 - 20:30',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Salle',
      type: 'string',
      options: {
        list: [
          { title: 'Le Canopus', value: 'Le Canopus' },
          { title: 'Salle Caraïbes', value: 'Salle Caraïbes' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'level',
      title: 'Niveau',
      type: 'string',
      options: {
        list: [
          { title: 'Débutant', value: 'Débutant' },
          { title: 'Intermédiaire', value: 'Intermédiaire' },
          { title: 'Tous niveaux', value: 'Tous niveaux' },
          { title: 'Workshop', value: 'Workshop' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Ordre dans la journée',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Par jour et horaire',
      name: 'dayOrder',
      by: [
        { field: 'day', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'day' },
    prepare({ title, subtitle }) {
      return { title, subtitle }
    },
  },
})
