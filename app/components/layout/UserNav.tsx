import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "~/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Settings, LogOut, UserCircle, LogIn, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useAuth } from "~/api/authContext";

export function UserNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, isLoading, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/10"
        disabled
      >
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span className="sr-only">{t('user.loading', 'Loading...')}</span>
      </Button>
    );
  }

  // If user is not authenticated, show sign in/sign up buttons
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        {/* Sign In Button - visible on larger screens */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hidden sm:flex text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/10"
        >
          <Link to="/auth/login" className="flex items-center gap-1.5">
            <LogIn className="h-4 w-4" />
            {t('auth.signIn', 'Sign In')}
          </Link>
        </Button>

        {/* Sign Up Button - visible on larger screens */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="hidden sm:flex border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
        >
          <Link to="/auth/register" className="flex items-center gap-1.5">
            <UserPlus className="h-4 w-4" />
            {t('auth.signUp', 'Sign Up')}
          </Link>
        </Button>

        {/* Mobile dropdown for auth options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden h-8 w-8 rounded-full text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/10"
            >
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">{t('auth.account', 'Account')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/auth/login" className="flex w-full items-center">
                <LogIn className="mr-2 h-4 w-4" />
                {t('auth.signIn', 'Sign In')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/auth/register" className="flex w-full items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                {t('auth.signUp', 'Sign Up')}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // If user is authenticated, show user dropdown
  const displayName = profile?.first_name && profile?.last_name
    ? `${profile.first_name} ${profile.last_name}`
    : user?.email?.split('@')[0] || 'User';

  const initials = profile?.first_name && profile?.last_name
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : user?.email?.[0].toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full ring-0 focus:ring-0 focus:ring-offset-0 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/10"
        >
          <Avatar className="h-8 w-8 border border-primary/20">
            {profile?.avatar_url && (
              <AvatarImage
                src={profile.avatar_url}
                alt={displayName}
                className="object-cover"
              />
            )}
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">{t('user.account', 'Account')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/auth/profile" className="flex w-full items-center">
            <UserCircle className="mr-2 h-4 w-4" />
            {t('user.profile', 'Profile')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            {t('user.settings', 'Settings')}
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('user.logout', 'Log out')}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}