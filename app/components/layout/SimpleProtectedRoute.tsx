import React from 'react';

interface SimpleProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * A simplified "protected" route component that doesn't require authentication
 * but provides a consistent wrapper for protected content areas.
 * 
 * This replaces the previous authentication-based ProtectedRoute component
 * with a simple pass-through that can be extended later if needed.
 */
export function SimpleProtectedRoute({ children }: SimpleProtectedRouteProps) {
  // No authentication checks - just render the children
  // This maintains the same component interface but removes auth complexity
  return <>{children}</>;
}
