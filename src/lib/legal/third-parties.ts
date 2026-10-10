export interface ThirdParty {
  id: string
  hosts: readonly string[]
  purpose: string
  when: string
}

export const FONTS_ARE_SELF_HOSTED = true

const GOOGLE_FONTS: ThirdParty = {
  id: 'google-fonts',
  hosts: ['fonts.googleapis.com', 'fonts.gstatic.com'],
  purpose: 'Affichage des polices d’écriture du site.',
  when: 'À l’ouverture de chaque page.',
}

const GOOGLE_MAPS: ThirdParty = {
  id: 'google-maps',
  hosts: ['www.google.com', 'maps.googleapis.com', 'maps.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'],
  purpose: 'Cartes des salles de cours.',
  when: 'Seulement si vous cliquez sur « Afficher la carte », sur la page Contact ou sur la page présentant les salles.',
}

const VERCEL_BLOB: ThirdParty = {
  id: 'vercel-blob',
  hosts: ['*.public.blob.vercel-storage.com'],
  purpose: 'Images du site stockées chez l’hébergeur.',
  when: 'Sur les pages qui affichent des photos.',
}

const FORMSPREE: ThirdParty = {
  id: 'formspree',
  hosts: ['formspree.io'],
  purpose: 'Transmission du formulaire de contact.',
  when: 'Seulement au moment où vous envoyez le formulaire.',
}

const POSTHOG_RELAY: ThirdParty = {
  id: 'measurement',
  hosts: ['t.theodelporte.fr'],
  purpose: 'Mesure des visites, via un relais qui transmet à PostHog (Union européenne).',
  when: 'Sur les pages publiques, selon votre choix (voir la mesure des visites).',
}

export function listThirdParties(areFontsSelfHosted: boolean): ThirdParty[] {
  return [
    ...(areFontsSelfHosted ? [] : [GOOGLE_FONTS]),
    GOOGLE_MAPS,
    VERCEL_BLOB,
    FORMSPREE,
    POSTHOG_RELAY,
  ]
}
