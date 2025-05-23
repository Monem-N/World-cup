import { Link } from "react-router";
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
import { Settings, UserCircle, Calendar, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export function UserNav() {
  const { t } = useTranslation();

  // Simplified user navigation without authentication
  // Shows a generic user menu with quick access to main sections
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full ring-0 focus:ring-0 focus:ring-offset-0 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/10"
        >
          <Avatar className="h-8 w-8 border border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              WC
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">{t('user.menu', 'Menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{t('user.worldCupFan', 'World Cup Fan')}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {t('user.quickAccess', 'Quick access to your itinerary')}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex w-full items-center">
            <Trophy className="mr-2 h-4 w-4" />
            {t('nav.dashboard', 'Dashboard')}
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/itinerary" className="flex w-full items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {t('nav.itinerary', 'Itinerary')}
            <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            {t('user.settings', 'Settings')}
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}