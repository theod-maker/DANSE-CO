import { defineType, defineField } from 'sanity'

export const aboutBlockType = defineType({
  name: 'aboutBlock',
  title: '💬 À Propos',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Citation / accroche',
      type: 'text',
      rows: 3,
      description: "Grande phrase affichée en titre — ex: Une école de danse où chaque cours devient une invitation à se dépasser.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `💬 ${title?.slice(0, 50) || 'À Propos'}…` }
    },
  },
})
