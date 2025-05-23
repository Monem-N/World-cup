import type { RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",
    file: "routes/index.tsx",
  },
  {
    path: "/dashboard",
    file: "routes/dashboard.tsx", // This might be a layout route for dashboard
    children: [
      {
        index: true, // Renders at /dashboard
        path: "overview", // Renders at /dashboard/overview
        file: "routes/dashboard/overview.tsx",
      },
      {
        path: "itinerary", // Renders at /dashboard/itinerary
        file: "routes/dashboard/itinerary-overview.tsx", // Assuming this is a list/overview page
      },
      {
        path: "essentials", // Renders at /dashboard/essentials
        file: "routes/dashboard/essentials.tsx",
      },
      // Add the dynamic itinerary detail page nested under /dashboard/itinerary
      // OR as a top-level route if it's not strictly part of the dashboard layout
      // Let's add it as a top-level route based on our previous discussion path /itinerary/:date

    ],
  },
  // Itinerary routes with layout
  {
    path: "/itinerary",
    file: "routes/itinerary.tsx", // Layout route
    children: [
      {
        index: true, // Renders at /itinerary
        file: "routes/itinerary/index.tsx", // Path to your ItineraryDateSelectorPage
      },
      {
        path: ":date", // Renders at /itinerary/:date
        file: "routes/itinerary.$date.tsx", // Layout for date page
        children: [
          {
            index: true, // Renders at /itinerary/:date
            file: "routes/itinerary.$date/index.tsx", // Path to your DayProgramPage
          }
        ]
      }
    ]
  },
  // Authentication routes with layout
  {
    path: "/auth",
    file: "routes/auth.tsx", // Layout route for authentication
    children: [
      {
        path: "login", // Renders at /auth/login
        file: "routes/auth.login.tsx",
      },
      {
        path: "register", // Renders at /auth/register
        file: "routes/auth.register.tsx",
      },
      {
        path: "profile", // Renders at /auth/profile
        file: "routes/auth.profile.tsx",
      },
      {
        path: "reset-password", // Renders at /auth/reset-password
        file: "routes/auth.reset-password.tsx",
      },
      {
        path: "callback", // Renders at /auth/callback
        file: "routes/auth.callback.tsx",
      },
    ]
  },
  // Venues route
  {
    path: "/venues",
    file: "routes/venues.tsx",
  },
  // Teams route
  {
    path: "/teams",
    file: "routes/teams.tsx",
  },
  // Settings route
  {
    path: "/settings",
    file: "routes/settings.tsx",
  },

  // Test routes (for development/testing)
  {
    path: "/supabase-test",
    file: "routes/supabase-test.tsx",
  },
  {
    path: "/auth-test",
    file: "routes/auth-test.tsx",
  },
  // API Routes
  {
    path: "/api/itineraries/dates",
    file: "routes/api.itineraries.dates.ts",
  },
  {
    path: "/api/itineraries/:date",
    file: "routes/api.itineraries.$date.ts",
  },

] satisfies RouteConfig;
