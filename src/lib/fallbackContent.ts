export interface HomepageContent {
  heroImageUrl?: string
  heroTagline?: string
  heroTitle: string
  heroDescription: string
  aboutTitle: string
  philosophyTitle: string
  philosophyBlock1Label: string
  philosophyBlock1Text: string
  philosophyBlock2Label: string
  philosophyBlock2Text: string
  philosophyImageUrl?: string
  featuredVideoDescription: string
  featuredImageUrl?: string
  featuredSectionLabel?: string
  servicesSectionTitle: string
  servicesSectionSubtitle: string
  servicesCard1Description: string
  servicesCard1ImageUrl?: string
  servicesCard2Description: string
  servicesCard2ImageUrl?: string
}

export interface InstructorContent {
  _id: string
  name: string
  specialty: string
  bio: string
  experience: string
  photoUrl?: string
}

export interface ScheduleEntryContent {
  _id: string
  name: string
  day: string
  time: string
  venue: string
  level: string
}

export interface PricingRowContent {
  label: string
  price: string
  detail: string
  highlight?: boolean
}

export interface PricingContent {
  season: string
  rows: PricingRowContent[]
  infoItems: string[]
  membershipFee: string
}

export interface SiteInfoContent {
  phone: string
  email: string
  mailingAddress: string
  instagramUrl: string
  facebookUrl: string
  twitterUrl: string
  websiteUrl: string
  season: string
  footerTagline: string
}

export interface DisciplineContent {
  _id: string
  title: string
  iconName: 'Zap' | 'Star' | 'Heart' | 'Music'
  description: string
  benefits: string[]
  imageUrl?: string
}

export interface VenueContent {
  _id: string
  name: string
  address: string
  description: string
  amenities: string[]
  mapEmbedUrl: string
  googleMapsUrl: string
  imageUrl?: string
}

export interface RegistrationInfoContent {
  permanence1Days: string
  permanence1Hours: string
  permanence1Venue: string
  permanence2Days: string
  permanence2Hours: string
  permanence2Venue: string
  requiredDocuments: string[]
  photoNote: string
}

export interface NewsContent {
  _id: string
  title: string
  date: string
  imageUrl?: string
  excerpt: string
  link?: string
}

export interface PageTextsContent {
  planningSubtitle: string
  disciplinesSubtitle: string
  locationsSubtitle: string
  contactSubtitle: string
  instructorsSubtitle: string
  pricingSubtitle: string
}

export const fallbackHomepage: HomepageContent = {
  heroTitle: 'La danse, une passion à partager.',
  heroDescription: 'Rejoignez Danse&CO à Saint-Michel-Chef-Chef et explorez le monde de la danse en couple ou en solo, quel que soit votre niveau.',
  aboutTitle: 'Une école de danse où chaque cours devient une invitation à se dépasser, à rencontrer et à vibrer ensemble.',
  philosophyTitle: 'La danse comme art de vivre.',
  philosophyBlock1Label: 'NOTRE HISTOIRE',
  philosophyBlock1Text: 'Fondée en 2008 par des passionnés du bal, Danse&CO est née de l\'envie de créer un espace ouvert à tous — débutants curieux ou danseurs confirmés. Au fil des années, l\'association s\'est imposée comme un lieu de vie autant que d\'apprentissage, où la technique s\'enseigne dans la bonne humeur.',
  philosophyBlock2Label: 'NOTRE ENGAGEMENT',
  philosophyBlock2Text: 'Nous croyons que la danse est accessible à chacun. Nos enseignants diplômés adaptent leur pédagogie à chaque niveau et chaque personnalité. Ici, on apprend à son rythme, on progresse ensemble, et on célèbre chaque étape — de votre premier pas à votre première compétition.',
  featuredVideoDescription: 'Chez Danse&CO, la progression technique va de pair avec le plaisir. Nos cours sont conçus pour que vous repartiez chaque semaine avec de nouvelles clés, une plus grande aisance, et l\'envie de revenir.',
  servicesSectionTitle: 'Ce que nous proposons',
  servicesSectionSubtitle: 'Cours hebdomadaires & stages ponctuels',
  servicesCard1Description: 'Salsa, Bachata, Rock\'n\'Roll, Danses de salon, West Coast Swing, Tango... Découvrez l\'ensemble de nos disciplines et trouvez celle qui vous correspond.',
  servicesCard2Description: 'Des cours hebdomadaires progressifs et des stages intensifs le week-end, pour tous les niveaux. Consultez le planning et réservez votre place en quelques secondes.',
}

