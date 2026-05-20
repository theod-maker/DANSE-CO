---
phase: 04-full-cms
plan: 03
subsystem: ui
tags: [sanity, react, hooks, cms]

requires:
  - phase: 04-02
    provides: hooks useDisciplines, useVenues, useSiteInfo, usePageTexts, useRegistrationInfo

provides:
  - Zéro donnée métier hardcodée dans les composants React
  - Toutes les pages branchées sur les hooks Sanity avec fallbacks

affects: 05-photos-actus, 06-page-builder

tech-stack:
  added: []
  patterns: [hook-driven pages, conditional rendering sur URLs vides, fallback Unsplash images]

key-files:
  modified:
    - src/pages/Disciplines.tsx
    - src/pages/Locations.tsx
    - src/pages/Contact.tsx
    - src/pages/Planning.tsx
    - src/pages/Instructors.tsx
    - src/pages/Pricing.tsx
    - src/components/layout/AppFooter.tsx
    - src/components/planning/RegistrationInfo.tsx
    - src/components/asme/PhilosophySection.tsx
    - src/components/asme/FeaturedVideoSection.tsx
    - src/components/asme/ServicesSection.tsx
    - src/pages/AsmeIndex.tsx

key-decisions:
  - "Fallbacks Unsplash conservés pour images Sanity non encore renseignées"
  - "Boutons sociaux conditionnels (masqués si URL vide) pour éviter liens cassés"

duration: ~session
completed: 2026-05-08T00:00:00Z
---

# Phase 4 Plan 03: Branchement composants — Summary

**Toutes les pages et composants branchés sur les hooks Sanity — zéro donnée métier hardcodée.**

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Disciplines dynamiques | Pass | useDisciplines() + ICON_MAP Lucide |
| AC-2: Salles dynamiques | Pass | useVenues() + VenueCards |
| AC-3: Coordonnées et réseaux dynamiques | Pass | useSiteInfo() sur Contact + Footer |
| AC-4: Images homepage depuis Sanity | Pass | Fallback Unsplash si champs vides |
| AC-5: Liens sociaux AsmeIndex conditionnels | Pass | Masqués si URL vide |

## Files Modified

| File | Change |
|------|--------|
| `src/pages/Disciplines.tsx` | useDisciplines() + ICON_MAP Lucide + pageTexts |
| `src/pages/Locations.tsx` | useVenues() + pageTexts |
| `src/pages/Contact.tsx` | useSiteInfo() pour tél/email/adresse/réseaux |
| `src/pages/Planning.tsx` | siteInfo.season + pageTexts |
| `src/pages/Instructors.tsx` | pageTexts.instructorsSubtitle |
| `src/pages/Pricing.tsx` | pageTexts.pricingSubtitle |
| `src/components/layout/AppFooter.tsx` | siteInfo.footerTagline + liens sociaux conditionnels |
| `src/components/planning/RegistrationInfo.tsx` | useRegistrationInfo() + useSiteInfo() |
| `src/components/asme/PhilosophySection.tsx` | content.philosophyImageUrl \|\| fallback |
| `src/components/asme/FeaturedVideoSection.tsx` | content.featuredImageUrl + label conditionnels |
| `src/components/asme/ServicesSection.tsx` | servicesCard1/2ImageUrl \|\| fallback |
| `src/pages/AsmeIndex.tsx` | useSiteInfo() + heroTagline + boutons sociaux conditionnels |

## Verification

- `npm run build` → 0 erreur TypeScript ✓

## Next Phase Readiness

**Ready:**
- Site 100% CMS-driven avec fallbacks fonctionnels
- Studio accessible sur /studio

**Blockers:** Aucun

---
*Phase: 04-full-cms, Plan: 03*
*Completed: 2026-05-08*
