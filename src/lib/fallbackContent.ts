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
  venue?: string
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
  iconName: 'Zap' | 'Star' | 'Heart' | 'Music' | 'Users'
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
  heroTitle: 'Danser est une passion, à Saint-Michel c\'est encore mieux.',
  heroDescription: 'Rejoignez Dans&CO à Saint-Michel-Chef-Chef et explorez le monde de la danse en couple ou en solo, quel que soit votre niveau.',
  aboutTitle: 'Un studio de danse où chaque cours devient une invitation à se dépasser, à rencontrer et à vibrer ensemble.',
  philosophyTitle: 'La danse comme art de vivre.',
  philosophyBlock1Label: 'NOTRE HISTOIRE',
  philosophyBlock1Text: 'Fondée en 2008 par des passionnés du bal, Dans&CO est née de l\'envie de créer un espace ouvert à tous — débutants curieux ou danseurs confirmés. Au fil des années, l\'association s\'est imposée comme un lieu de vie autant que d\'apprentissage, où la technique s\'enseigne dans la bonne humeur.',
  philosophyBlock2Label: 'NOTRE ENGAGEMENT',
  philosophyBlock2Text: 'Nous croyons que la danse est accessible à chacun. Nos enseignants diplômés adaptent leur pédagogie à chaque niveau et chaque personnalité. Ici, on apprend à son rythme, on progresse ensemble, et on célèbre chaque étape — de votre premier pas à votre première compétition.',
  featuredVideoDescription: 'Chez Dans&CO, la progression technique va de pair avec le plaisir. Nos cours sont conçus pour que vous repartiez chaque semaine avec de nouvelles clés, une plus grande aisance, et l\'envie de revenir.',
  servicesSectionTitle: 'Ce que nous proposons',
  servicesSectionSubtitle: 'Cours hebdomadaires & stages ponctuels',
  servicesCard1Description: 'Salsa, Bachata, Rock\'n\'Roll, Danses de salon, West Coast Swing, Tango... Découvrez l\'ensemble de nos disciplines et trouvez celle qui vous correspond.',
  servicesCard2Description: 'Des cours hebdomadaires progressifs et des stages intensifs le week-end, pour tous les niveaux. Consultez le planning et réservez votre place en quelques secondes.',
}

export const fallbackInstructors: InstructorContent[] = [
  {
    _id: 'adrien-mullot',
    name: 'Adrien Mullot',
    specialty: 'Professeur',
    bio: 'Passionné de danse depuis l\'âge de 16 ans, j\'ai construit mon parcours entre compétition et transmission. Ces expériences m\'ont appris une chose essentielle : la danse est avant tout un moment de partage, de plaisir et de dépassement de soi. Aujourd\'hui j\'accompagne mes élèves avec énergie et bienveillance pour leur faire découvrir le plaisir de danser et progresser à leur rythme. Que ce soit pour apprendre, se perfectionner ou préparer une compétition ou une ouverture de bal, chaque cours est pensé pour allier technique, convivialité et passion. Mon objectif est de vous faire vivre la danse avec passion et vous donner envie de revenir à chaque cours.',
    experience: '',
    photoUrl: '',
  },
]

export const fallbackSchedule: ScheduleEntryContent[] = [
  { _id: 'mon-1', day: 'Lundi', name: 'Rock & Roll', level: 'Débutant', time: '19:30 - 20:30', venue: 'Le Canopus' },
  { _id: 'mon-2', day: 'Lundi', name: 'Salsa Cubaine', level: 'Intermédiaire', time: '20:30 - 21:30', venue: 'Le Canopus' },
  { _id: 'wed-1', day: 'Mercredi', name: 'Swing / Multidanses', level: 'Tous niveaux', time: '19:30 - 20:30', venue: 'Salle Caraïbes' },
  { _id: 'wed-2', day: 'Mercredi', name: 'Salsa 1', level: 'Débutant', time: '20:30 - 21:30', venue: 'Salle Caraïbes' },
  { _id: 'wed-3', day: 'Mercredi', name: 'Salsa 2', level: 'Intermédiaire', time: '21:30 - 22:30', venue: 'Salle Caraïbes' },
  { _id: 'sat-1', day: 'Samedi', name: 'Danse en ligne débutants', level: 'Adultes débutants', time: '10:00 - 11:00', venue: 'Salle Caraïbes' },
  { _id: 'sat-2', day: 'Samedi', name: 'Cours enfants', level: 'À partir de 8 ans', time: '11:00 - 12:00', venue: 'Salle Caraïbes' },
]

