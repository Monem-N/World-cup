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

  // Simplified user navigation following FIFA Club World Cup 2025 Design System
  // Shows a generic user menu with quick access to main sections
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="user-nav-trigger relative h-8 w-8 rounded-full ring-0 focus:ring-0 focus:ring-offset-0 transition-all duration-300 hover:scale-110"
          style={{
            color: "rgba(255, 255, 255, 0.9)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <Avatar
            className="h-8 w-8 border"
            style={{
              borderColor: "rgba(255, 215, 0, 0.2)"
            }}
          >
            <AvatarFallback
              className="font-medium"
              style={{
                background: "rgba(255, 215, 0, 0.1)",
                color: "#FFD700"
              }}
            >
              WC
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">{t('user.menu', 'Menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="user-nav-content w-56"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none" style={{ color: "#000000" }}>
              {t('user.worldCupFan', 'World Cup Fan')}
            </p>
            <p className="text-xs leading-none" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
              {t('user.quickAccess', 'Quick access to your itinerary')}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator style={{ background: "rgba(0, 0, 0, 0.1)" }} />

        <DropdownMenuItem asChild>
          <Link
            to="/dashboard"
            className="user-nav-item flex w-full items-center transition-all duration-200"
            style={{ color: "#000000" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 215, 0, 0.1)";
              e.currentTarget.style.color = "#FFD700";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#000000";
            }}
          >
            <Trophy className="mr-2 h-4 w-4" style={{ color: "#FFD700" }} />
            {t('nav.dashboard', 'Dashboard')}
            <DropdownMenuShortcut style={{ color: "rgba(0, 0, 0, 0.5)" }}>⌘D</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to="/itinerary"
            className="user-nav-item flex w-full items-center transition-all duration-200"
            style={{ color: "#000000" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(220, 38, 38, 0.1)";
              e.currentTarget.style.color = "#DC2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#000000";
            }}
          >
            <Calendar className="mr-2 h-4 w-4" style={{ color: "#DC2626" }} />
            {t('nav.itinerary', 'Itinerary')}
            <DropdownMenuShortcut style={{ color: "rgba(0, 0, 0, 0.5)" }}>⌘I</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator style={{ background: "rgba(0, 0, 0, 0.1)" }} />

        <DropdownMenuItem asChild>
          <Link
            to="/settings"
            className="user-nav-item flex w-full items-center transition-all duration-200"
            style={{ color: "#000000" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
              e.currentTarget.style.color = "#000000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#000000";
            }}
          >
            <Settings className="mr-2 h-4 w-4" style={{ color: "rgba(0, 0, 0, 0.6)" }} />
            {t('user.settings', 'Settings')}
            <DropdownMenuShortcut style={{ color: "rgba(0, 0, 0, 0.5)" }}>⌘S</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}