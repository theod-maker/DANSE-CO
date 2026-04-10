# Track 003 Implementation Plan: Homepage (Hero & Introduction)

## Objective
Implement a high-impact, professional Homepage that immediately conveys the association's value.

## Implementation Steps

### Step 1: Component Directories
-   `mkdir -p src/components/home src/pages`

### Step 2: Build the Hero Component
-   Create `src/components/home/Hero.tsx`.
-   Implement dynamic background (gradient/placeholder).
-   Add CTAs with `react-router-dom` `Link`.
-   Define styles in `src/components/home/Hero.module.css`.

### Step 3: Build the Introduction Component
-   Create `src/components/home/Introduction.tsx`.
-   Add the "L'Esprit Danse & CO" content.
-   Implement a two-column grid (text/image).
-   Define styles in `src/components/home/Introduction.module.css`.

### Step 4: Create the Home Page
-   Create `src/pages/Home.tsx`.
-   Assemble `<Hero />` and `<Introduction />`.
-   Update `src/App.tsx` to use this new page.

## Verification & Testing
1.  **Visual Impact:** Verify the hero section's mobile/desktop scaling.
2.  **Navigation:** Ensure CTA buttons correctly link to their respective routes.
3.  **Animations:** Confirm that text enters the screen smoothly via Framer Motion.
