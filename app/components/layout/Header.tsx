import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { UserNav } from "~/components/layout/UserNav";
import { MobileNav } from "~/components/layout/MobileNav";
import { LanguageSwitcher } from "~/components/layout/LanguageSwitcher";
import { cn } from "~/lib/utils";
import { Trophy, Calendar, MapPin, Users, Search, Bell } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "~/components/ui/navigation-menu";
import { Badge } from "~/components/ui/badge";

/**
 * Navigation items configuration
 */
const navigationItems = [
  {
    path: "/dashboard",
    icon: Trophy,
    label: "nav.dashboard",
    defaultText: "Dashboard",
    description: "nav.dashboardDescription",
    defaultDescription: "View your personalized dashboard with upcoming matches and events",
    badge: "nav.badgeNew",
    defaultBadge: "New",
    quickLinks: [
      { path: "/dashboard/overview", label: "nav.overview", defaultLabel: "Overview" },
      { path: "/dashboard/itinerary", label: "nav.itineraryQuickLink", defaultLabel: "Itinerary" },
      { path: "/dashboard/essentials", label: "nav.essentials", defaultLabel: "Essentials" },
    ]
  },
  {
    path: "/itinerary",
    icon: Calendar,
    label: "nav.itinerary",
    defaultText: "Itinerary",
    description: "nav.itineraryDescription",
    defaultDescription: "Plan and manage your daily schedule during the tournament",
    quickLinks: [
      { path: "/itinerary/2025-06-14", label: "nav.itineraryDate1", defaultLabel: "June 14, 2025 (Arrival)" },
      { path: "/itinerary/2025-06-16", label: "nav.itineraryDate2", defaultLabel: "June 16, 2025 (Match Day)" },
      { path: "/itinerary/2025-06-20", label: "nav.itineraryDate3", defaultLabel: "June 20, 2025 (Match Day)" },
      { path: "/itinerary/2025-06-24", label: "nav.itineraryDate4", defaultLabel: "June 24, 2025 (Match Day)" },
    ]
  },
  {
    path: "/venues",
    icon: MapPin,
    label: "nav.venues",
    defaultText: "Venues",
    description: "nav.venuesDescription",
    defaultDescription: "Explore stadiums and locations hosting World Cup matches"
  },
  {
    path: "/teams",
    icon: Users,
    label: "nav.teams",
    defaultText: "Teams",
    description: "nav.teamsDescription",
    defaultDescription: "Browse participating teams, players, and match statistics"
  },
];

/**
 * Header component
 *
 * A professional header with shadcn/ui components, gradient background, and animated navigation
 */
export function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-r from-yellow-500 to-red-500 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and navigation */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-primary/10 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-primary-foreground hidden sm:inline-block">
              {t('app.title', 'World Cup Itinerary')}
            </span>
          </Link>

          {/* Desktop Navigation using shadcn NavigationMenu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => {
                const isActive = item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

                return (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuTrigger
                      className={cn(
                        "h-9 gap-1.5 text-primary-foreground/90 hover:text-primary-foreground bg-transparent hover:bg-primary/10 data-[state=open]:bg-primary/10",
                        isActive && "font-medium text-primary-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{t(item.label, item.defaultText)}</span>
                      {item.badge && (
                        <Badge variant="outline" className="ml-1 px-1 py-0 h-4 text-[10px] font-medium border-primary-foreground/30 text-primary-foreground/90">
                          {t(item.badge, item.defaultBadge)}
                        </Badge>
                      )}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.path}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            >
                              <item.icon className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {t(item.label, item.defaultText)}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {t(item.description, item.defaultDescription)}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {item.quickLinks && (
                          <>
                            <li className="col-span-1">
                              <div className="px-2 py-1.5 text-xs font-semibold">Quick Access</div>
                              <ul className="grid gap-1">
                                {item.quickLinks.map((link) => (
                                  <li key={link.path}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        to={link.path}
                                        className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                      >
                                        {t(link.label, link.defaultLabel)}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </>
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>

        {/* Utility items */}
        <div className="flex items-center gap-3">
          {/* Search button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/10"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/10 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Mobile navigation - only visible on mobile */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          {/* User account navigation */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}