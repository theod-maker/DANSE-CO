# Summary: 04-02 — Data layer

**Status:** COMPLETE
**Date:** 2026-05-06

## What was built

### fallbackContent.ts
- Interface `HomepageContent` enrichie : 6 nouveaux champs optionnels (heroTagline, philosophyImageUrl, featuredImageUrl, featuredSectionLabel, servicesCard1ImageUrl, servicesCard2ImageUrl)
- 5 nouvelles interfaces : SiteInfoContent, DisciplineContent, VenueContent, RegistrationInfoContent, PageTextsContent
- 5 nouveaux fallbacks avec données réelles du site : fallbackSiteInfo, fallbackDisciplines, fallbackVenues, fallbackRegistrationInfo, fallbackPageTexts

### sanityQueries.ts
- `homepageQuery` étendu : 6 nouveaux champs (heroTagline, philosophyImageUrl, featuredImageUrl, featuredSectionLabel, servicesCard1ImageUrl, servicesCard2ImageUrl)
- 5 nouvelles queries : siteInfoQuery, disciplinesQuery, venuesQuery, registrationInfoQuery, pageTextsQuery

### useSanity.ts
- 5 nouveaux hooks : useSiteInfo(), useDisciplines(), useVenues(), useRegistrationInfo(), usePageTexts()
- Hooks existants non modifiés

## Verification

- `npx tsc --noEmit` → 0 erreur
- 9 hooks exportés, 8 fallbacks exportés, 9 queries exportées
- Tous les exports vérifiés

## Decisions

Aucune décision non planifiée.
