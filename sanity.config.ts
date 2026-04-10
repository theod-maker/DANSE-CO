import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

const projectId = 'z0uyxhwg'
const dataset = 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Danse&CO — Studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Page d\'accueil')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.divider(),
            S.listItem()
              .title('Professeurs')
              .child(S.documentTypeList('instructor').title('Professeurs')),
            S.listItem()
              .title('Planning des cours')
              .child(S.documentTypeList('scheduleEntry').title('Cours')),
            S.listItem()
              .title('Tarifs')
              .child(
                S.document()
                  .schemaType('pricing')
                  .documentId('pricing')
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
