import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { UserNav } from "~/components/layout/UserNav";
import { MobileNav } from "~/components/layout/MobileNav";
import { LanguageSwitcher } from "~/components/layout/LanguageSwitcher";
import { cn } from "~/lib/utils";
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Search,
  Bell,
  Sparkles,
  Zap,
  Star,
  Flame,
  BarChart3,
  Settings,
  Target,
  TrendingUp
} from "lucide-react";
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
import { Input } from "~/components/ui/input";
import * as React from "react";

// Define types for navigation items
interface QuickLink {
  path: string;
  label: string;
  defaultLabel: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavigationItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  defaultText: string;
  description: string;
  defaultDescription: string;
  badge?: string;
  defaultBadge?: string;
  color: string;
  accent: string;
  quickLinks?: QuickLink[];
}

/**
 * Enhanced navigation items configuration with more visual elements
 */
const navigationItems: NavigationItem[] = [
  {
    path: "/dashboard",
    icon: Trophy,
    label: "nav.dashboard",
    defaultText: "Dashboard",
    description: "nav.dashboardDescription",
    defaultDescription: "Your personalized command center with live match updates and smart recommendations",
    badge: "nav.badgeNew",
    defaultBadge: "New",
    color: "from-yellow-500 to-amber-600",
    accent: "text-yellow-500",
    quickLinks: [
      { path: "/dashboard/overview", label: "nav.overview", defaultLabel: "Overview", icon: BarChart3 },
      { path: "/dashboard/itinerary", label: "nav.itineraryQuickLink", defaultLabel: "My Itinerary", icon: Calendar },
      { path: "/dashboard/essentials", label: "nav.essentials", defaultLabel: "Match Essentials", icon: Star },
      { path: "/dashboard/analytics", label: "nav.analytics", defaultLabel: "Performance Analytics", icon: TrendingUp },
    ]
  },
  {
    path: "/itinerary",
    icon: Calendar,
    label: "nav.itinerary",
    defaultText: "Itinerary",
    description: "nav.itineraryDescription",
    defaultDescription: "AI-powered schedule optimization for the ultimate World Cup experience",
    color: "from-blue-500 to-cyan-600",
    accent: "text-blue-500",
    badge: "nav.badgeHot",
    defaultBadge: "Hot",
    quickLinks: [
      { path: "/itinerary/2025-06-14", label: "nav.itineraryDate1", defaultLabel: "June 14 - Grand Arrival", icon: Sparkles },
      { path: "/itinerary/2025-06-16", label: "nav.itineraryDate2", defaultLabel: "June 16 - Opening Match", icon: Flame },
      { path: "/itinerary/2025-06-20", label: "nav.itineraryDate3", defaultLabel: "June 20 - Group Stage", icon: Target },
      { path: "/itinerary/2025-06-24", label: "nav.itineraryDate4", defaultLabel: "June 24 - Knockout Round", icon: Zap },
    ]
  },
  {
    path: "/venues",
    icon: MapPin,
    label: "nav.venues",
    defaultText: "Venues",
    description: "nav.venuesDescription",
    defaultDescription: "Explore iconic stadiums with 360° virtual tours and insider guides",
    color: "from-emerald-500 to-teal-600",
    accent: "text-emerald-500"
  },
  {
    path: "/teams",
    icon: Users,
    label: "nav.teams",
    defaultText: "Teams",
    description: "nav.teamsDescription",
    defaultDescription: "Deep dive into team stats, player profiles, and tactical analysis",
    color: "from-purple-500 to-violet-600",
    accent: "text-purple-500"
  },
];

/**
 * Enhanced Header component with modern glassmorphism design and advanced interactions
 */
