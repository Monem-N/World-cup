# World Cup Itinerary Application - Developer Guide

## Overview

This document provides an overview of the recent changes made to the World Cup Itinerary application and outlines the next steps for development. The application has been updated with a modern UI using shadcn/ui components and now supports loading data from standardized JSON files.

## Recent Changes

### 1. UI Modernization

We've implemented a comprehensive UI overhaul using shadcn/ui components and Tailwind CSS:

- **Core Components**:
  - `ItineraryDayHeader`: Displays date, title, summary, weather, and reminders
  - `ItineraryTimeline`: Shows activities in chronological order with a timeline visualization
  - `ActivityCard`: Displays activity details with expandable sections
  - `LocationDetails`: Shows location information with map integration
  - `TransportDetails`: Displays transport information with appropriate icons

- **Main Pages**:
  - **Itinerary Day Page** (`/itinerary/:date`): Shows detailed information for a specific day
  - **Itinerary Index Page** (`/itinerary/`): Provides an overview of all available dates

### 2. Data Integration

The application now follows a cascading data source strategy:

1. First tries to load data from standardized JSON files in `doc/itineraires/standardized`
2. Falls back to Supabase if no standardized file is found
3. Uses mock data as a last resort

Key files:

- `app/server/itineraryServer.ts`: Server-side functions for accessing standardized files
- `app/api/standardizedItineraryLoader.ts`: Node.js loader for direct file access
- `app/api/standardizedItineraryLoader.browser.ts`: Browser-side loader that fetches from API

### 3. API Routes

Added new API routes for accessing itinerary data:

- `/api/itineraries/dates`: Returns a list of all available dates
- `/api/itineraries/:date`: Returns the itinerary data for a specific date

### 4. TypeScript Fixes

Fixed various TypeScript issues:

- Updated icon imports from Lucide React
- Added 'standardized' as a valid source in the DayProgram type
- Fixed async/await issues in data loading functions
- Added proper type annotations throughout the codebase

## Project Structure

```plaintext
app/
├── api/                      # API functions for data fetching
│   ├── itineraryApi.ts       # Main API functions
│   ├── standardizedItineraryLoader.ts        # Node.js loader
│   └── standardizedItineraryLoader.browser.ts # Browser loader
├── components/               # UI components
│   ├── ui/                   # shadcn/ui components
│   └── itinerary/            # Custom itinerary components
│       ├── ActivityCard.tsx  # Activity card component
│       ├── ItineraryDayHeader.tsx # Day header component
│       ├── ItineraryTimeline.tsx  # Timeline component
│       ├── LocationDetails.tsx    # Location details component
│       └── TransportDetails.tsx   # Transport details component
├── lib/                      # Utility functions and types
│   └── types.ts              # TypeScript type definitions
├── routes/                   # Application routes
│   ├── api.itineraries.dates.ts  # API route for dates
│   ├── api.itineraries.$date.ts  # API route for specific date
│   ├── itinerary/            # Itinerary index route
│   │   └── index.tsx         # Itinerary index page
│   └── itinerary.$date/      # Itinerary date route
│       ├── index.tsx         # Itinerary day page
│       └── components/       # Date-specific components
│           └── ItineraryMapView.tsx  # Map view component
└── server/                   # Server-side code
    └── itineraryServer.ts    # Server functions for itinerary data
```

## Data Flow

1. User navigates to a page (e.g., `/itinerary/2025-06-15`)
2. The page component calls `fetchItinerary('2025-06-15')`
3. `fetchItinerary` tries to load data from:
   - Standardized files via `loadStandardizedItinerary`
   - Supabase database
   - Mock data
4. The data is returned in the `DayProgram` format
5. The page component renders the data using the UI components

## Next Steps

### 1. Complete the UI Implementation

- **Add Activity Form**: Create a form for adding new activities
- **Edit Functionality**: Allow editing existing activities
- **Document View**: Implement the document viewer for attachments

### 2. Enhance Data Management

- **Data Validation**: Add validation for user inputs
- **Data Synchronization**: Implement syncing between standardized files and Supabase
- **Offline Support**: Add offline capabilities for viewing itineraries

### 3. Authentication and User Management

- **User Authentication**: Implement user login and registration
- **User Roles**: Add support for different user roles (admin, user)
- **User Preferences**: Allow users to customize their experience

### 4. Testing and Optimization

- **Unit Tests**: Write tests for components and data loading functions
- **Integration Tests**: Test the entire application flow
- **Performance Optimization**: Optimize data loading and rendering

## Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Build for Production**:

   ```bash
   npm run build
   ```

4. **Type Checking**:

   ```bash
   npm run typecheck
   ```

## Working with Standardized Data

### Adding New Data

1. Create a new JSON file in `doc/itineraires/standardized` following the schema
2. Name the file with the date format: `YYYY-MM-DD.json`
3. The application will automatically detect and load the new file

### Converting Existing Data

Use the conversion script to convert existing JSON files to the standardized format:

```bash
node scripts/convert_itineraries.mjs
```

### Validating Data

Validate the standardized files against the schema:

```bash
node scripts/validate_converted.mjs
```

## UI Component Usage

### ItineraryDayHeader

```tsx
import { ItineraryDayHeader } from '~/components/itinerary/ItineraryDayHeader';

// In your component:
<ItineraryDayHeader day={dayProgram} className="mb-6" />
```

### ItineraryTimeline

```tsx
import { ItineraryTimeline } from '~/components/itinerary/ItineraryTimeline';

// In your component:
<ItineraryTimeline
  activities={dayProgram.items}
  onStatusChange={(id, status) => {
    // Handle status change
  }}
/>
```

### ActivityCard

```tsx
import { ActivityCard } from '~/components/itinerary/ActivityCard';

// In your component:
<ActivityCard
  activity={activity}
  onStatusChange={(id, status) => {
    // Handle status change
  }}
/>
```

### ItineraryMapView

```tsx
import ItineraryMapView from '~/routes/itinerary.$date/components/ItineraryMapView';

// In your component:
<ItineraryMapView
  activities={dayProgram.items}
/>
```

The `ItineraryMapView` component requires the following props:

- `activities`: An array of Activity objects with location data (latitude and longitude)

The component automatically:

- Filters activities to only show those with valid location coordinates
- Displays markers for each activity location
- Shows popups with activity details when markers are clicked
- Clusters markers that are close together
- Provides a button to open the location in Google Maps
- Handles loading and error states gracefully

## Troubleshooting

### Data Loading Issues

If data isn't loading correctly:

1. Check the browser console for errors
2. Verify that the date format is correct (YYYY-MM-DD)
3. Check that the standardized file exists in the correct location
4. Verify that the Supabase connection is working

### UI Rendering Issues

If UI components aren't rendering correctly:

1. Check that all required props are being passed
2. Verify that the data structure matches the expected format
3. Check for any TypeScript errors using `npm run typecheck`

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/en/main)
- [Lucide Icons](https://lucide.dev/icons/)
- [date-fns Documentation](https://date-fns.org/)
