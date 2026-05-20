---
phase: 01-responsive
plan: 01
subsystem: ui
tags: [tailwind, responsive, mobile, typography]
provides:
  - Titres h1/h2 corrects sur 375px (breakpoints sm:)
completed: 2026-05-08T00:00:00Z
---

# Phase 1 Plan 01: Titres responsive — Summary

**Breakpoints sm: ajoutés sur les 10 h1/h2 — aucun débordement mobile.**

## Acceptance Criteria Results

| Criterion | Status |
|-----------|--------|
| AC-1: Titres pages corrects sur 375px | Pass |
| AC-2: Titres composants corrects sur 375px | Pass |
| AC-3: Build TypeScript sans erreur | Pass |

## Files Modified

| File | Change |
|------|--------|
| `src/pages/AsmeIndex.tsx` | `text-5xl` → `text-3xl sm:text-5xl` |
| `src/pages/Disciplines.tsx` | `text-5xl` → `text-3xl sm:text-5xl` |
| `src/pages/Instructors.tsx` | `text-5xl` → `text-3xl sm:text-5xl` |
| `src/pages/Planning.tsx` | `text-5xl` → `text-3xl sm:text-5xl` |
| `src/pages/Pricing.tsx` | `text-5xl` → `text-3xl sm:text-5xl` |
| `src/pages/Locations.tsx` | `text-5xl` → `text-3xl sm:text-5xl` |
| `src/pages/Contact.tsx` | `text-5xl` → `text-3xl sm:text-5xl` |
| `src/components/asme/AboutSection.tsx` | `text-4xl` → `text-2xl sm:text-4xl` |
| `src/components/asme/PhilosophySection.tsx` | `text-5xl` → `text-3xl sm:text-5xl` |
| `src/components/asme/ServicesSection.tsx` | `text-3xl` → `text-2xl sm:text-3xl` |

---
*Completed: 2026-05-08*
