import type { RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",
    file: "routes/index.tsx",
  },
  {
    path: "/dashboard",
    file: "routes/dashboard.tsx",
    children: [
      {
        index: true,
        file: "routes/dashboard/overview.tsx",
      },
      {
        path: "itinerary",
        file: "routes/dashboard/itinerary-overview.tsx",
      },
      {
        path: "essentials",
        file: "routes/dashboard/essentials.tsx",
      },
    ],
  },
  {
    path: "/itinerary",
    file: "routes/itinerary.tsx",
    children: [
      {
        index: true,
        file: "routes/itinerary/index.tsx",
      },
      {
        path: ":date",
        file: "routes/itinerary.$date.tsx",
        children: [
          {
            index: true,
            file: "routes/itinerary.$date/index.tsx",
          }
        ]
      }
    ]
  },
  {
    path: "/venues",
    file: "routes/venues.tsx",
  },
  {
    path: "/teams",
    file: "routes/teams.tsx",
  },
  {
    path: "/settings",
    file: "routes/settings.tsx",
  },
  {
    path: "/supabase-test",
    file: "routes/supabase-test.tsx",
  },
  {
    path: "/api/itineraries/dates",
    file: "routes/api.itineraries.dates.ts",
  },
  {
    path: "/api/itineraries/:date",
    file: "routes/api.itineraries.$date.ts",
  },
] satisfies RouteConfig;
