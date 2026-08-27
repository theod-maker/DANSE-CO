export interface PageSeoFields {
  title: string
  description: string
  imageUrl: string | null
}

export interface SeoPageDefinition {
  key: string
  label: string
  path: string
  isHomePage: boolean
  defaults: PageSeoFields
}

export const SEO_PAGES: SeoPageDefinition[] = [
  {
    key: 'accueil',
    label: 'Accueil',
    path: '/',
    isHomePage: true,
    defaults: {
      title: 'Dans&CO — Studio de danse à Saint-Michel-Chef-Chef',
      description:
        'Studio de danse sportif à Saint-Michel-Chef-Chef. Cours de Lindy Hop, West Coast Swing, danses de salon et plus. Inscriptions ouvertes.',
      imageUrl: null,
    },
  },
  {
    key: 'planning',
    label: 'Planning',
    path: '/planning',
    isHomePage: false,
    defaults: {
      title: 'Planning des Cours',
      description:
        'Consultez le planning des cours de danse Dans&CO. Horaires, jours et salles pour tous les niveaux à Saint-Michel-Chef-Chef.',
      imageUrl: null,
    },
  },
  {
    key: 'disciplines',
    label: 'Disciplines',
    path: '/disciplines',
    isHomePage: false,
    defaults: {
      title: 'Nos Disciplines',
      description:
        'Découvrez nos disciplines : Lindy Hop, West Coast Swing, Multidanses, Danse en ligne, cours enfants. Tous niveaux à Saint-Michel-Chef-Chef.',
      imageUrl: null,
    },
  },
  {
    key: 'professeurs',
    label: 'Professeurs',
    path: '/instructors',
    isHomePage: false,
    defaults: {
      title: 'Nos Professeurs',
      description:
        "Rencontrez l'équipe de Dans&CO. Des professeurs passionnés pour vous accompagner dans votre apprentissage de la danse à Saint-Michel-Chef-Chef.",
      imageUrl: null,
    },
  },
  {
    key: 'salles',
    label: 'Salles',
    path: '/locations',
    isHomePage: false,
    defaults: {
      title: 'Nos Salles',
      description:
        'Retrouvez Dans&CO au Canopus et à la salle Caraïbes à Saint-Michel-Chef-Chef. Adresses, cartes et accès.',
      imageUrl: null,
    },
  },
  {
    key: 'contact',
    label: 'Contact',
    path: '/contact',
    isHomePage: false,
    defaults: {
      title: 'Contact',
      description:
        'Contactez Dans&CO. Téléphone, email, adresse courrier. Nous répondons rapidement à toutes vos questions sur les cours de danse.',
      imageUrl: null,
    },
  },
  {
    key: 'histoire',
    label: 'Histoire',
    path: '/histoire',
    isHomePage: false,
    defaults: {
      title: 'Notre Histoire',
      description:
        "Découvrez l'histoire de Dans&CO, association de danse sportive à Saint-Michel-Chef-Chef en Loire-Atlantique.",
      imageUrl: null,
    },
  },
  {
    key: 'actualites',
    label: 'Actualités',
    path: '/actualites',
    isHomePage: false,
    defaults: {
      title: 'Actualités',
      description:
        'Actualités et événements de Dans&CO. Stages, compétitions, nouveautés de votre studio de danse à Saint-Michel-Chef-Chef.',
      imageUrl: null,
    },
  },
]

export function defaultSeoMap(): Record<string, PageSeoFields> {
  return Object.fromEntries(SEO_PAGES.map((page) => [page.key, page.defaults]))
}
