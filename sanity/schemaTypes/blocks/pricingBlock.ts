import { defineType } from 'sanity'

export const pricingBlockType = defineType({
  name: 'pricingBlock',
  title: '💰 Tableau des Tarifs',
  type: 'object',
  fields: [{ name: 'placeholder', title: '_', type: 'string', hidden: true }],
  preview: {
    prepare() {
      return { title: '💰 Tableau des Tarifs' }
    },
  },
})