export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [notificationCount] = React.useState(3);

  // Handle scroll effect for header background
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-out",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"
          : "bg-gradient-to-r from-yellow-500 via-amber-500 to-red-500 border-b border-white/10"
      )}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-red-500/10 animate-pulse"></div>

      <div className="relative flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and navigation */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Enhanced Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                scrolled ? "bg-gradient-to-r from-yellow-500 to-red-500" : "bg-white/90"
              )}>
                <Trophy className={cn(
                  "h-5 w-5 transition-colors duration-300",
                  scrolled ? "text-white" : "text-yellow-600"
                )} />
              </div>
              {/* Pulsing ring effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 opacity-30 animate-ping group-hover:opacity-50"></div>
            </div>
            <div className="hidden sm:block">
              <span className={cn(
                "font-bold text-lg transition-colors duration-300",
                scrolled ? "text-gray-900" : "text-white"
              )}>
                {t('app.title', 'World Cup Itinerary')}
              </span>
              <div className={cn(
                "text-xs font-medium transition-colors duration-300",
                scrolled ? "text-gray-600" : "text-white/80"
              )}>
                {t('app.subtitle', 'Your Ultimate Match Companion')}
              </div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
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
                        "h-10 gap-2 px-3 rounded-lg transition-all duration-300 hover:scale-105",
                        scrolled
                          ? "text-gray-700 hover:text-gray-900 bg-transparent hover:bg-gray-100"
                          : "text-white/90 hover:text-white bg-transparent hover:bg-white/10",
                        isActive && "font-semibold shadow-md",
                        isActive && scrolled && "bg-gradient-to-r from-yellow-500 to-red-500 text-white",
                        isActive && !scrolled && "bg-white/20"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{t(item.label, item.defaultText)}</span>
                      {item.badge && (
                        <Badge
                          variant="outline"
                          className={cn(
                            "ml-1 px-1.5 py-0 h-4 text-[10px] font-medium animate-pulse",
                            item.defaultBadge === "Hot"
                              ? "border-red-400 text-red-500 bg-red-50"
                              : "border-yellow-400 text-yellow-600 bg-yellow-50"
                          )}
                        >
                          {t(item.badge || '', item.defaultBadge || '')}
                        </Badge>
                      )}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[500px] p-6 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20">
                        <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
                          {/* Featured section */}
                          <div className="relative overflow-hidden rounded-lg">
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.path}
                                className={cn(
                                  "flex h-full w-full select-none flex-col justify-end rounded-lg p-6 no-underline outline-none focus:shadow-lg transition-all duration-300 hover:scale-105",
                                  `bg-gradient-to-br ${item.color} text-white relative overflow-hidden`
                                )}
                              >
                                {/* Animated background pattern */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-pulse"></div>
                                <item.icon className="h-8 w-8 mb-3 relative z-10" />
                                <div className="mb-2 text-lg font-bold relative z-10">
                                  {t(item.label, item.defaultText)}
                                </div>
                                <p className="text-sm leading-tight text-white/90 relative z-10">
                                  {t(item.description, item.defaultDescription)}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </div>

                          {/* Quick links */}
                          {item.quickLinks && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 px-2 py-1">
                                <Sparkles className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-semibold text-gray-700">Quick Access</span>
                              </div>
                              <div className="grid gap-2">
                                {item.quickLinks.map((link) => (
                                  <NavigationMenuLink key={link.path} asChild>
                                    <Link
                                      to={link.path}
                                      className="group flex items-center gap-3 rounded-lg p-3 text-sm transition-all duration-200 hover:bg-gray-50 hover:translate-x-1"
                                    >
                                      {link.icon && (
                                        <div className={cn(
                                          "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                                          `${item.accent} bg-current/10 group-hover:bg-current/20`
                                        )}>
                                          <link.icon className="h-4 w-4" />
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        <span className="font-medium text-gray-900 group-hover:text-gray-700">
                                          {t(link.label, link.defaultLabel)}
                                        </span>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>

        {/* Enhanced Utility items */}
        <div className="flex items-center gap-2">
          {/* Enhanced Search */}
          <div className="relative hidden sm:block">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder={t('search.placeholder', 'Search matches, teams, venues...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "w-64 h-9 text-sm transition-all duration-300",
                    scrolled
                      ? "bg-white border-gray-200 focus:border-yellow-500"
                      : "bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                  )}
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(false)}
                  className={cn(
                    "h-9 px-2",
                    scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"
                  )}
                >
                  ✕
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "h-9 w-9 transition-all duration-300 hover:scale-110",
                  scrolled
                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>

          {/* Enhanced Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden sm:flex h-9 w-9 relative transition-all duration-300 hover:scale-110",
              scrolled
                ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                : "text-white/90 hover:text-white hover:bg-white/10"
            )}
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] font-bold text-white items-center justify-center">
                  {notificationCount}
                </span>
              </div>
            )}
            <span className="sr-only">Notifications ({notificationCount})</span>
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden lg:flex h-9 w-9 transition-all duration-300 hover:scale-110 hover:rotate-90",
              scrolled
                ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                : "text-white/90 hover:text-white hover:bg-white/10"
            )}
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Mobile navigation */}
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