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
      description: "Ex: Rock & Roll, Salsa Cubaine, Danses de Salon",
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
      description: "Ex: 19:30 - 20:30",
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
        layout: 'radio',
      },
    }),
    defineField({
      name: 'order',
      title: "Position dans la journée",
      type: 'number',
      description: "1 = premier cours de la journée, 2 = deuxième, etc.",
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
    select: { title: 'name', day: 'day', time: 'time', level: 'level' },
    prepare({ title, day, time, level }) {
      return {
        title,
        subtitle: [day, time, level].filter(Boolean).join(' · '),
      }
    },
  },
})
