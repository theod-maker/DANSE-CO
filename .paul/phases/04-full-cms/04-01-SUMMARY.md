# Summary: 04-01 — Schemas Sanity

**Status:** COMPLETE
**Date:** 2026-05-06

## What was built

5 nouveaux fichiers de schemas Sanity créés, `homepage.ts` enrichi, `index.ts` et `sanity.config.ts` mis à jour.

### Nouveaux schemas
- `sanity/schemaTypes/siteInfo.ts` — singleton: phone, email, mailingAddress, instagramUrl, facebookUrl, twitterUrl, season, footerTagline
- `sanity/schemaTypes/discipline.ts` — liste: title, iconName (Zap/Star/Heart/Music), description, benefits[], order
- `sanity/schemaTypes/venue.ts` — liste: name, address, description, amenities[], mapEmbedUrl, googleMapsUrl, order
- `sanity/schemaTypes/registrationInfo.ts` — singleton: permanence1/2 (days/hours/venue), requiredDocuments[], photoNote
- `sanity/schemaTypes/pageTexts.ts` — singleton: 6 sous-titres de pages (planning, disciplines, locations, contact, instructors, pricing)

### Fichiers mis à jour
- `sanity/schemaTypes/homepage.ts` — 6 nouveaux champs: heroTagline, philosophyImage, featuredImage, featuredSectionLabel, servicesCard1Image, servicesCard2Image
- `sanity/schemaTypes/index.ts` — 5 nouveaux types enregistrés
- `sanity.config.ts` — 5 nouvelles sections dans la navigation du studio

## Verification

- `npx tsc --noEmit` → 0 erreur
- 10 fichiers dans schemaTypes/ dont les 5 nouveaux
- 6 nouveaux champs confirmés dans homepage.ts
- Tous les types exportés avec `export const`

## Decisions

Aucune décision non planifiée.

## Deferred

Aucun élément différé.
