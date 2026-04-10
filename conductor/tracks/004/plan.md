# Track 004 Implementation Plan: Planning (Interactive Class Schedule)

## Objective
Implement a clear, professional, and mobile-friendly weekly class schedule.

## Implementation Steps

### Step 1: Component Directories
-   `mkdir -p src/components/planning`

### Step 2: Define Schedule Data
-   Create a local data file or object (`src/data/schedule.ts`) to store class details, avoiding hard-coding in the component for easier future updates.

### Step 3: Build the Schedule Grid
-   Create `src/components/planning/ScheduleGrid.tsx`.
-   Implement a tab-based view for switching between days of the week.
-   Design each class card with name, time, level, and venue.
-   Styles: `src/components/planning/ScheduleGrid.module.css`.

### Step 4: Build Registration Info
-   Create `src/components/planning/RegistrationInfo.tsx`.
-   Add info about "Permanences" (Mondays/Wednesdays/Saturdays).
-   Include "Dossier d'inscription" requirements.

### Step 5: Create the Planning Page
-   Create `src/pages/Planning.tsx`.
-   Assemble `<ScheduleGrid />` and `<RegistrationInfo />`.
-   Add the `/planning` route to `src/App.tsx`.

## Verification & Testing
1.  **Tab Switching:** Confirm clicking a day correctly filters and displays classes.
2.  **Responsiveness:** Verify the grid/list transition on mobile devices.
3.  **Data Integrity:** Match the new planning against the original Wix schedule.
