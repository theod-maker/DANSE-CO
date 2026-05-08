import { defineType } from 'sanity'

export const instructorsGridBlockType = defineType({
  name: 'instructorsGridBlock',
  title: '👩‍🏫 Grille des Professeurs',
  type: 'object',
  fields: [{ name: 'placeholder', title: '_', type: 'string', hidden: true }],
  preview: {
    prepare() {
      return { title: '👩‍🏫 Grille des Professeurs' }
    },
  },
})
