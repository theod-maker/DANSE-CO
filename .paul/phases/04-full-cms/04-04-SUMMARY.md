---
phase: 04-full-cms
plan: 04
subsystem: ui
tags: [sanity, schedule, dynamic, reference, groq, react]

provides:
  - Planning dynamique — onglets dérivés des données Sanity
  - scheduleEntry.venue comme référence vers venue document
  - Tous les jours de la semaine disponibles dans le schéma

tech-stack:
  added: []
  patterns:
    - "Tabs dynamiques depuis données Sanity via useMemo + DAY_ORDER"
    - "Reference field Sanity + GROQ dereference (venue->name)"

key-files:
  modified:
    - sanity/schemaTypes/schedule.ts
    - sanity/schemaTypes/venue.ts
    - src/components/planning/ScheduleGrid.tsx
    - src/lib/sanityQueries.ts
    - src/lib/fallbackContent.ts
    - src/hooks/useSanity.ts
    - src/pages/Planning.tsx
    - src/components/blocks/ScheduleBlock.tsx

key-decisions:
  - "Venue string radio → reference: ferme le modèle de données, extensible sans schema change"
  - "activeDay = selectedDay || days[0] : auto-select premier onglet sans useEffect"
  - "venue?: string optionnel: MapPin masqué quand pas de salle assignée"

completed: 2026-05-09T17:30:00Z
---

# Phase 4 Plan 04: Améliorations CMS Planning — Summary

**Onglets planning dérivés dynamiquement de Sanity, venue comme référence de document, tous les jours de la semaine disponibles dans le schéma.**

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Build TypeScript sans erreur | Pass | ✓ built in 5.89s |
| AC-2: Onglets dynamiques (pas de hardcode) | Pass | useMemo + DAY_ORDER |
| AC-3: Tous les jours disponibles dans schéma | Pass | 8 options (Lundi→Dimanche + Samedi Stages) |
| AC-4: scheduleEntry.venue = reference | Pass | type: 'reference', to: [{type: 'venue'}] |
| AC-5: GROQ venue->name | Pass | "venue": venue->name |
| AC-6: venue optionnel (nullable) | Pass | venue?: string, MapPin conditionnel |
| AC-7: Pas de régression sécurité | Pass | Audit: 0 critique, 0 majeur |

## Fixes supplémentaires (autopilot workflow)

| Fix | Source | Sévérité |
|-----|--------|----------|
| useEffect reset selectedDay si onglet disparu | QA agent | Critique |
| Array.length > 0 guard dans useSanityData | QA agent | Warning |
| console.warn DEV dans catch useSanity | Security audit | Minor |
| Validation https sur mapEmbedUrl (iframe) | Security audit | Minor |
| MapPin conditionnel quand venue = undefined | QA agent | UX |

## Files Modified

| File | Change |
|------|--------|
| `sanity/schemaTypes/schedule.ts` | 8 jours dans radio + venue → reference |
| `sanity/schemaTypes/venue.ts` | Validation https sur mapEmbedUrl |
| `src/components/planning/ScheduleGrid.tsx` | Onglets dynamiques + useMemo + useEffect reset |
| `src/lib/sanityQueries.ts` | venue->name dereference |
| `src/lib/fallbackContent.ts` | venue?: string (optionnel) |
| `src/hooks/useSanity.ts` | Array guard + console.warn DEV |
| `src/pages/Planning.tsx` | Import named { ScheduleGrid } |
| `src/components/blocks/ScheduleBlock.tsx` | Import named { ScheduleGrid } |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Venue string → reference | Pas de doublon texte, extensible, cohérence si renommage | Prof doit re-sélectionner les salles existantes dans Studio |
| activeDay inline (pas useEffect) | Plus simple, pas d'état dérivé superflu | — |
| ScheduleGrid → named export | Cohérence code style (simplify agent) | Import mis à jour dans 2 fichiers |

## Note de migration

Les cours existants dans Sanity Studio ont perdu leur valeur `venue` (champ string → référence). Le prof devra re-sélectionner la salle sur chaque cours. À faire avant de saisir le planning final.

## Next Phase Readiness

**Ready:** Site prêt pour déploiement Vercel (Phase 3).
**Blockers:** Aucun.

---
*Phase: 04-full-cms, Plan: 04*
*Completed: 2026-05-09*
