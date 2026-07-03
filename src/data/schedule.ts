export interface ClassEntry {
  id: string;
  name: string;
  level: string;
  time: string;
  venue: string;
  day: string;
}

export const scheduleData: ClassEntry[] = [
  { id: 'mon-1', day: 'Lundi', name: 'Danse en ligne', level: 'Tous niveaux', time: '10:00 - 11:00', venue: '' },
  { id: 'mon-2', day: 'Lundi', name: 'Danse de salon', level: 'Tous niveaux', time: '11:00 - 12:00', venue: '' },
  { id: 'mon-3', day: 'Lundi', name: 'West coast swing 1', level: 'Débutant', time: '19:30 - 20:30', venue: '' },
  { id: 'mon-4', day: 'Lundi', name: 'Danse de salon', level: 'Tous niveaux', time: '20:30 - 21:30', venue: '' },
  { id: 'wed-1', day: 'Mercredi', name: 'Cours pré-ado danse sportive', level: 'Pré-ados', time: '17:30 - 18:30', venue: '' },
  { id: 'wed-2', day: 'Mercredi', name: 'Cours ado danse sportive', level: 'Ados', time: '18:30 - 19:30', venue: '' },
  { id: 'wed-3', day: 'Mercredi', name: 'Salsa cubaine 1', level: 'Débutant', time: '19:30 - 20:30', venue: '' },
  { id: 'wed-4', day: 'Mercredi', name: 'Salsa cubaine 2', level: 'Intermédiaire', time: '20:30 - 21:30', venue: '' },
  { id: 'wed-5', day: 'Mercredi', name: 'Lady styling latino', level: 'Tous niveaux', time: '21:30 - 22:30', venue: '' },
  { id: 'thu-1', day: 'Jeudi', name: 'Rock And Swing', level: 'Tous niveaux', time: '19:30 - 20:30', venue: '' },
  { id: 'thu-2', day: 'Jeudi', name: 'Lindy hop 1', level: 'Débutant', time: '20:30 - 21:30', venue: '' },
  { id: 'fri-1', day: 'Vendredi', name: 'Danse en ligne', level: 'Tous niveaux', time: '10:00 - 11:00', venue: '' },
  { id: 'sat-1', day: 'Samedi', name: 'Cours adultes solo', level: 'Adultes', time: '10:00 - 11:00', venue: '' },
  { id: 'sat-2', day: 'Samedi', name: 'Cours enfants danse sportive 2', level: 'Enfants', time: '11:00 - 12:00', venue: '' },
];

export const days = ['Lundi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
