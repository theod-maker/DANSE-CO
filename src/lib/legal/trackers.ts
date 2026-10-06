export interface Tracker {
  name: string
  purpose: string
  when: string
  lifetime: string
}

export const TRACKERS: readonly Tracker[] = [
  {
    name: 'td_measure_consent (cookie)',
    purpose: 'Garde votre choix sur la mesure des visites.',
    when: 'Dès que vous acceptez ou refusez.',
    lifetime: '6 mois',
  },
  {
    name: 'ph_…_posthog (cookie et stockage local)',
    purpose: 'Reconnaît votre navigateur d’une visite à l’autre pour la mesure détaillée.',
    when: 'Seulement si vous acceptez. Retiré si vous refusez ensuite.',
    lifetime: '12 mois au plus',
  },
  {
    name: '__ph_opt_in_out_… (cookie et stockage local)',
    purpose: 'Garde l’état de votre choix côté outil de mesure. C’est un témoin technique, y compris après un refus.',
    when: 'Dès que vous acceptez ou refusez.',
    lifetime: '12 mois au plus',
  },
]