export const fallbackSiteInfo: SiteInfoContent = {
  phone: '06.17.09.93.49',
  email: 'DANSANDCO@OUTLOOK.FR',
  mailingAddress: '17 Rue du Chevecier, 44730 Saint-Michel-Chef-Chef',
  instagramUrl: 'https://www.instagram.com/dansandcosaintmichel/',
  facebookUrl: 'https://www.facebook.com/dansandco/',
  twitterUrl: '',
  websiteUrl: '',
  season: '2026–2027',
  footerTagline: 'Saint-Michel-Chef-Chef · Saison 2026–2027',
}

export const fallbackDisciplines: DisciplineContent[] = [
  {
    _id: 'rock-roll',
    title: 'Rock & Roll',
    iconName: 'Zap',
    description: "Danse dynamique née dans les années 1950 aux États-Unis. Inspirée du swing, elle se danse à deux avec des pas rapides, des tours et beaucoup d'énergie. Popularisée par des artistes comme Elvis Presley, elle incarne le rythme et l'esprit festif des années 50.",
    benefits: ['Cardio', 'Énergie', 'Convivialité'],
  },
  {
    _id: 'salsa-cubaine',
    title: 'Salsa Cubaine',
    iconName: 'Heart',
    description: "Danse de couple née à Cuba dans les années 1940-1950. Rythmée et joyeuse, elle combine pas rapides, tours et figures en cercle appelées « Rueda ».",
    benefits: ['Rythme', 'Lâcher-prise', 'Convivialité'],
  },
  {
    _id: 'west-coast-swing',
    title: 'West Coast Swing',
    iconName: 'Music',
    description: "Danse à deux née aux États-Unis dans les années 1940-1950, issue du Lindy Hop. Elle se danse sur différents styles de musiques et se distingue par ses mouvements fluides avec un style élégant et décontracté.",
    benefits: ['Créativité', 'Musicalité', 'Élégance'],
  },
  {
    _id: 'lindy-hop',
    title: 'Lindy Hop',
    iconName: 'Zap',
    description: "Danse swing née dans les années 1920 à New York. Elle se danse à deux et se caractérise par son énergie, son improvisation et ses mouvements dynamiques. Elle est aujourd'hui l'une des danses swing les plus pratiquées dans le monde.",
    benefits: ['Énergie', 'Improvisation', 'Convivialité'],
  },
  {
    _id: 'multidanses',
    title: 'Multidanses',
    iconName: 'Music',
    description: "Explorez plusieurs styles de danse comme le chachacha, le tango, le rock'n roll ou encore la salsa. Chaque rythme a sa magie et permet de découvrir de nouvelles techniques tout en s'amusant.",
    benefits: ['Variété', 'Découverte', 'Technique'],
  },
  {
    _id: 'danse-en-ligne',
    title: 'Danse en ligne',
    iconName: 'Users',
    description: "Danse collective où l'on peut venir seul, tout le monde suit une même chorégraphie. Facile à apprendre et très conviviale, elle se danse sur tous les styles de musique : rumba, shim sham, chachacha, salsa.",
    benefits: ['Collectif', 'Accessible', 'Convivialité'],
  },
  {
    _id: 'danses-de-salon',
    title: 'Danses de salon',
    iconName: 'Star',
    description: "Valse, tango, foxtrot, quickstep... Les danses de salon rassemblent les grandes danses de couple issues de la tradition européenne. Élégantes et accessibles, elles s'apprennent en duo et s'adaptent à tous les niveaux.",
    benefits: ['Élégance', 'Technique', 'Complicité'],
  },
  {
    _id: 'cours-enfants',
    title: 'Cours enfants',
    iconName: 'Star',
    description: "Nos petits danseurs découvrent le rythme, la coordination et la créativité à travers les danses latines : samba, chachacha, rumba, paso doble, jive. Une façon ludique de bouger, s'amuser et prendre confiance dès le plus jeune âge.",
    benefits: ['Rythme', 'Créativité', 'Confiance en soi'],
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
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Le+Canopus+129+Boulevard+de+l%27Océan+44730+Saint-Michel-Chef-Chef',
  },
  {
    _id: 'caraibes',
    name: 'Salle Caraïbes',
    address: 'Complexe de la Viauderie, 44730 Saint-Michel-Chef-Chef',
    description: 'Au sein du complexe sportif, cette salle est parfaitement équipée pour les cours de salon et les stages du samedi. Une ambiance conviviale et sportive garantie.',
    amenities: ['Espace Sportif', 'Miroirs', 'Accessibilité PMR', 'Équipement Son'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2714.800000000000!2d-2.138!3d47.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA2JzM2LjAiTiAywrAwOCcxNi44Ilc!5e0!3m2!1sfr!2sfr!4v1712251000000!5m2!1sfr!2sfr',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Complexe+sportif+de+la+Viauderie+44730+Saint-Michel-Chef-Chef',
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
    title: 'Reprise des cours — Saison 2026-2027',
    date: '2026-09-01',
    imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80',
    excerpt: 'La nouvelle saison démarre en septembre ! Inscriptions ouvertes lors des permanences du lundi, mercredi et samedi. Venez nombreux.',
  },
  {
    _id: 'news-2',
    title: 'Stage Rock & Roll — Week-end intensif',
    date: '2026-11-15',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
    excerpt: 'Un week-end intensif pour progresser en Rock. Tous niveaux bienvenus. Places limitées — inscrivez-vous rapidement lors des permanences.',
    link: 'https://dansandco.wixsite.com/dansandco',
  },
  {
    _id: 'news-3',
    title: 'Compétition régionale — Nos danseurs au top',
    date: '2026-10-20',
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
    excerpt: 'Nos couples de compétition ont brillé lors du championnat régional. Bravo à tous pour cette belle représentation du club !',
  },
  {
    _id: 'news-4',
    title: 'Initiation gratuite — Portes ouvertes',
    date: '2026-09-14',
    imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80',
    excerpt: 'Venez essayer la danse gratuitement lors de notre journée portes ouvertes. Salsa, Rock, Valse — une initiation pour chaque style.',
  },
  {
    _id: 'news-5',
    title: 'Bal de fin de saison — Juin 2026',
    date: '2026-06-07',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    excerpt: 'La saison se termine en beauté avec notre bal annuel. Venez danser et fêter ensemble une année riche en émotions et en progrès.',
  },
  {
    _id: 'news-6',
    title: 'Nouveauté — Cours Lindy Hop débutants',
    date: '2026-10-01',
    imageUrl: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
    excerpt: 'Nouveau créneau Lindy Hop pour les débutants le mercredi soir. Le swing américain des années 30 s\'invite à Saint-Michel-Chef-Chef !',
  },
]

export const fallbackPricing: PricingContent = {
  season: '2026 - 2027',
  rows: [
    { label: '1h de cours — Solo', price: '220 €', detail: '' },
    { label: '1h de cours — Couple', price: '380 €', detail: '' },
    { label: '2h de cours — Solo', price: '370 €', detail: '' },
    { label: '2h de cours — Couple', price: '630 €', detail: '', highlight: true },
    { label: 'Full Pass — Solo', price: '460 €', detail: '' },
    { label: 'Full Pass — Couple', price: '740 €', detail: '' },
    { label: 'Cours enfants', price: '190 €', detail: '' },
    { label: 'Solo Samedi', price: '190 €', detail: '' },
  ],
  infoItems: [],
  membershipFee: '',
}
