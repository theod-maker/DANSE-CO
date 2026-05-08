import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z0uyxhwg',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const pages = [
  {
    _id: 'page-home',
    _type: 'page',
    title: "Page d'accueil",
    slug: '/',
    blocks: [
      {
        _type: 'heroBlock',
        _key: 'hero-1',
        tagline: 'École de Danse · Saint-Michel-Chef-Chef',
        title: 'La danse, une passion à partager.',
        description: 'Rejoignez Danse&CO à Saint-Michel-Chef-Chef et explorez le monde de la danse en couple ou en solo, quel que soit votre niveau.',
        ctaLabel: 'Voir le planning',
        ctaLink: '/planning',
      },
      {
        _type: 'aboutBlock',
        _key: 'about-1',
        title: "Une école de danse où chaque cours devient une invitation à se dépasser, à rencontrer et à vibrer ensemble.",
      },
      {
        _type: 'featuredVideoBlock',
        _key: 'featured-1',
        description: "Chez Danse&CO, la progression technique va de pair avec le plaisir. Nos cours sont conçus pour que vous repartiez chaque semaine avec de nouvelles clés, une plus grande aisance, et l'envie de revenir.",
      },
      {
        _type: 'philosophyBlock',
        _key: 'philosophy-1',
        title: 'La danse comme art de vivre.',
        block1Label: 'NOTRE HISTOIRE',
        block1Text: "Fondée en 2008 par des passionnés du bal, Danse&CO est née de l'envie de créer un espace ouvert à tous — débutants curieux ou danseurs confirmés. Au fil des années, l'association s'est imposée comme un lieu de vie autant que d'apprentissage, où la technique s'enseigne dans la bonne humeur.",
        block2Label: 'NOTRE ENGAGEMENT',
        block2Text: "Nous croyons que la danse est accessible à chacun. Nos enseignants diplômés adaptent leur pédagogie à chaque niveau et chaque personnalité. Ici, on apprend à son rythme, on progresse ensemble, et on célèbre chaque étape — de votre premier pas à votre première compétition.",
      },
      {
        _type: 'servicesBlock',
        _key: 'services-1',
        sectionTitle: 'Ce que nous proposons',
        sectionSubtitle: 'Cours hebdomadaires & stages ponctuels',
        card1Description: "Salsa, Bachata, Rock'n'Roll, Danses de salon, West Coast Swing, Tango... Découvrez l'ensemble de nos disciplines et trouvez celle qui vous correspond.",
        card2Description: "Des cours hebdomadaires progressifs et des stages intensifs le week-end, pour tous les niveaux. Consultez le planning et réservez votre place en quelques secondes.",
      },
      {
        _type: 'newsBlock',
        _key: 'news-1',
      },
      {
        _type: 'ctaBlock',
        _key: 'cta-1',
        title: 'Rejoignez-nous',
        description: 'Des cours pour tous les niveaux, toute la saison. Inscrivez-vous dès maintenant.',
        buttonLabel: "S'inscrire",
        buttonLink: '/planning',
      },
    ],
  },
  {
    _id: 'page-disciplines',
    _type: 'page',
    title: 'Disciplines',
    slug: '/disciplines',
    blocks: [
      {
        _type: 'pageHeaderBlock',
        _key: 'header-1',
        eyebrow: 'CE QUE NOUS ENSEIGNONS',
        title: 'Nos Disciplines',
        titleHighlight: 'Disciplines',
        subtitle: 'De la salsa au tango, explorez nos danses et trouvez votre style.',
      },
      {
        _type: 'disciplinesGridBlock',
        _key: 'disciplines-1',
      },
    ],
  },
  {
    _id: 'page-instructors',
    _type: 'page',
    title: 'Professeurs',
    slug: '/instructors',
    blocks: [
      {
        _type: 'pageHeaderBlock',
        _key: 'header-1',
        eyebrow: "L'ÉQUIPE",
        title: 'Vos Professeurs',
        titleHighlight: 'Professeurs',
        subtitle: 'Des enseignants passionnés et diplômés, à votre écoute à chaque cours.',
      },
      {
        _type: 'instructorsGridBlock',
        _key: 'instructors-1',
      },
    ],
  },
  {
    _id: 'page-planning',
    _type: 'page',
    title: 'Planning',
    slug: '/planning',
    blocks: [
      {
        _type: 'pageHeaderBlock',
        _key: 'header-1',
        eyebrow: 'SAISON 2024-2025',
        title: 'Planning des Cours',
        titleHighlight: 'Cours',
        subtitle: 'Retrouvez tous les horaires de la saison et inscrivez-vous facilement.',
      },
      {
        _type: 'scheduleBlock',
        _key: 'schedule-1',
      },
    ],
  },
  {
    _id: 'page-pricing',
    _type: 'page',
    title: 'Tarifs',
    slug: '/pricing',
    blocks: [
      {
        _type: 'pageHeaderBlock',
        _key: 'header-1',
        eyebrow: 'SAISON 2024-2025',
        title: 'Nos Tarifs',
        titleHighlight: 'Tarifs',
        subtitle: 'Des formules adaptées à chaque profil, avec cotisation annuelle à partir de 10 €.',
      },
      {
        _type: 'pricingBlock',
        _key: 'pricing-1',
      },
    ],
  },
  {
    _id: 'page-locations',
    _type: 'page',
    title: 'Salles',
    slug: '/locations',
    blocks: [
      {
        _type: 'pageHeaderBlock',
        _key: 'header-1',
        eyebrow: 'OÙ NOUS TROUVER',
        title: 'Nos Salles',
        titleHighlight: 'Salles',
        subtitle: 'Deux espaces de danse en Loire-Atlantique, accessibles et bien équipés.',
      },
      {
        _type: 'venuesBlock',
        _key: 'venues-1',
      },
    ],
  },
  {
    _id: 'page-contact',
    _type: 'page',
    title: 'Contact',
    slug: '/contact',
    blocks: [
      {
        _type: 'pageHeaderBlock',
        _key: 'header-1',
        eyebrow: 'NOUS ÉCRIRE',
        title: 'Contactez-nous',
        titleHighlight: 'nous',
        subtitle: 'Une question sur les cours, les inscriptions ou un stage ? Écrivez-nous, nous répondons sous 24h.',
      },
      {
        _type: 'contactBlock',
        _key: 'contact-1',
      },
    ],
  },
]

async function seed() {
  for (const page of pages) {
    await client.createOrReplace(page)
    console.log(`✓ ${page.title} (${page.slug})`)
  }
  console.log('Done.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
