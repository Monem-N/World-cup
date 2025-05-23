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
import "~/styles/header-design-system.css";

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
 * Enhanced navigation items configuration following FIFA Club World Cup 2025 Design System
 * Uses hardcoded hex values: Gold (#FFD700), Red (#DC2626), Black (#000000)
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
    color: "135deg, #FFD700 0%, #DC2626 100%", // Primary gold-to-red gradient
    accent: "#FFD700", // Gold accent
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
    color: "135deg, #DC2626 0%, #FFD700 100%", // Secondary red-to-gold gradient
    accent: "#DC2626", // Red accent
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
    color: "135deg, #FFD700 0%, #DC2626 50%, #FFD700 100%", // Complex multi-stop gradient
    accent: "#FFD700" // Gold accent
  },
  {
    path: "/teams",
    icon: Users,
    label: "nav.teams",
    defaultText: "Teams",
    description: "nav.teamsDescription",
    defaultDescription: "Deep dive into team stats, player profiles, and tactical analysis",
    color: "135deg, #DC2626 0%, #FFD700 50%, #DC2626 100%", // Complex multi-stop gradient (red variant)
    accent: "#DC2626" // Red accent
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
        "header-base sticky top-0 z-50 w-full transition-all duration-500 ease-out",
        scrolled
          ? "header-scrolled glass-premium border-b border-white/20 shadow-lg shadow-black/5"
          : "header-default border-b border-white/10"
      )}
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.8)"
          : "linear-gradient(135deg, #FFD700 0%, #DC2626 100%)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none"
      }}
    >
      {/* Animated background overlay following design system */}
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 50%, rgba(220, 38, 38, 0.1) 100%)"
        }}
      ></div>

      <div className="relative flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and navigation */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Enhanced Logo following design system */}
          <Link
            to="/"
            className="header-logo-container group flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div
                className="header-logo-icon flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                style={{
                  background: scrolled
                    ? "linear-gradient(135deg, #FFD700 0%, #DC2626 100%)"
                    : "rgba(255, 255, 255, 0.9)"
                }}
              >
                <Trophy
                  className="h-5 w-5 transition-colors duration-300"
                  style={{
                    color: scrolled ? "#FFFFFF" : "#FFD700"
                  }}
                />
              </div>
              {/* Pulsing ring effect with design system colors */}
              <div
                className="absolute inset-0 rounded-full opacity-30 animate-ping group-hover:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #FFD700 0%, #DC2626 100%)"
                }}
              ></div>
            </div>
            <div className="hidden sm:block">
              <span
                className="header-logo-title font-bold text-lg transition-colors duration-300"
                style={{
                  color: scrolled ? "#000000" : "#FFFFFF"
                }}
              >
                {t('app.title', 'World Cup Itinerary')}
              </span>
              <div
                className="header-logo-subtitle text-xs font-medium transition-colors duration-300"
                style={{
                  color: scrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.8)"
                }}
              >
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
                      className="nav-trigger h-10 gap-2 px-3 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{
                        color: scrolled
                          ? (isActive ? "#FFFFFF" : "rgba(0, 0, 0, 0.7)")
                          : "rgba(255, 255, 255, 0.9)",
                        background: isActive
                          ? (scrolled
                              ? "linear-gradient(135deg, #FFD700 0%, #DC2626 100%)"
                              : "rgba(255, 255, 255, 0.2)")
                          : "transparent",
                        fontWeight: isActive ? "600" : "normal",
                        boxShadow: isActive ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = scrolled
                            ? "rgba(0, 0, 0, 0.1)"
                            : "rgba(255, 255, 255, 0.1)";
                          e.currentTarget.style.color = scrolled
                            ? "#000000"
                            : "#FFFFFF";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = scrolled
                            ? "rgba(0, 0, 0, 0.7)"
                            : "rgba(255, 255, 255, 0.9)";
                        }
                      }}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{t(item.label, item.defaultText)}</span>
                      {item.badge && (
                        <Badge
                          variant="outline"
                          className="nav-badge ml-1 px-1.5 py-0 h-4 text-[10px] font-medium animate-pulse"
                          style={{
                            borderColor: item.defaultBadge === "Hot" ? "#DC2626" : "#FFD700",
                            color: item.defaultBadge === "Hot" ? "#DC2626" : "#FFD700",
                            backgroundColor: item.defaultBadge === "Hot"
                              ? "rgba(220, 38, 38, 0.1)"
                              : "rgba(255, 215, 0, 0.1)"
                          }}
                        >
                          {t(item.badge || '', item.defaultBadge || '')}
                        </Badge>
                      )}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div
                        className="nav-content w-[500px] p-6 rounded-xl shadow-2xl border"
                        style={{
                          background: "rgba(255, 255, 255, 0.95)",
                          backdropFilter: "blur(20px) saturate(180%)",
                          borderColor: "rgba(255, 255, 255, 0.2)"
                        }}
                      >
                        <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
                          {/* Featured section */}
                          <div className="relative overflow-hidden rounded-lg">
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.path}
                                className="nav-featured-link flex h-full w-full select-none flex-col justify-end rounded-lg p-6 no-underline outline-none focus:shadow-lg transition-all duration-300 hover:scale-105 text-white relative overflow-hidden"
                                style={{
                                  background: `linear-gradient(${item.color})`
                                }}
                              >
                                {/* Animated background pattern */}
                                <div
                                  className="absolute inset-0 animate-pulse"
                                  style={{
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)"
                                  }}
                                ></div>
                                <item.icon className="h-8 w-8 mb-3 relative z-10" />
                                <div className="mb-2 text-lg font-bold relative z-10">
                                  {t(item.label, item.defaultText)}
                                </div>
                                <p className="text-sm leading-tight relative z-10" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                  {t(item.description, item.defaultDescription)}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </div>

                          {/* Quick links */}
                          {item.quickLinks && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 px-2 py-1">
                                <Sparkles className="h-4 w-4" style={{ color: "rgba(0, 0, 0, 0.5)" }} />
                                <span className="text-sm font-semibold" style={{ color: "rgba(0, 0, 0, 0.7)" }}>Quick Access</span>
                              </div>
                              <div className="grid gap-2">
                                {item.quickLinks.map((link) => (
                                  <NavigationMenuLink key={link.path} asChild>
                                    <Link
                                      to={link.path}
                                      className="nav-quick-link group flex items-center gap-3 rounded-lg p-3 text-sm transition-all duration-200 hover:translate-x-1"
                                      style={{
                                        background: "transparent"
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                      }}
                                    >
                                      {link.icon && (
                                        <div
                                          className="nav-quick-icon flex h-8 w-8 items-center justify-center rounded-lg transition-colors group-hover:scale-110"
                                          style={{
                                            color: item.accent,
                                            backgroundColor: `${item.accent}1A` // 10% opacity
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = `${item.accent}33`; // 20% opacity
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = `${item.accent}1A`; // 10% opacity
                                          }}
                                        >
                                          <link.icon className="h-4 w-4" />
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        <span
                                          className="font-medium transition-colors"
                                          style={{ color: "#000000" }}
                                        >
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

        {/* Enhanced Utility items following design system */}
        <div className="header-utilities flex items-center gap-2">
          {/* Enhanced Search */}
          <div className="relative hidden sm:block">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder={t('search.placeholder', 'Search matches, teams, venues...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="header-search-input w-64 h-9 text-sm transition-all duration-300"
                  style={{
                    background: scrolled ? "#FFFFFF" : "rgba(255, 255, 255, 0.2)",
                    borderColor: scrolled ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.3)",
                    color: scrolled ? "#000000" : "#FFFFFF"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#FFD700";
                    if (!scrolled) {
                      e.target.style.background = "rgba(255, 255, 255, 0.3)";
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = scrolled ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.3)";
                    if (!scrolled) {
                      e.target.style.background = "rgba(255, 255, 255, 0.2)";
                    }
                  }}
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(false)}
                  className="header-search-close h-9 px-2"
                  style={{
                    color: scrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.8)"
                  }}
                >
                  ✕
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="header-search-button h-9 w-9 transition-all duration-300 hover:scale-110"
                style={{
                  color: scrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.9)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = scrolled ? "#000000" : "#FFFFFF";
                  e.currentTarget.style.background = scrolled ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.background = "transparent";
                }}
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
            className="header-notifications hidden sm:flex h-9 w-9 relative transition-all duration-300 hover:scale-110"
            style={{
              color: scrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.9)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = scrolled ? "#000000" : "#FFFFFF";
              e.currentTarget.style.background = scrolled ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = scrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.9)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                  style={{ background: "#DC2626" }}
                ></span>
                <span
                  className="relative inline-flex rounded-full h-4 w-4 text-[10px] font-bold text-white items-center justify-center"
                  style={{ background: "#DC2626" }}
                >
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
            className="header-settings hidden lg:flex h-9 w-9 transition-all duration-300 hover:scale-110 hover:rotate-90"
            style={{
              color: scrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.9)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = scrolled ? "#000000" : "#FFFFFF";
              e.currentTarget.style.background = scrolled ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = scrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.9)";
              e.currentTarget.style.background = "transparent";
            }}
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