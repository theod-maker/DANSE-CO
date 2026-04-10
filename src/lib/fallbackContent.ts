export interface HomepageContent {
  heroImageUrl?: string
  heroTitle: string
  heroDescription: string
  aboutTitle: string
  philosophyTitle: string
  philosophyBlock1Label: string
  philosophyBlock1Text: string
  philosophyBlock2Label: string
  philosophyBlock2Text: string
  featuredVideoDescription: string
  servicesSectionTitle: string
  servicesSectionSubtitle: string
  servicesCard1Description: string
  servicesCard2Description: string
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
