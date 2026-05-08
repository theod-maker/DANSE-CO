import { defineType } from 'sanity'

export const dividerBlockType = defineType({
  name: 'dividerBlock',
  title: '➖ Séparateur',
  type: 'object',
  fields: [{ name: 'placeholder', title: '_', type: 'string', hidden: true }],
  preview: {
    prepare() {
      return { title: '➖ Séparateur' }
    },
  },
})
