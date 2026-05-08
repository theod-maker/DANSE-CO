import { defineType, defineField } from 'sanity'

export const disciplineType = defineType({
  name: 'discipline',
  title: 'Discipline',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom de la discipline',
      type: 'string',
      description: "Ex: Rock & Roll, Salsa Cubaine, Danses de Salon",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: "Photo affichée en haut de la carte. Si vide, une photo par défaut est utilisée.",
    }),
    defineField({
      name: 'iconName',
      title: 'Icône',
      type: 'string',
      description: "Icône affichée sur la carte",
      options: {
        list: [
          { title: '⚡ Énergie (Rock, Salsa...)', value: 'Zap' },
          { title: '⭐ Élégance (Salon, Tango...)', value: 'Star' },
          { title: '❤️ Passion (Bachata, Rumba...)', value: 'Heart' },
          { title: '🎵 Musique (Swing, Jazz...)', value: 'Music' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: "2-3 phrases qui décrivent la discipline et ce qu'on apprend.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Mots-clés',
      type: 'array',
      of: [{ type: 'string' }],
      description: "Badges affichés en bas de la carte. Ex: Cardio, Énergie, Convivialité (3 maximum recommandés)",
    }),
    defineField({
      name: 'order',
      title: "Position dans la liste",
      type: 'number',
      description: "1 = affiché en premier, 2 = deuxième, etc.",
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Discipline sans titre',
        subtitle: subtitle ? subtitle.slice(0, 60) + '...' : '',
      }
    },
  },
})
