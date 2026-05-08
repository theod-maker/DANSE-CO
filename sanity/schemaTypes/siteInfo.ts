import { defineType, defineField } from 'sanity'

export const siteInfoType = defineType({
  name: 'siteInfo',
  title: 'Informations générales',
  type: 'document',
  groups: [
    { name: 'contact', title: '📞 Contact' },
    { name: 'social', title: '📱 Réseaux sociaux' },
    { name: 'site', title: '⚙️ Site' },
  ],
  fields: [
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      group: 'contact',
      description: "Ex: 06.17.09.93.49",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      description: "Adresse email de contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mailingAddress',
      title: 'Adresse postale',
      type: 'text',
      rows: 2,
      group: 'contact',
      description: "Adresse affichée sur la page Contact",
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Lien Instagram',
      type: 'url',
      group: 'social',
      description: "Laisser vide pour masquer le bouton Instagram sur le site",
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Lien Facebook',
      type: 'url',
      group: 'social',
      description: "Laisser vide pour masquer le bouton Facebook sur le site",
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Lien Twitter / X',
      type: 'url',
      group: 'social',
      description: "Laisser vide pour masquer le bouton Twitter sur le site",
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Autre lien web',
      type: 'url',
      group: 'social',
      description: "Lien vers un autre site (optionnel)",
    }),
    defineField({
      name: 'season',
      title: 'Saison en cours',
      type: 'string',
      group: 'site',
      description: "Affiché sur la page Planning. Ex: 2025–2026",
    }),
    defineField({
      name: 'footerTagline',
      title: 'Texte en bas de page',
      type: 'string',
      group: 'site',
      description: "Ligne sous le logo Danse&CO en bas de chaque page. Ex: Saint-Michel-Chef-Chef · Saison 2025–2026",
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Informations générales' }
    },
  },
})
