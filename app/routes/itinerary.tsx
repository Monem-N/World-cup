import { Outlet } from "react-router";
import { PageLayout } from "~/components/layout/PageLayout";

// No authentication required - simplified loader
export async function loader() {
  return null;
}

export function handle() {
  return {
    breadcrumb: "nav.itinerary",
  };
}

export function meta() {
  return [
    { title: "Your Itinerary - World Cup Itinerary" },
    { name: "description", content: "View and manage your World Cup itinerary" },
  ];
}

export default function ItineraryLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}