import { defineType, defineField } from 'sanity'

export const pageTextsType = defineType({
  name: 'pageTexts',
  title: 'Textes des pages',
  type: 'document',
  fields: [
    defineField({
      name: 'planningSubtitle',
      title: 'Page Planning — phrase d\'introduction',
      type: 'string',
      description: "Affiché sous le titre 'Planning des Cours'",
    }),
    defineField({
      name: 'disciplinesSubtitle',
      title: 'Page Disciplines — phrase d\'introduction',
      type: 'string',
      description: "Affiché sous le titre 'Nos Disciplines'",
    }),
    defineField({
      name: 'locationsSubtitle',
      title: 'Page Nos Salles — phrase d\'introduction',
      type: 'string',
      description: "Affiché sous le titre 'Nos Salles'",
    }),
    defineField({
      name: 'contactSubtitle',
      title: 'Page Contact — phrase d\'introduction',
      type: 'string',
      description: "Affiché sous le titre 'Contactez-nous'",
    }),
    defineField({
      name: 'instructorsSubtitle',
      title: 'Page Professeurs — phrase d\'introduction',
      type: 'string',
      description: "Affiché sous le titre 'Vos Professeurs'",
    }),
    defineField({
      name: 'pricingSubtitle',
      title: 'Page Tarifs — phrase d\'introduction',
      type: 'string',
      description: "Affiché sous le titre 'Nos Tarifs'",
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Textes des pages' }
    },
  },
})
