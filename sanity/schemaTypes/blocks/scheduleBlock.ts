import { defineType } from 'sanity'

export const scheduleBlockType = defineType({
  name: 'scheduleBlock',
  title: '📅 Planning des Cours',
  type: 'object',
  fields: [{ name: 'placeholder', title: '_', type: 'string', hidden: true }],
  preview: {
    prepare() {
      return { title: '📅 Planning des Cours' }
    },
  },
})
