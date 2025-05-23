import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/api/authContext';
import { Card, CardContent } from '~/components/ui/card';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * A wrapper component that protects routes based on authentication status
 * 
 * @param children - The components to render if access is allowed
 * @param redirectTo - Where to redirect if access is denied (default: '/auth/login')
 * @param requireAuth - Whether authentication is required (default: true)
 */
export function ProtectedRoute({ 
  children, 
  redirectTo = '/auth/login',
  requireAuth = true 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        // Store the attempted location for redirect after login
        const from = location.pathname + location.search;
        navigate(redirectTo + `?from=${encodeURIComponent(from)}`, { replace: true });
      } else if (!requireAuth && isAuthenticated) {
        // If user is authenticated but trying to access auth pages, redirect to dashboard
        navigate('/itinerary', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, requireAuth, location]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <p className="text-sm text-muted-foreground">Checking authentication...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Don't render children if authentication requirements aren't met
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