export const fallbackInstructors: InstructorContent[] = [
  {
    _id: 'dominique',
    name: 'Dominique',
    specialty: 'Danse Sportive & Salon',
    bio: 'Passionné par la technique et l\'élégance des danses de salon, Dominique enseigne avec précision et pédagogie depuis de nombreuses années.',
    experience: '25 ans de pratique',
    photoUrl: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=600&q=85',
  },
  {
    _id: 'sylvie',
    name: 'Sylvie',
    specialty: 'Salsa & Bachata',
    bio: 'Sylvie apporte l\'énergie et la chaleur des danses latines. Ses cours sont réputés pour leur ambiance conviviale et rythmée.',
    experience: '15 ans d\'enseignement',
    photoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=85',
  },
  {
    _id: 'jean-pierre',
    name: 'Jean-Pierre',
    specialty: 'Rock & Roll',
    bio: 'Le roi du swing ! Jean-Pierre vous fera vibrer sur les rythmes du Rock\'n\'Roll avec dynamisme et bonne humeur.',
    experience: '20 ans de passion',
    photoUrl: 'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=600&q=85',
  },
]

export const fallbackSchedule: ScheduleEntryContent[] = [
  { _id: 'mon-1', day: 'Lundi', name: 'Rock & Roll', level: 'Débutant', time: '19:30 - 20:30', venue: 'Le Canopus' },
  { _id: 'mon-2', day: 'Lundi', name: 'Salsa Cubaine', level: 'Intermédiaire', time: '20:30 - 21:30', venue: 'Le Canopus' },
  { _id: 'wed-1', day: 'Mercredi', name: 'Danses de Salon', level: 'Tous niveaux', time: '19:30 - 20:30', venue: 'Salle Caraïbes' },
  { _id: 'wed-2', day: 'Mercredi', name: 'West Coast Swing', level: 'Débutant', time: '20:30 - 21:30', venue: 'Salle Caraïbes' },
  { _id: 'sat-1', day: 'Samedi (Stages)', name: 'Stage Salsa', level: 'Workshop', time: '10:00 - 12:00', venue: 'Salle Caraïbes' },
  { _id: 'sat-2', day: 'Samedi (Stages)', name: 'Stage Tango / Chachacha', level: 'Workshop', time: '10:00 - 12:00', venue: 'Salle Caraïbes' },
  { _id: 'sat-3', day: 'Samedi (Stages)', name: 'Stage West Coast Swing', level: 'Workshop', time: '10:00 - 12:00', venue: 'Salle Caraïbes' },
]

export const fallbackSiteInfo: SiteInfoContent = {
  phone: '06.17.09.93.49',
  email: 'DANSANDCO@OUTLOOK.FR',
  mailingAddress: '17 Rue du Chevecier, 44730 Saint-Michel-Chef-Chef',
  instagramUrl: '',
  facebookUrl: '',
  twitterUrl: '',
  websiteUrl: '',
  season: '2025–2026',
  footerTagline: 'Saint-Michel-Chef-Chef · Saison 2025–2026',
}

export const fallbackDisciplines: DisciplineContent[] = [
  {
    _id: 'rock-roll',
    title: 'Rock & Roll',
    iconName: 'Zap',
    description: 'Le Rock est une danse dynamique et festive. Nous enseignons le pas de base en 6 temps, idéal pour s\'amuser rapidement en soirée.',
    benefits: ['Cardio', 'Énergie', 'Convivialité'],
  },
  {
    _id: 'danses-salon',
    title: 'Danses de Salon',
    iconName: 'Star',
    description: 'Apprenez les classiques de l\'élégance : Valse, Tango, Chachacha, Paso Doble et Rumba. Un voyage à travers les styles et les époques.',
    benefits: ['Posture', 'Élégance', 'Coordination'],
  },
  {
    _id: 'salsa-cubaine',
    title: 'Salsa Cubaine',
    iconName: 'Heart',
    description: 'Plongez dans les rythmes ensoleillés de Cuba. Une danse de couple fluide, joyeuse et accessible à tous.',
    benefits: ['Rythme', 'Lâcher-prise', 'Soleil'],
  },
  {
    _id: 'west-coast-swing',
    title: 'West Coast Swing',
    iconName: 'Music',
    description: 'La version moderne et fluide du swing. Se danse sur une grande variété de musiques actuelles (Pop, RnB, Blues).',
    benefits: ['Créativité', 'Musicalité', 'Modernité'],
  },
]

