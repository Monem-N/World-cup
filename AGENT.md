# World Cup Itinerary Application Guide

This document provides a comprehensive overview of the World Cup Itinerary application codebase to help AI agents understand its structure, key components, and common tasks.
## Build & Test Commands
- Build: `react-router build`
- Dev Server: `react-router dev`
- Production Server: `react-router-serve ./build/server/index.js`
- Type Check: `react-router typegen && tsc`
- Run Tests: `vitest`
- Run Single Test: `vitest app/routes/itinerary.$date/components/Timeline/__tests__/TimelineItem.test.tsx`

## Code Style Guidelines
 - Use TypeScript with strict type checking
- Styling: Tailwind CSS with the `cn()` utility for class merging
- Use shadcn/ui components following their patterns
- Follow React Router v7 conventions for routing
- Use React Query for server state, Zustand for client state
- Use ErrorBoundary components for error handling
- Use Pascal case for components, camel case for variables/functions
- Import order: React/libraries, then components, then utilities
- Use Supabase client for data access following RLS security policies

## Application Overview

The World Cup Itinerary application is a React-based web application that helps users manage their itinerary for the World Cup. It includes features such as:

- Dashboard with an overview of upcoming events
- Detailed itinerary views for specific dates
- Timeline visualization of daily activities
- Integration with Supabase for data storage

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router v7
- **UI Components**: Custom components built with shadcn/ui
- **Styling**: Tailwind CSS v4
- **State Management**: React Query for server state, Zustand for client state
- **Backend/Database**: Supabase (PostgreSQL)

## Project Structure

```
app/
├── api/                    # API integration functions
│   ├── activityApi.ts      # Activity-related API functions
│   ├── authApi.ts          # Authentication API functions
│   ├── itineraryApi.ts     # Itinerary data API functions
│   └── tripApi.ts          # Trip management API functions
├── components/             # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   ├── ui/                 # Generic UI components
│   │   ├── timeline/       # Timeline components
│   │   └── ...
│   └── ...
├── lib/                    # Utility functions and types
│   ├── supabase.ts         # Supabase client configuration
│   ├── types.ts            # TypeScript type definitions
│   └── ...
├── routes/                 # Application routes
│   ├── auth.tsx            # Authentication page
│   ├── dashboard/          # Dashboard routes
│   ├── itinerary.$date/    # Itinerary detail page
│   └── ...
└── ...

supabase/                   # Supabase configuration and scripts
├── schema.sql              # Database schema
├── rls.sql                 # Row Level Security policies
├── functions.sql           # Database functions
└── ...

src/
└── types/                  # Global TypeScript type definitions
    └── database.types.ts   # Supabase database types
```

## Key Components

### Timeline Components

The timeline is a core feature of the application, displaying activities in chronological order. It uses a compound component pattern following shadcn/ui conventions.

#### Core Timeline Components

- `Timeline`: Container component that provides context to all timeline items
- `TimelineItem`: Individual timeline item with icon, time, and expandable content
- `TimelineCard`: Card component for displaying detailed activity information
- `TimelineIcon`: Icon component with status indicators
- `TimelineConnector`: Visual connector between timeline items
- `TimelineTime`: Time display component with formatting options
- `TimelineHeader`, `TimelineTitle`, `TimelineDescription`: Content structure components
- `TimelineEmpty`: Empty state component
- `TimelineSkeleton`: Loading state component

#### Timeline Context

The Timeline component system uses React Context for state sharing:

- `TimelineProvider`: Provides shared state to all timeline components
- `useTimelineContext`: Hook for accessing timeline context

#### Timeline Props

Key props for the Timeline component:

- `size`: Controls spacing between items ('sm', 'md', 'lg')
- `iconSize`: Controls icon size ('sm', 'md', 'lg')
- `animate`: Enables/disables animations
- `showConnectors`: Shows/hides connector lines
- `clickable`: Makes timeline items clickable
- `expandable`: Allows timeline items to be expanded
- `isLoading`: Shows loading state
- `hasError`: Shows error state
- `errorMessage`: Custom error message

### Dashboard Components

- `ItineraryTimeline`: Displays upcoming itinerary items on the dashboard
- `TripStats`: Shows statistics about the trip
- `WeatherWidget`: Displays weather information

### Itinerary Components

