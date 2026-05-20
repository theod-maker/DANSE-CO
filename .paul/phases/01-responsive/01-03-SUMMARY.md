---
phase: 01-responsive
plan: 03
subsystem: ui
tags: [tailwind, responsive, mobile, navbar, hero]
provides:
  - Navbar mobile scrollable et bien dimensionnée
  - Hero CTA visible sur 375px
  - ScheduleGrid lisible sur mobile
completed: 2026-05-08T00:00:00Z
---

# Phase 1 Plan 03: Navbar, hero, ScheduleGrid — Summary

**3 fichiers — correctifs structurels mobile : navbar, hero translate, planning.**

## Acceptance Criteria Results

| Criterion | Status |
|-----------|--------|
| AC-1: Navbar mobile scrollable | Pass |
| AC-2: Hero CTA visible sur 375px | Pass |
| AC-3: ScheduleGrid lisible mobile | Pass |
| AC-4: Build TypeScript sans erreur | Pass |

## Files Modified

| File | Change |
|------|--------|
| `src/components/layout/AppNavbar.tsx` | `max-h-[calc(100vh-100px)] overflow-y-auto`, `p-4 md:p-6`, liens `text-sm md:text-base` |
| `src/pages/AsmeIndex.tsx` | `-translate-y-[20%]` → `md:-translate-y-[20%]`, input `max-w-[calc(100vw-3rem)] md:max-w-md` |
| `src/components/planning/ScheduleGrid.tsx` | boutons `px-3 py-1.5 md:px-5 md:py-2`, items `p-4 md:p-6`, titre `text-base md:text-lg`, gaps `gap-2 md:gap-4` |

---
*Completed: 2026-05-08*
