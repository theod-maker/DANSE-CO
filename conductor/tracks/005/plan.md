# Track 005 Implementation Plan: Locations (Venue Cards & Map Integration)

## Objective
Implement a professional Locations page featuring the two main venues for dance classes.

## Implementation Steps

### Step 1: Component Development
-   Create `src/components/locations/VenueCard.tsx`.
-   Implement a two-column layout for the venue card (image/map on one side, text on the other).
-   Add Lucide icons for address and amenities.

### Step 2: Assemble Locations Page
-   Create `src/pages/Locations.tsx`.
-   Integrate both *Le Canopus* and *Salle Caraïbes*.
-   Include an introductory section about the facilities.

### Step 3: Integration
-   Add the `/locations` (or `/contact` if combined, but we'll stick to the plan) route to `App.tsx`.

## Verification & Testing
1.  **Map Display:** Verify that maps load correctly and show the right locations.
2.  **Responsiveness:** Check if cards stack correctly on mobile.
3.  **Link Verification:** Ensure the "Itinéraire" links open external maps correctly.
