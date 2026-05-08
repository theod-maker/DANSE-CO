import { defineType } from 'sanity'

export const disciplinesGridBlockType = defineType({
  name: 'disciplinesGridBlock',
  title: '💃 Grille des Disciplines',
  type: 'object',
  fields: [{ name: 'placeholder', title: '_', type: 'string', hidden: true }],
  preview: {
    prepare() {
      return { title: '💃 Grille des Disciplines' }
    },
  },
})
