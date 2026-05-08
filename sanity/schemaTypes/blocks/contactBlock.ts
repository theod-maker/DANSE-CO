import { defineType } from 'sanity'

export const contactBlockType = defineType({
  name: 'contactBlock',
  title: '✉️ Formulaire de Contact',
  type: 'object',
  fields: [{ name: 'placeholder', title: '_', type: 'string', hidden: true }],
  preview: {
    prepare() {
      return { title: '✉️ Formulaire de Contact' }
    },
  },
})
