# World Cup Itinerary Application

## Project Title and Description

The World Cup Itinerary application is a modern React-based web app built with React Router v7, featuring a complete authentication system, Supabase integration, and a responsive UI using shadcn/ui components.

## Features

- **Complete Authentication System**: Login, registration, profile management, and protected routes.
- **Supabase Integration**: Full database integration with offline support and data synchronization.
- **Modern UI**: shadcn/ui components with responsive design and dark/light mode support.
- **Internationalization**: Multi-language support (English, Arabic, French).
- **Data Management**: Cascading data sources with standardized JSON files and Supabase fallback.
- **Map Integration**: Google Maps integration for location visualization.
- **Offline Support**: Local storage caching and sync queue for offline functionality.

## Tech Stack

- React
- React Router v7
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Zustand
- Vite

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database integration)
- Google Maps API key (for map functionality)

### Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file with the following variables:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### Running the Development Server

```bash
npm run dev
```

## Project Structure Overview

The project is structured as follows:

- `app/api/`: Contains API functions for data fetching, authentication, Supabase integration, and data synchronization.
- `app/components/`: Houses UI components, including shadcn/ui components, authentication forms, layout elements, and custom itinerary display components.
- `app/lib/`: Includes utility functions, TypeScript type definitions, Supabase client configuration, and internationalization setup.
- `app/routes/`: Defines the application's routes, including authentication pages, dashboard, itinerary views, and API endpoints.
- `app/server/`: Contains server-side code, primarily for accessing standardized itinerary data.
- `supabase/`: Includes Supabase configuration files, such as database schema, schema updates, row-level security policies, and database functions.

For a more detailed structure, please refer to `DEVELOPER_GUIDE.md`.

## Available Scripts

- `npm run dev`: Starts the development server using `react-router dev`.
- `npm run build`: Builds the application for production using `react-router build`.
- `npm run typecheck`: Runs TypeScript type checking using `react-router typegen && tsc`.
- `npm run start`: Starts the production server using `react-router-serve ./build/server/index.js`.

## Data Flow

The application employs a cascading data source strategy for loading itinerary data:
1. **Offline Storage**: Checks local storage first (when offline).
2. **Standardized Files**: Loads from `doc/itineraires/standardized`.
3. **Supabase Database**: Falls back to Supabase for user-specific data.
4. **Mock Data**: Uses mock data as a last resort.

Changes made offline are saved to local storage, added to a sync queue, and synchronized with Supabase when the connection is restored.

## Working with Standardized Data

Standardized itinerary data is stored in JSON files within the `doc/itineraires/standardized` directory, named with the date format `YYYY-MM-DD.json`. New data can be added by creating new files in this format. Existing data can be converted using the `node scripts/convert_itineraries.mjs` script, and validated using `node scripts/validate_converted.mjs`.

## Working with Authentication

Authentication is managed via an `AuthProvider` and the `useAuth` hook, which provides access to authentication state (user, profile, isAuthenticated, isLoading, signOut) throughout the application. Protected routes utilize loaders to check authentication status and redirect unauthenticated users to the login page. User-specific data interactions with Supabase automatically incorporate user context, and row-level security policies filter data by user. The `/auth-test` page can be used to verify authentication functionality.

## Deployment

Deployment information is TBD. For Vercel deployment, refer to `README-conversion.md` for a deployment button.

## Contributing

Contributions are welcome. Please refer to the `DEVELOPER_GUIDE.md` for more details and follow the established coding practices.

## License

License information is TBD. Please check for a `LICENSE` file in the repository or consult project maintainers for details.
