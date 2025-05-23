import React from 'react';
import { useAuth } from '~/api/authContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

/**
 * A simple component to display the current authentication status
 * Useful for testing and debugging authentication integration
 */
export function AuthStatus() {
  const { user, profile, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
          <CardDescription>Checking authentication...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Authentication Status
          <Badge variant={isAuthenticated ? "default" : "secondary"}>
            {isAuthenticated ? "Authenticated" : "Not Authenticated"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Current authentication state and user information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAuthenticated && user ? (
          <>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                {profile?.avatar_url && (
                  <AvatarImage src={profile.avatar_url} alt="Profile" />
                )}
                <AvatarFallback>
                  {profile?.first_name && profile?.last_name
                    ? `${profile.first_name[0]}${profile.last_name[0]}`
                    : user.email?.[0].toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {profile?.first_name && profile?.last_name
                    ? `${profile.first_name} ${profile.last_name}`
                    : 'User'}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">User ID:</span> {user.id}
              </div>
              <div>
                <span className="font-medium">Email Confirmed:</span>{' '}
                <Badge variant={user.email_confirmed_at ? "default" : "destructive"}>
                  {user.email_confirmed_at ? "Yes" : "No"}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Last Sign In:</span>{' '}
                {user.last_sign_in_at 
                  ? new Date(user.last_sign_in_at).toLocaleString()
                  : 'Never'}
              </div>
              {profile && (
                <div>
                  <span className="font-medium">Profile Created:</span>{' '}
                  {new Date(profile.created_at).toLocaleString()}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              No user is currently signed in.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
