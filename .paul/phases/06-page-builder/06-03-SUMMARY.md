---
phase: 06-page-builder
plan: 03
type: summary
status: complete
date: 2026-05-06
---

# 06-03 Summary — Blocs de données

## Done

- Created 7 complex data block components in `src/components/blocks/`:
  - DisciplinesGridBlock.tsx — useDisciplines(), renders DisciplineCard grid (md:grid-cols-2)
  - InstructorsGridBlock.tsx — useInstructors(), renders InstructorCard grid (md:grid-cols-3)
  - ScheduleBlock.tsx — wraps existing ScheduleGrid + RegistrationInfo
  - PricingBlock.tsx — usePricing(), renders PricingCard list + info panel
  - VenuesBlock.tsx — useVenues(), reuses existing VenueCard
  - NewsBlock.tsx — useNews(), reuses existing NewsSection
  - ContactBlock.tsx — useSiteInfo(), renders ContactForm + info panel with social links
- BlockRenderer.tsx updated — all 14 block types now fully implemented

## Verification

- `npx tsc --noEmit` → 0 errors
- 14 block components in src/components/blocks/ + BlockRenderer

## AC Status

- AC-1 ✅ Blocs de données rendus correctement
- AC-2 ✅ Blocs réutilisables
- AC-3 ✅ BlockRenderer complet — tous les types gérés
