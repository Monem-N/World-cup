# World Cup Itinerary Application - Developer Guide

## Overview

This document provides a comprehensive guide for developers working on the World Cup Itinerary application. The application is a modern React-based web app built with React Router v7, featuring a complete authentication system, Supabase integration, and a responsive UI using shadcn/ui components.

## Current State (December 2024)

The application now includes:

- ✅ **Complete Authentication System**: Login, registration, profile management, and protected routes
- ✅ **Supabase Integration**: Full database integration with offline support and data synchronization
- ✅ **Modern UI**: shadcn/ui components with responsive design and dark/light mode support
- ✅ **Internationalization**: Multi-language support (English, Arabic, French)
- ✅ **Data Management**: Cascading data sources with standardized JSON files and Supabase fallback
- ✅ **Map Integration**: Google Maps integration for location visualization
- ✅ **Offline Support**: Local storage caching and sync queue for offline functionality

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

### 2. Authentication System (December 2024)

Complete authentication system implemented with:

- **User Registration & Login**: Email/password and magic link authentication
- **Profile Management**: User profiles with avatar upload and personal information
- **Protected Routes**: Route-level authentication with automatic redirects
- **Session Management**: Persistent sessions with automatic logout
- **Password Reset**: Email-based password reset flow
- **Navigation Integration**: Authentication-aware header and mobile navigation

Key authentication files:

- `app/api/authApi.ts`: Core authentication functions
- `app/api/authContext.tsx`: React context for authentication state
- `app/components/auth/`: Authentication UI components
- `app/routes/auth.tsx`: Authentication layout and route protection

### 3. Supabase Integration (December 2024)

Full database integration with:

- **Database Schema**: Aligned with standardized JSON structure
- **Data Migration**: Utilities for migrating JSON data to Supabase
- **Offline Support**: Local storage with sync queue for offline functionality
- **Row-Level Security**: Proper data protection and user isolation
- **Real-time Capabilities**: Foundation for real-time updates

Key Supabase files:

- `supabase/schema.sql`: Database schema definition
- `supabase/schema_updates.sql`: Schema updates for standardized format alignment
- `supabase/rls.sql`: Row-level security policies
- `supabase/functions.sql`: Database functions
- `app/api/migrationUtils.ts`: Data migration utilities
- `app/api/syncUtils.ts`: Offline synchronization utilities

### 4. Data Integration

The application follows a cascading data source strategy:

1. **Offline Storage**: Checks local storage first (when offline)
2. **Standardized Files**: Loads from `doc/itineraires/standardized`
3. **Supabase Database**: Falls back to Supabase for user-specific data
4. **Mock Data**: Uses mock data as last resort

Key files:

- `app/server/itineraryServer.ts`: Server-side functions for accessing standardized files
- `app/api/standardizedItineraryLoader.ts`: Node.js loader for direct file access
- `app/api/standardizedItineraryLoader.browser.ts`: Browser-side loader that fetches from API
- `app/api/itineraryApi.ts`: Main API with authentication and offline support

### 5. API Routes

API routes for accessing itinerary data:

- `/api/itineraries/dates`: Returns a list of all available dates
- `/api/itineraries/:date`: Returns the itinerary data for a specific date

Authentication routes:

- `/auth/login`: User login page
- `/auth/register`: User registration page
- `/auth/profile`: User profile management (protected)
- `/auth/reset-password`: Password reset flow
- `/auth/callback`: OAuth/magic link callback

### 6. TypeScript Fixes

Fixed various TypeScript issues:

- Updated icon imports from Lucide React
- Added 'standardized' as a valid source in the DayProgram type
- Fixed async/await issues in data loading functions
- Added proper type annotations throughout the codebase

## Project Structure

