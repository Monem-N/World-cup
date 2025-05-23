import { Outlet, redirect } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { PageLayout } from "~/components/layout/PageLayout";
import { isAuthenticated } from "~/api/authApi";

export async function loader({ request }: LoaderFunctionArgs) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    // Store the attempted location for redirect after login
    const url = new URL(request.url);
    const from = encodeURIComponent(url.pathname + url.search);
    return redirect(`/auth/login?from=${from}`);
  }

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