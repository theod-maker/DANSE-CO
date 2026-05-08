import { defineType } from 'sanity'

export const venuesBlockType = defineType({
  name: 'venuesBlock',
  title: '🏛️ Nos Salles',
  type: 'object',
  fields: [{ name: 'placeholder', title: '_', type: 'string', hidden: true }],
  preview: {
    prepare() {
      return { title: '🏛️ Nos Salles' }
    },
  },
})