```plaintext
app/
├── api/                      # API functions for data fetching
│   ├── authApi.ts            # Authentication functions
│   ├── authContext.tsx       # Authentication React context
│   ├── itineraryApi.ts       # Main API functions with auth support
│   ├── migrationUtils.ts     # Supabase data migration utilities
│   ├── syncUtils.ts          # Offline synchronization utilities
│   ├── standardizedItineraryLoader.ts        # Node.js loader
│   └── standardizedItineraryLoader.browser.ts # Browser loader
├── components/               # UI components
│   ├── ui/                   # shadcn/ui components
│   ├── auth/                 # Authentication components
│   │   ├── LoginForm.tsx     # Login form
│   │   ├── RegisterForm.tsx  # Registration form
│   │   ├── ProfileForm.tsx   # Profile management
│   │   ├── PasswordResetForm.tsx # Password reset
│   │   ├── AuthStatus.tsx    # Auth status display (testing)
│   │   └── ProtectedRoute.tsx # Route protection wrapper
│   ├── layout/               # Layout components
│   │   ├── Header.tsx        # Main header with auth navigation
│   │   ├── UserNav.tsx       # User navigation dropdown
│   │   ├── MobileNav.tsx     # Mobile navigation with auth
│   │   └── PageLayout.tsx    # Main page layout
│   └── itinerary/            # Custom itinerary components
│       ├── ActivityCard.tsx  # Activity card component
│       ├── ItineraryDayHeader.tsx # Day header component
│       ├── ItineraryTimeline.tsx  # Timeline component
│       ├── LocationDetails.tsx    # Location details component
│       └── TransportDetails.tsx   # Transport details component
├── lib/                      # Utility functions and types
│   ├── types.ts              # TypeScript type definitions
│   ├── supabase.ts           # Supabase client configuration
│   └── i18n/                 # Internationalization
│       └── locales/          # Translation files
├── routes/                   # Application routes
│   ├── auth.tsx              # Authentication layout
│   ├── auth.login.tsx        # Login page
│   ├── auth.register.tsx     # Registration page
│   ├── auth.profile.tsx      # Profile page (protected)
│   ├── auth.reset-password.tsx # Password reset page
│   ├── auth.callback.tsx     # OAuth callback page
│   ├── auth-test.tsx         # Authentication testing page
│   ├── dashboard.tsx         # Dashboard (protected)
│   ├── itinerary.tsx         # Itinerary layout (protected)
│   ├── itinerary/            # Itinerary index route
│   │   └── index.tsx         # Itinerary index page
│   ├── itinerary.$date/      # Itinerary date route
│   │   ├── index.tsx         # Itinerary day page
│   │   └── components/       # Date-specific components
│   │       └── ItineraryMapView.tsx  # Map view component
│   ├── api.itineraries.dates.ts  # API route for dates
│   └── api.itineraries.$date.ts  # API route for specific date
├── server/                   # Server-side code
│   └── itineraryServer.ts    # Server functions for itinerary data
└── supabase/                 # Supabase configuration
    ├── schema.sql            # Database schema
    ├── schema_updates.sql    # Schema updates
    ├── rls.sql               # Row-level security
    └── functions.sql         # Database functions
```

## Data Flow

### Authentication Flow

1. User visits the application
2. `AuthProvider` checks for existing session
3. Authentication state is provided to all components via `useAuth` hook
4. Protected routes check authentication status and redirect if needed
5. Navigation components show appropriate options based on auth state

### Data Loading Flow

1. User navigates to a page (e.g., `/itinerary/2025-06-15`)
2. Route loader checks authentication for protected routes
3. The page component calls `fetchItinerary('2025-06-15')`
4. `fetchItinerary` follows cascading strategy:
   - Check offline storage (if offline)
   - Try standardized files via `loadStandardizedItinerary`
   - Fall back to Supabase database (with user context)
   - Use mock data as last resort
5. Data is cached in offline storage for future use
6. The data is returned in the `DayProgram` format
7. The page component renders the data using the UI components

### Offline Synchronization Flow

1. User makes changes while offline
2. Changes are saved to local storage
3. Changes are added to sync queue
4. When connection is restored, sync queue is processed
5. Changes are synchronized with Supabase
6. Local storage is updated with latest data

## Next Steps

### 1. Test and Validate Authentication Integration

- **Test Authentication Flow**: Visit `/auth-test` to verify all functionality
- **Validate Protected Routes**: Ensure proper redirects and access control
- **Test Offline Functionality**: Verify offline storage and synchronization
- **Cross-browser Testing**: Test authentication across different browsers

### 2. Complete Activity Management

