---
phase: 02-email-form
plan: 01
subsystem: ui
tags: [formspree, contact, email, fetch]

provides:
  - Formulaire de contact fonctionnel avec envoi email réel
  - Gestion état error + success

tech-stack:
  added: [Formspree (service tiers, zero-dep)]
  patterns: [fetch POST vers service externe, FormData natif, variable d'env VITE_]

key-files:
  modified:
    - src/components/contact/ContactForm.tsx
    - .env.example

key-decisions:
  - "Formspree vs Resend: Formspree choisi car zero-dep, pas de backend requis pour Vite"
  - "Endpoint en variable d'env VITE_FORMSPREE_ENDPOINT pour séparer config du code"
  - "Export nommé (simplify agent): ContactForm → { ContactForm }"

completed: 2026-05-09T00:00:00Z
---

# Phase 2 Plan 01: Formulaire Email — Summary

**Formulaire de contact branché sur Formspree — emails reçus dans la boîte du professeur.**

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Email reçu à la soumission | Pass | Testé et confirmé par l'utilisateur |
| AC-2: Feedback visuel succès | Pass | Écran "Message envoyé" existant réutilisé |
| AC-3: Feedback visuel erreur réseau | Pass | Message "Erreur d'envoi, réessayez." |
| AC-4: Build TypeScript sans erreur | Pass | ✓ built in 5.99s |

## Files Modified

| File | Change |
|------|--------|
| `src/components/contact/ContactForm.tsx` | fetch Formspree, name attrs, état error, maxLength, named export |
| `src/components/blocks/ContactBlock.tsx` | Import mis à jour vers named export (simplify agent) |
| `src/pages/Contact.tsx` | Import mis à jour vers named export (simplify agent) |
| `.env.example` | VITE_FORMSPREE_ENDPOINT ajouté |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Formspree (zero-dep) | Vite pur, pas de backend, gratuit 50 msgs/mois | Aucune dépendance npm ajoutée |
| Variable d'env VITE_ | Séparation config/code, compatible Vercel | À configurer sur Vercel en phase 3 |
| e.currentTarget capturé avant await | Fix race condition si composant démonté pendant fetch | Sécurité |
| maxLength sur champs texte | Anti-spam quota Formspree (finding security audit) | 100/254/2000 chars |

## Deferred Issues

| Issue | Effort | Notes |
|-------|--------|-------|
| Destination email à changer vers prof | S | Fait manuellement dans dashboard Formspree |
| Pas de timeout sur fetch | S | Réseau très lent = bouton bloqué indéfiniment |

## Next Phase Readiness

**Ready:** Site fonctionnel avec formulaire réel. Prêt pour déploiement.
**Blockers:** `VITE_FORMSPREE_ENDPOINT` à ajouter dans les variables d'env Vercel (phase 3).

---
*Phase: 02-email-form, Plan: 01*
*Completed: 2026-05-09*
