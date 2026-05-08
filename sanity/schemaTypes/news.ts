import { defineType, defineField } from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'Actualité',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: "Ex: Reprise des cours — Saison 2025-2026",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: "Photo illustrant l'actualité. Si vide, une image par défaut est utilisée.",
    }),
    defineField({
      name: 'excerpt',
      title: 'Texte court',
      type: 'text',
      rows: 3,
      description: "Résumé affiché sur la carte (2-3 phrases max)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Lien (optionnel)',
      type: 'url',
      description: "Lien vers plus d'infos — ex: événement Facebook, formulaire d'inscription. Laisser vide si pas de lien.",
    }),
    defineField({
      name: 'published',
      title: 'Publier sur le site',
      type: 'boolean',
      initialValue: true,
      description: "Décochez pour masquer cette actualité sans la supprimer.",
    }),
  ],
  orderings: [
    {
      title: 'Plus récent en premier',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', date: 'date', published: 'published' },
    prepare({ title, date, published }) {
      return {
        title: `${published === false ? '🔒 ' : ''}${title || 'Actualité sans titre'}`,
        subtitle: date,
      }
    },
  },
})
