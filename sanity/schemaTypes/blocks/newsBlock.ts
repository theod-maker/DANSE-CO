import { defineType } from 'sanity'

export const newsBlockType = defineType({
  name: 'newsBlock',
  title: '📢 Actualités',
  type: 'object',
  fields: [{ name: 'placeholder', title: '_', type: 'string', hidden: true }],
  preview: {
    prepare() {
      return { title: '📢 Actualités' }
    },
  },
})
