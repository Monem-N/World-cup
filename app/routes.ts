import type { RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",
    file: "routes/home.tsx",
  },
  {
    path: "/dashboard",
    file: "routes/dashboard.tsx",
    children: [
      {
        index: true,
        path: "overview",
        file: "routes/dashboard/overview.tsx",
      },
      {
        path: "itinerary",
        file: "routes/dashboard/itinerary.tsx",
      },
      {
        path: "essentials",
        file: "routes/dashboard/essentials.tsx",
      },
    ],
  },
] satisfies RouteConfig;
