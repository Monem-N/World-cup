import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import {
  Menu,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Globe,
  Settings,
  ChevronRight,
  Bell,
  Search,
  Home
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";

// Define the types for navigation items
type NavChild = {
  path: string;
  label: string;
};

type NavItem = {
  path: string;
  icon: React.ElementType;
  label: string;
  defaultText: string;
  badge?: string;
  children?: NavChild[];
};

// Navigation items configuration - same as in Header
const navigationItems: NavItem[] = [
  {
    path: "/",
    icon: Home,
    label: "nav.home",
    defaultText: "Home"
  },
  {
    path: "/dashboard",
    icon: Trophy,
    label: "nav.dashboard",
    defaultText: "Dashboard",
    badge: "New",
    children: [
      { path: "/dashboard/overview", label: "Overview" },
      { path: "/dashboard/itinerary", label: "Itinerary" },
      { path: "/dashboard/essentials", label: "Essentials" },
    ]
  },
  {
    path: "/itinerary",
    icon: Calendar,
    label: "nav.itinerary",
    defaultText: "Itinerary",
    children: [
      { path: "/itinerary/2025-06-14", label: "June 14, 2025 (Arrival)" },
      { path: "/itinerary/2025-06-16", label: "June 16, 2025 (Match Day)" },
      { path: "/itinerary/2025-06-20", label: "June 20, 2025 (Match Day)" },
      { path: "/itinerary/2025-06-24", label: "June 24, 2025 (Match Day)" },
    ]
  },
  {
    path: "/venues",
    icon: MapPin,
    label: "nav.venues",
    defaultText: "Venues"
  },
  {
    path: "/teams",
    icon: Users,
    label: "nav.teams",
    defaultText: "Teams"
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const handleLinkClick = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-nav-trigger md:hidden transition-all duration-300 hover:scale-110"
          style={{
            color: "rgba(255, 255, 255, 0.9)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#FFFFFF";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('nav.menu', 'Menu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="mobile-nav-content w-[80%] sm:w-[350px] p-0"
        style={{
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <SheetHeader
          className="border-b p-6"
          style={{
            background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)",
            borderColor: "rgba(255, 255, 255, 0.1)"
          }}
        >
          <SheetTitle className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background: "rgba(255, 215, 0, 0.1)"
              }}
            >
              <Trophy className="h-5 w-5" style={{ color: "#FFD700" }} />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold" style={{ color: "#FFFFFF" }}>
                {t('app.title', 'World Cup Itinerary')}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                {t('user.worldCupFan', 'World Cup Fan')}
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="px-1 py-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {/* Quick actions following design system */}
          <div className="flex justify-between px-4 py-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              className="mobile-nav-quick-action w-[48%]"
              style={{
                borderColor: "rgba(255, 215, 0, 0.3)",
                color: "#FFD700",
                background: "rgba(255, 215, 0, 0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.2)";
                e.currentTarget.style.borderColor = "#FFD700";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.3)";
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              {t('nav.search', 'Search')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="mobile-nav-quick-action w-[48%]"
              style={{
                borderColor: "rgba(220, 38, 38, 0.3)",
                color: "#DC2626",
                background: "rgba(220, 38, 38, 0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(220, 38, 38, 0.2)";
                e.currentTarget.style.borderColor = "#DC2626";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(220, 38, 38, 0.1)";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.3)";
              }}
            >
              <Bell className="h-4 w-4 mr-2" />
              {t('nav.notifications', 'Notifications')}
            </Button>
          </div>

          <Separator className="my-2" style={{ background: "rgba(255, 255, 255, 0.1)" }} />

          {/* Main navigation */}
          <div className="grid gap-1 px-2">
            {navigationItems.map((item) => {
              const isActive = item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={item.path} className="w-full">
                  {hasChildren ? (
                    <Collapsible className="w-full">
                      <div className="flex items-center">
                        <Link
                          to={item.path}
                          onClick={handleLinkClick}
                          className={cn(
                            "flex flex-1 items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-muted"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{t(item.label, item.defaultText)}</span>

                          {item.badge && (
                            <Badge variant="outline" className="ml-auto mr-2 px-1 py-0 h-4 text-[10px] font-medium">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>

                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-8 w-8 mr-2"
                          >
                            <ChevronRight className="h-4 w-4 transition-transform duration-200 ui-open:rotate-90" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>

                      <CollapsibleContent>
                        <div className="ml-6 pl-3 border-l border-muted mt-1 mb-1">
                          {item.children?.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={handleLinkClick}
                              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{t(item.label, item.defaultText)}</span>

                      {item.badge && (
                        <Badge variant="outline" className="ml-auto px-1 py-0 h-4 text-[10px] font-medium">
                          {item.badge}
                        </Badge>
                      )}

                      {isActive && (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Settings section */}
          <div className="px-3">
            <h3 className="mb-2 px-4 text-xs font-medium text-muted-foreground">
              {t('nav.settings', 'Settings')}
            </h3>
            <div className="grid gap-1 px-2">
              <Link
                to="/settings"
                onClick={handleLinkClick}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                <span>{t('nav.settings', 'Settings')}</span>
              </Link>
              <Link
                to="/settings/language"
                onClick={handleLinkClick}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                <Globe className="h-4 w-4" />
                <span>{t('nav.language', 'Language')}</span>
              </Link>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-auto border-t p-4">
          <div className="flex gap-2 w-full">
            <Button
              asChild
              variant="outline"
              className="flex-1 justify-center gap-2"
            >
              <Link to="/dashboard" onClick={handleLinkClick}>
                <Trophy className="h-4 w-4" />
                {t('nav.dashboard', 'Dashboard')}
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="flex-1 justify-center gap-2"
            >
              <Link to="/itinerary" onClick={handleLinkClick}>
                <Calendar className="h-4 w-4" />
                {t('nav.itinerary', 'Itinerary')}
              </Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}