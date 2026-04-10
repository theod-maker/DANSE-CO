import { defineType, defineField } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Page d\'accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Image Hero (fond de la page d\'accueil)',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo affichée en fond de la section principale',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Accroche principale (Hero)',
      type: 'string',
      description: 'Le grand titre affiché sur la vidéo de fond',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Description courte (Hero)',
      type: 'text',
      rows: 3,
      description: 'Texte sous l\'accroche principale',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'Phrase de présentation (Section À propos)',
      type: 'text',
      rows: 3,
      description: 'Grande phrase descriptive de l\'association',
    }),
    defineField({
      name: 'philosophyTitle',
      title: 'Titre de la section Philosophie',
      type: 'string',
    }),
    defineField({
      name: 'philosophyBlock1Label',
      title: 'Label bloc 1 (ex: NOTRE APPROCHE)',
      type: 'string',
    }),
    defineField({
      name: 'philosophyBlock1Text',
      title: 'Texte bloc 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'philosophyBlock2Label',
      title: 'Label bloc 2 (ex: NOTRE MISSION)',
      type: 'string',
    }),
    defineField({
      name: 'philosophyBlock2Text',
      title: 'Texte bloc 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featuredVideoDescription',
      title: 'Description vidéo mise en avant',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'servicesSectionTitle',
      title: 'Titre de la section Services',
      type: 'string',
    }),
    defineField({
      name: 'servicesSectionSubtitle',
      title: 'Sous-titre de la section Services',
      type: 'string',
    }),
    defineField({
      name: 'servicesCard1Description',
      title: 'Description carte Disciplines',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'servicesCard2Description',
      title: 'Description carte Cours & Stages',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'heroTitle' },
    prepare({ title }) {
      return { title: title || 'Page d\'accueil' }
    },
  },
})