- `DayHeader`: Header component for the itinerary day view
- `Timeline`: Timeline component for displaying activities
- `ActivityDetail`: Detailed view of an activity

## Data Flow

1. **Data Fetching**: The application uses React Query to fetch data from Supabase
2. **State Management**: Zustand stores manage global application state
3. **UI Rendering**: Components consume data from stores and queries
4. **User Interactions**: User actions trigger API calls to update data

## Supabase Integration

The application uses Supabase for data storage and authentication. Key aspects:

- **Authentication**: Handled through Supabase Auth
- **Database**: PostgreSQL database with tables for trips, itinerary days, activities, etc.
- **Row Level Security**: Ensures users can only access their own data
- **Storage**: Used for storing documents and attachments

### Database Schema

Key tables in the database:

- `trips`: Stores trip information
- `itinerary_days`: Stores days within a trip
- `activities`: Stores activities within a day
- `locations`: Stores location information for activities
- `transport_details`: Stores transport information
- `weather`: Stores weather information for days

## Common Tasks

### Adding a New Activity

To add a new activity to an itinerary day:

1. Use the `createActivity` function in `activityApi.ts`
2. Provide the itinerary day ID and activity details
3. The function will handle creating the activity and related data

### Updating Activity Status

To update the status of an activity:

1. Use the `updateActivityStatus` function in `activityApi.ts`
2. Provide the activity ID and new status
3. The function will update the status in the database

### Navigating Between Pages

The application uses React Router v7 for navigation:

- Use the `useNavigate` hook to programmatically navigate
- Use the `Link` component for declarative navigation
- Route parameters (like `$date` in `itinerary.$date`) are accessed via `useParams`

### Fetching Itinerary Data

To fetch itinerary data for a specific date:

1. Use the `fetchItinerary` function in `itineraryApi.ts`
2. Provide the date in ISO format (YYYY-MM-DD)
3. The function will return the itinerary data for that date

## UI Component Usage

### Timeline Component

Basic usage:

```tsx
<Timeline>
  {activities.map((activity) => (
    <TimelineItem
      key={activity.id}
      date={activity.date}
      title={activity.title}
      description={activity.description}
      status={activity.status}
    />
  ))}
</Timeline>
```

With all options:

```tsx
<Timeline
  size="md"
  iconSize="md"
  animate={true}
  showConnectors={true}
  defaultIconColor="primary"
  defaultStatus="completed"
  clickable={false}
  expandable={true}
  isLoading={isLoading}
  hasError={hasError}
  errorMessage="Failed to load timeline"
>
  {activities.map((activity) => (
    <TimelineItem
      key={activity.id}
      date={activity.date}
      title={activity.title}
      time={activity.time}
      description={activity.description}
      icon={getActivityIcon(activity.type)}
      iconColor={activity.color}
      status={activity.status}
      location={activity.location}
      transport={activity.transport}
      documents={activity.documents}
      notes={activity.notes}
      onClick={handleItemClick}
      renderLocation={(loc) => <MapView location={loc} />}
      renderTransport={(trans) => <TransportInfo transport={trans} />}
    />
  ))}
</Timeline>
```

### Dashboard Itinerary Timeline

```tsx
<ItineraryTimeline itinerary={itineraryData} />
```

## Styling Approach

The application uses Tailwind CSS for styling:

- Utility classes for most styling needs
- CSS variables for theming
- The `cn` utility function for conditional class names

## Authentication Flow

1. User signs up or signs in using the auth page
2. Supabase handles authentication and returns a session
3. The session is stored and used for subsequent API calls
4. RLS policies ensure users can only access their own data

## Important Notes

- The application falls back to mock data if Supabase data is not available
- Date formatting is handled carefully to support different formats
- The timeline component is highly customizable and reusable

## Troubleshooting

### Common Issues

- **Authentication Issues**: Check if the user is signed in and has the correct permissions
- **Data Fetching Issues**: Check the console for errors and verify that the data exists in Supabase
- **UI Rendering Issues**: Verify that the components are receiving the expected props

### Debugging Tips

- Use the browser console to check for errors
- The application includes detailed logging for API calls
- Check the Supabase dashboard for database errors

## Future Enhancements

Planned enhancements for the application:

- Offline support with local storage
- Push notifications for upcoming activities
- Social sharing features
- Mobile app version
