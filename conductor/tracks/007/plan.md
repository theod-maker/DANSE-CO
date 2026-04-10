# Track 007 Implementation Plan: Disciplines & Pricing (Info & Tables)

## Objective
Implement professional pages for course disciplines and membership pricing.

## Implementation Steps

### Step 1: Component Development
-   Create `src/components/pricing/PricingTable.tsx`.
-   Design a modern, high-contrast table for fees.
-   Add info about registration fees (Adhésion).

### Step 2: Assemble Pages
-   Create `src/pages/Disciplines.tsx` with detailed cards for each style.
-   Create `src/pages/Pricing.tsx` (using the table).

### Step 3: Integration
-   Add `/disciplines` and `/tarifs` routes to `App.tsx`.

## Verification & Testing
1.  **Table Alignment:** Ensure the pricing table is perfectly aligned on mobile.
2.  **Content Clarity:** Verify that the distinction between individual and couple prices is clear.
