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
