import { Link } from "react-router-dom";
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
import { Settings, LogOut, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export function UserNav() {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full ring-0 focus:ring-0 focus:ring-offset-0 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/10"
        >
          <Avatar className="h-8 w-8 border border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
          </Avatar>
          <span className="sr-only">{t('user.account', 'Account')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex w-full items-center">
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

        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          {t('user.logout', 'Log out')}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}