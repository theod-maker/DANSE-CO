import { defineType, defineField } from 'sanity'

export const venueType = defineType({
  name: 'venue',
  title: 'Salle',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la salle',
      type: 'string',
      description: "Ex: Le Canopus, Salle Caraïbes",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      description: "Adresse complète affichée sur la page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: "Quelques phrases pour présenter la salle.",
    }),
    defineField({
      name: 'image',
      title: 'Photo de la salle',
      type: 'image',
      options: { hotspot: true },
      description: "Si une photo est fournie, elle remplace la carte Google Maps.",
    }),
    defineField({
      name: 'amenities',
      title: 'Équipements',
      type: 'array',
      of: [{ type: 'string' }],
      description: "Badges affichés sur la carte. Ex: Grand Parquet, Vue Mer, Parking Facile",
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Lien Google Maps',
      type: 'url',
      description: "Lien cliquable vers Google Maps. Ouvrez la salle sur maps.google.fr → Partager → Copier le lien",
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: "Lien d'intégration de la carte",
      type: 'url',
      description: "Pour afficher la carte dans la page. Sur Google Maps → Partager → Intégrer une carte → copiez le lien src=\" … \"",
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'order',
      title: "Position dans la liste",
      type: 'number',
      description: "1 = affichée en premier",
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'address' },
    prepare({ title, subtitle }) {
      return { title: title || 'Salle sans nom', subtitle }
    },
  },
})
