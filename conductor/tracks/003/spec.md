# Track 003 Specification: Homepage (Hero & Introduction)

## Overview
This track focuses on the Homepage's primary visual and informational sections: the Hero (first impression) and the "Qui sommes-nous" (Introduction) section.

## Requirements
1.  **Hero Section:**
    -   Large, high-impact headline: "Faites le premier pas avec Danse & CO".
    -   Supportive subtext highlighting the 2025-2026 season.
    -   Primary CTA: "Voir le Planning" (leads to /planning).
    -   Secondary CTA: "Nos Disciplines" (leads to /disciplines).
    -   Visual background: Elegant gradient or high-quality placeholder image of dancers in motion.
2.  **Introduction Section ("L'Esprit Danse & CO"):**
    -   Clean layout with a mix of text and an image.
    -   Key selling points: Professionalism, Conviviality, Variety of styles.
    -   Short description of the association's mission in Saint-Michel-Chef-Chef.

## Design Decisions (Stitch Inspired)
-   **Hero Height:** Full screen (100vh) or large (80vh) to create impact.
-   **Typography:** Large font sizes for headlines (using `clamp()`).
-   **Contrast:** High contrast between text and background for readability and "pro" feel.
-   **Animations:** Use `framer-motion` for a smooth entrance of text elements.

## Deliverables
-   `src/pages/Home.tsx` (fully implemented).
-   `src/components/home/Hero.tsx` and `src/components/home/Hero.module.css`.
-   `src/components/home/Introduction.tsx` and `src/components/home/Introduction.module.css`.
