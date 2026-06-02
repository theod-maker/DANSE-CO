import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemaTypes'

const projectId = 'z0uyxhwg'
const dataset = 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Danse&CO',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu du site')
          .items([
            S.listItem()
              .title('🏠 Page d\'accueil')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.listItem()
              .title('⚙️ Informations générales')
              .child(
                S.document()
                  .schemaType('siteInfo')
                  .documentId('siteInfo')
              ),
            S.divider(),
            S.listItem()
              .title('💃 Disciplines')
              .child(S.documentTypeList('discipline').title('Disciplines')),
            S.listItem()
              .title('👩‍🏫 Professeurs')
              .child(S.documentTypeList('instructor').title('Professeurs')),
            S.listItem()
              .title('📅 Planning des cours')
              .child(S.documentTypeList('scheduleEntry').title('Cours')),
            S.listItem()
              .title('🏛️ Salles')
              .child(S.documentTypeList('venue').title('Salles')),
            S.divider(),
            S.listItem()
              .title('💰 Tarifs')
              .child(
                S.document()
                  .schemaType('pricing')
                  .documentId('pricing')
              ),
            S.listItem()
              .title('📝 Inscriptions')
              .child(
                S.document()
                  .schemaType('registrationInfo')
                  .documentId('registrationInfo')
              ),
            S.divider(),
            S.listItem()
              .title('🔤 Textes des pages')
              .child(
                S.document()
                  .schemaType('pageTexts')
                  .documentId('pageTexts')
              ),
            S.divider(),
            S.listItem()
              .title('📢 Actualités')
              .child(S.documentTypeList('news').title('Actualités')),
            S.divider(),
            S.listItem()
              .title('🗂️ Pages')
              .child(S.documentTypeList('page').title('Pages du site')),
          ]),
    }),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.NODE_ENV === 'production'
          ? 'https://danse-co.vercel.app'
          : 'http://localhost:5247',
        preview: '/',
        draftMode: {
          enable: '/api/draft/enable',
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
