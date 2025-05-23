import { useTranslation } from "react-i18next";
import { PageLayout } from "~/components/layout/PageLayout";
import { AuthStatus } from "~/components/auth/AuthStatus";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/api/authContext";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Authentication Test - World Cup Itinerary" },
    { name: "description", content: "Test page for authentication integration" },
  ];
}

export default function AuthTestPage() {
  const { t } = useTranslation();
  const { isAuthenticated, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Authentication Test</h1>
        <p className="text-muted-foreground mb-8">
          This page helps test the authentication integration and navigation flow.
        </p>
        
        <div className="grid gap-6">
          {/* Authentication Status */}
          <AuthStatus />
          
          {/* Navigation Test */}
          <Card>
            <CardHeader>
              <CardTitle>Navigation Test</CardTitle>
              <CardDescription>
                Test the authentication-aware navigation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button asChild variant="outline">
                  <Link to="/auth/login">Login Page</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/auth/register">Register Page</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/auth/profile">Profile Page</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/itinerary">Itinerary (Protected)</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/dashboard">Dashboard (Protected)</Link>
                </Button>
                {isAuthenticated && (
                  <Button variant="destructive" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Expected Behavior */}
          <Card>
            <CardHeader>
              <CardTitle>Expected Behavior</CardTitle>
              <CardDescription>
                How the authentication flow should work
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">When NOT authenticated:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Header shows "Sign In" and "Sign Up" buttons</li>
                  <li>Clicking protected routes redirects to login with return URL</li>
                  <li>Login/Register pages are accessible</li>
                  <li>Profile page redirects to login</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">When authenticated:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Header shows user avatar and dropdown menu</li>
                  <li>All protected routes are accessible</li>
                  <li>Login/Register pages redirect to itinerary</li>
                  <li>Sign out clears session and redirects to home</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