- **CRUD Operations**: Implement create, update, delete for activities using Supabase
- **Real-time Updates**: Add real-time synchronization for collaborative editing
- **User-specific Data**: Ensure activities are properly associated with users
- **Activity Form**: Create comprehensive form for adding/editing activities

### 3. Enhance User Experience

- **Loading States**: Add proper loading indicators for all async operations
- **Error Handling**: Implement comprehensive error boundaries and user feedback
- **Notifications**: Add success/error notifications for user actions
- **Responsive Design**: Further optimize for mobile and tablet devices

### 4. Data Management Improvements

- **Data Migration**: Set up production data migration from JSON to Supabase
- **Backup Strategy**: Implement proper backup and recovery procedures
- **Data Validation**: Add comprehensive validation for all user inputs
- **Performance Optimization**: Optimize queries and caching strategies

### 5. Testing and Documentation

- **Unit Tests**: Write tests for authentication and data management functions
- **Integration Tests**: Test complete user flows including authentication
- **API Documentation**: Document all API endpoints and authentication flows
- **User Guide**: Create comprehensive user documentation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database integration)
- Google Maps API key (for map functionality)

### Setup Instructions

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Environment Configuration**:

   Create a `.env` file with the following variables:

   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_KEY=your-service-key
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

3. **Supabase Setup**:

   Follow the instructions in `SUPABASE_SETUP.md` to set up your database.

4. **Run Development Server**:

   ```bash
   npm run dev
   ```

5. **Test Authentication**:

   Visit `http://localhost:5173/auth-test` to test the authentication flow.

6. **Build for Production**:

   ```bash
   npm run build
   ```

7. **Type Checking**:

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

## Working with Authentication

### Authentication Context

The `useAuth` hook provides access to authentication state throughout the application:

```tsx
import { useAuth } from '~/api/authContext';

function MyComponent() {
  const { user, profile, isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {profile?.first_name}!</div>;
}
```

### Protected Routes

Use route loaders to protect routes that require authentication:

```tsx
// In your route file
import { redirect } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { isAuthenticated } from '~/api/authApi';

export async function loader({ request }: LoaderFunctionArgs) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    const url = new URL(request.url);
    const from = encodeURIComponent(url.pathname + url.search);
    return redirect(`/auth/login?from=${from}`);
  }

  return null;
}
```

### Working with Supabase Data

When working with user-specific data, always include user context:

```tsx
import { supabase } from '~/lib/supabase';

// Get user-specific itineraries
const { data, error } = await supabase
  .from('itinerary_days')
  .select('*')
  .eq('user_id', user.id);

// Row-level security automatically filters data by user
```

### Testing Authentication

Use the `/auth-test` page to verify authentication functionality:

1. Test unauthenticated state
2. Test login flow with redirects
3. Test protected route access
4. Test sign out functionality
5. Verify offline storage works correctly

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

### Authentication Issues

If authentication isn't working correctly:

1. **Check Environment Variables**: Verify Supabase URL and keys are correct
2. **Verify Supabase Setup**: Ensure database schema and RLS policies are applied
3. **Check Browser Console**: Look for authentication-related errors
4. **Test with `/auth-test`**: Use the test page to debug authentication flow
5. **Clear Browser Storage**: Clear localStorage and cookies if session is stuck
6. **Check Network Tab**: Verify API calls to Supabase are successful

### Data Loading Issues

If data isn't loading correctly:

1. Check the browser console for errors
2. Verify that the date format is correct (YYYY-MM-DD)
3. Check that the standardized file exists in the correct location
4. Verify that the Supabase connection is working
5. Check authentication state - some data requires user login
6. Verify offline storage if working offline

### UI Rendering Issues

If UI components aren't rendering correctly:

1. Check that all required props are being passed
2. Verify that the data structure matches the expected format
3. Check for any TypeScript errors using `npm run typecheck`
4. Verify authentication state for protected components
5. Check that the AuthProvider is properly wrapping the app

### Route Protection Issues

If protected routes aren't working:

1. Verify route loaders are properly implemented
2. Check that authentication checks are working
3. Ensure redirects are configured correctly
4. Test with different authentication states
5. Check browser network tab for redirect loops

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/en/main)
- [Lucide Icons](https://lucide.dev/icons/)
- [date-fns Documentation](https://date-fns.org/)
