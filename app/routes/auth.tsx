import { Outlet, redirect } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { isAuthenticated } from '../api/authApi';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Public auth routes that don't require authentication
  const publicAuthRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/reset-password',
    '/auth/callback'
  ];

  // Protected auth routes that require authentication
  const protectedAuthRoutes = [
    '/auth/profile'
  ];

  // Check if user is authenticated
  const authenticated = await isAuthenticated();

  // If user is authenticated and trying to access public auth routes, redirect to itinerary
  if (authenticated && publicAuthRoutes.includes(path)) {
    return redirect('/itinerary');
  }

  // If user is not authenticated and trying to access protected auth routes, redirect to login
  if (!authenticated && protectedAuthRoutes.includes(path)) {
    // Store the attempted location for redirect after login
    const from = encodeURIComponent(path);
    return redirect(`/auth/login?from=${from}`);
  }

  return null;
}

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-primary/10 to-secondary/10">
      <Outlet />
    </div>
  );
}