export const fallbackVenues: VenueContent[] = [
  {
    _id: 'canopus',
    name: 'Le Canopus',
    address: "129 Bd de l'Océan, 44730 Saint-Michel-Chef-Chef",
    description: "Située en bord de mer, cette salle spacieuse offre un cadre exceptionnel pour la pratique de la danse. C'est le lieu principal de nos cours du lundi soir.",
    amenities: ['Grand Parquet', 'Vue Mer', 'Parking Facile', 'Vestiaires'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2714.7371191076226!2d-2.146603023249033!3d47.11364507114945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480572b9a76d8b9b%3A0x6b4843f54802890!2sLe%20Canopus!5e0!3m2!1sfr!2sfr!4v1712250000000!5m2!1sfr!2sfr',
    googleMapsUrl: 'https://maps.app.goo.gl/uX7GfVzP7mZzR5wU9',
  },
  {
    _id: 'caraibes',
    name: 'Salle Caraïbes',
    address: 'Complexe de la Viauderie, 44730 Saint-Michel-Chef-Chef',
    description: 'Au sein du complexe sportif, cette salle est parfaitement équipée pour les cours de salon et les stages du samedi. Une ambiance conviviale et sportive garantie.',
    amenities: ['Espace Sportif', 'Miroirs', 'Accessibilité PMR', 'Équipement Son'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2714.800000000000!2d-2.138!3d47.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA2JzM2LjAiTiAywrAwOCcxNi44Ilc!5e0!3m2!1sfr!2sfr!4v1712251000000!5m2!1sfr!2sfr',
    googleMapsUrl: 'https://maps.app.goo.gl/uX7GfVzP7mZzR5wU9',
  },
]

export const fallbackRegistrationInfo: RegistrationInfoContent = {
  permanence1Days: 'Lundis & Mercredis',
  permanence1Hours: '19h30 – 21h30',
  permanence1Venue: 'Le Canopus',
  permanence2Days: 'Samedis',
  permanence2Hours: '10h00 – 12h00',
  permanence2Venue: 'Complexe de la Viauderie',
  requiredDocuments: [
    'La fiche d\'inscription remplie',
    'Un certificat médical (obligatoire)',
    'Le règlement de la cotisation',
  ],
  photoNote: 'Une photo d\'identité est nécessaire pour votre carte d\'adhérent (nouveaux membres uniquement).',
}

export const fallbackPageTexts: PageTextsContent = {
  planningSubtitle: 'Retrouvez tous nos créneaux hebdomadaires. Les cours ont lieu au Canopus et à la Salle Caraïbes.',
  disciplinesSubtitle: 'Explorez une grande variété de styles de danse, enseignés avec passion et expertise pour tous les niveaux.',
  locationsSubtitle: 'Deux espaces magnifiques à Saint-Michel-Chef-Chef, adaptés à tous les styles de danse.',
  contactSubtitle: 'Une question sur nos cours, les inscriptions ou un événement ? Nous sommes là pour vous répondre.',
  instructorsSubtitle: 'Une équipe de passionnés pour vous accompagner dans votre apprentissage, quel que soit votre niveau.',
  pricingSubtitle: 'Une tarification simple et transparente. Les tarifs sont annuels et incluent l\'adhésion à l\'association.',
}

export const fallbackNews: NewsContent[] = [
  {
    _id: 'news-1',
    title: 'Reprise des cours — Saison 2025-2026',
    date: '2025-09-01',
    excerpt: 'La nouvelle saison démarre en septembre ! Inscriptions ouvertes lors des permanences du lundi, mercredi et samedi.',
  },
  {
    _id: 'news-2',
    title: 'Stage Rock & Roll — Novembre',
    date: '2025-11-15',
    excerpt: 'Un week-end intensif pour progresser en Rock. Places limitées, inscrivez-vous rapidement lors des permanences.',
  },
]

export const fallbackPricing: PricingContent = {
  season: '2025 - 2026',
  rows: [
    { label: 'Individuel', price: '165 €', detail: 'Accès à 1 cours par semaine + stages' },
    { label: 'Couple', price: '310 €', detail: 'Tarif pour deux personnes (même foyer)', highlight: true },
    { label: 'Étudiant / -18 ans', price: '130 €', detail: 'Sur présentation d\'un justificatif' },
    { label: 'Cours Supplémentaire', price: '+ 80 €', detail: 'Pour une deuxième discipline' },
  ],
  infoItems: [
    'L\'adhésion annuelle à l\'association de 15 € est déjà incluse dans les tarifs ci-dessus.',
    'Le règlement peut s\'effectuer en 3 fois par chèques (encaissés en octobre, janvier et avril).',
    'Nous acceptons les chèques vacances ANCV.',
  ],
  membershipFee: '15',
}
