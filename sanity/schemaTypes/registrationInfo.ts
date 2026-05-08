import { defineType, defineField } from 'sanity'

export const registrationInfoType = defineType({
  name: 'registrationInfo',
  title: "Inscriptions",
  type: 'document',
  groups: [
    { name: 'permanences', title: '📅 Permanences' },
    { name: 'documents', title: '📄 Documents requis' },
  ],
  fields: [
    defineField({
      name: 'permanence1Days',
      title: 'Permanence 1 — Jours',
      type: 'string',
      group: 'permanences',
      description: "Ex: Lundis & Mercredis",
    }),
    defineField({
      name: 'permanence1Hours',
      title: 'Permanence 1 — Horaires',
      type: 'string',
      group: 'permanences',
      description: "Ex: 19h30 – 21h30",
    }),
    defineField({
      name: 'permanence1Venue',
      title: 'Permanence 1 — Salle',
      type: 'string',
      group: 'permanences',
      description: "Ex: Le Canopus",
    }),
    defineField({
      name: 'permanence2Days',
      title: 'Permanence 2 — Jours',
      type: 'string',
      group: 'permanences',
      description: "Ex: Samedis",
    }),
    defineField({
      name: 'permanence2Hours',
      title: 'Permanence 2 — Horaires',
      type: 'string',
      group: 'permanences',
      description: "Ex: 10h00 – 12h00",
    }),
    defineField({
      name: 'permanence2Venue',
      title: 'Permanence 2 — Salle',
      type: 'string',
      group: 'permanences',
      description: "Ex: Complexe de la Viauderie",
    }),
    defineField({
      name: 'requiredDocuments',
      title: "Documents à apporter",
      type: 'array',
      of: [{ type: 'string' }],
      group: 'documents',
      description: "Cliquez sur + pour ajouter un document. Chaque ligne = un document.",
    }),
    defineField({
      name: 'photoNote',
      title: "Note sur la photo d'identité",
      type: 'text',
      rows: 2,
      group: 'documents',
      description: "Affiché dans la carte 'Photo d'identité' sur la page planning.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Inscriptions" }
    },
  },
})
