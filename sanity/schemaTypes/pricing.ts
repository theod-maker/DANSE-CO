import { defineType, defineField } from 'sanity'

export const pricingType = defineType({
  name: 'pricing',
  title: 'Tarifs',
  type: 'document',
  fields: [
    defineField({
      name: 'season',
      title: 'Saison',
      type: 'string',
      description: 'Ex: 2025 - 2026',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rows',
      title: 'Lignes de tarifs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Formule', type: 'string' },
            { name: 'price', title: 'Prix', type: 'string', description: 'Ex: 165 €' },
            { name: 'detail', title: 'Détail', type: 'string' },
            { name: 'highlight', title: 'Mettre en avant ?', type: 'boolean' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'price' },
          },
        },
      ],
    }),
    defineField({
      name: 'infoItems',
      title: 'Informations supplémentaires (À savoir)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Liste des infos pratiques affichées sous le tableau',
    }),
    defineField({
      name: 'membershipFee',
      title: 'Cotisation association (€)',
      type: 'string',
      description: 'Ex: 15',
    }),
  ],
  preview: {
    select: { title: 'season' },
    prepare({ title }) {
      return { title: `Tarifs ${title}` }
    },
  },
})
