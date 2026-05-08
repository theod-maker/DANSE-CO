import { defineType, defineField } from 'sanity'

export const pageHeaderBlockType = defineType({
  name: 'pageHeaderBlock',
  title: '📌 En-tête de page',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Texte au-dessus du titre',
      type: 'string',
      description: 'Ex: CE QUE NOUS ENSEIGNONS',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Mot mis en valeur (violet italique)',
      type: 'string',
      description: 'Ex: Disciplines — doit être un mot du titre',
    }),
    defineField({
      name: 'subtitle',
      title: "Phrase d'introduction",
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `📌 ${title || 'En-tête'}` }
    },
  },
})
