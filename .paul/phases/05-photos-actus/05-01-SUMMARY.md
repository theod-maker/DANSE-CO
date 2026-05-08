# Summary: 05-01 — Photos disciplines & salles

**Status:** COMPLETE
**Date:** 2026-05-07

## What was built

### Schemas Sanity
- `discipline.ts` — champ `image` ajouté (après `title`)
- `venue.ts` — champ `image` ajouté (après `description`)

### Data layer
- `fallbackContent.ts` — `imageUrl?: string` ajouté aux interfaces `DisciplineContent` et `VenueContent`
- `sanityQueries.ts` — `"imageUrl": image.asset->url` ajouté dans `disciplinesQuery` et `venuesQuery`

### Composants
- `Disciplines.tsx` — `DisciplineCard` affiche une photo en haut de carte (4 fallbacks Unsplash variés selon index)
- `VenueCard.tsx` — affiche la photo si `imageUrl` fourni, sinon la carte Google Maps iframe

## Verification
- `npx tsc --noEmit` → 0 erreur
- checkpoint:human-verify → approved
