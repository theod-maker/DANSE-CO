export interface ClassEntry {
  id: string;
  name: string;
  level: string;
  time: string;
  venue: string;
  day: string;
}

export const scheduleData: ClassEntry[] = [
  // Lundi - Le Canopus
  { id: 'mon-1', day: 'Lundi', name: 'Rock & Roll', level: 'Débutant', time: '19:30 - 20:30', venue: 'Le Canopus' },
  { id: 'mon-2', day: 'Lundi', name: 'Salsa Cubaine', level: 'Intermédiaire', time: '20:30 - 21:30', venue: 'Le Canopus' },
  
  // Mercredi - Salle Caraïbes (Viauderie)
  { id: 'wed-1', day: 'Mercredi', name: 'Danses de Salon', level: 'Tous niveaux', time: '19:30 - 20:30', venue: 'Salle Caraïbes' },
  { id: 'wed-2', day: 'Mercredi', name: 'West Coast Swing', level: 'Débutant', time: '20:30 - 21:30', venue: 'Salle Caraïbes' },
  
  // Samedi - Stages Spéciaux 2025
  { id: 'sat-1', day: 'Samedi (Stages)', name: 'Stage Salsa', level: 'Workshop', time: '10:00 - 12:00', venue: 'Salle Caraïbes' },
  { id: 'sat-2', day: 'Samedi (Stages)', name: 'Stage Tango / Chachacha', level: 'Workshop', time: '10:00 - 12:00', venue: 'Salle Caraïbes' },
  { id: 'sat-3', day: 'Samedi (Stages)', name: 'Stage West Coast Swing', level: 'Workshop', time: '10:00 - 12:00', venue: 'Salle Caraïbes' },
];

export const days = ['Lundi', 'Mercredi', 'Samedi (Stages)'];
