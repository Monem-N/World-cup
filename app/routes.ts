import type { RouteConfig } from "@react-router/dev/routes";
import { route, index } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("/dashboard", "routes/dashboard.tsx", [
    index("routes/dashboard/overview.tsx"),
    route("itinerary", "routes/dashboard/itinerary-overview.tsx"),
    route("essentials", "routes/dashboard/essentials.tsx"),
  ]),
  route("/itinerary", "routes/itinerary.tsx", [
    index("routes/itinerary/index.tsx"),
    route(":date", "routes/itinerary.$date.tsx", [
      index("routes/itinerary.$date/index.tsx"),
    ]),
  ]),
  route("/venues", "routes/venues.tsx"),
  route("/teams", "routes/teams.tsx"),
  route("/settings", "routes/settings.tsx"),
  route("/supabase-test", "routes/supabase-test.tsx"),
  route("/admin-setup", "routes/admin-setup.tsx"),
  route("/api/itineraries/dates", "routes/api.itineraries.dates.ts"),
  route("/api/itineraries/:date", "routes/api.itineraries.$date.ts"),
] satisfies RouteConfig;
