# World Cup Itinerary App UI/UX Implementation Tasks

## Navigation System Implementation

### 1. Global Navigation Header

```typescript
// File: app/components/layout/Header.tsx
// Implementation: Create responsive header with navigation links

import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { UserNav } from "~/components/layout/UserNav";

export function Header() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            {/* World Cup logo */}
            <span className="hidden font-bold sm:inline-block">
              {t('app.title')}
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              {t('nav.dashboard')}
            </Link>
            <Link to="/itinerary" className="text-sm font-medium transition-colors hover:text-primary">
              {t('nav.itinerary')}
            </Link>
            {/* Add other navigation links */}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            {/* Mobile menu burger icon */}
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
```

**Helper Notes:**
- Use fixed positioning for the header with z-index to ensure it stays above content
- Implement responsive design with hidden elements on mobile
- Use backdrop-blur for modern glass effect with fallbacks
- Ensure all text has translation keys

### 2. User Account Navigation

```typescript
// File: app/components/layout/UserNav.tsx
// Implementation: Create user dropdown with account options

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

export function UserNav() {
  const { t } = useTranslation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <span className="sr-only">{t('user.account')}</span>
          {/* User avatar or initials */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">username</p>
            <p className="text-xs leading-none text-muted-foreground">
email@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {t('user.profile')}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {t('user.settings')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {t('user.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

**Helper Notes:**
- Use shadcn/ui dropdown components for consistency
- Add appropriate ARIA attributes for accessibility
- Include visual separation between menu sections
- Ensure the dropdown appears in the correct position on all devices

### 3. Mobile Navigation Menu

```typescript
// File: app/components/layout/MobileNav.tsx
// Implementation: Create slide-out mobile navigation

import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('nav.menu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px]">
        <div className="flex flex-col gap-4 py-4">
          <Link to="/dashboard" onClick={() => setOpen(false)} className="px-2 py-1 text-lg">
            {t('nav.dashboard')}
          </Link>
          <Link to="/itinerary" onClick={() => setOpen(false)} className="px-2 py-1 text-lg">
            {t('nav.itinerary')}
          </Link>
          {/* Other navigation links */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

**Helper Notes:**
- Use Sheet component from shadcn/ui for slide-out behavior
- Ensure menu closes when a link is clicked
- Make touch targets large enough (minimum 44px height) for mobile
- Add subtle animations for better UX

### 4. Breadcrumb Navigation

```typescript
// File: app/components/navigation/Breadcrumbs.tsx
// Implementation: Create breadcrumb navigation

import { Link, useMatches } from "react-router";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Breadcrumbs() {
  const matches = useMatches();
  const { t } = useTranslation();
  
  // Filter out routes that don't have breadcrumb data or are hidden
  const crumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match) => ({
      title: typeof match.handle.breadcrumb === 'function' 
        ? match.handle.breadcrumb(match.data)
        : t(match.handle.breadcrumb),
      path: match.pathname
    }));

  return (
    <nav aria-label="Breadcrumbs" className="mb-4 flex text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            {t('nav.home')}
          </Link>
        </li>
        {crumbs.map((crumb, idx) => (
          <li key={idx} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {idx === crumbs.length - 1 ? (
              <span className="ml-2 font-medium">{crumb.title}</span>
            ) : (
              <Link 
                to={crumb.path} 
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                {crumb.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

**Helper Notes:**
- Leverage React Router's useMatches hook for automatic breadcrumb generation
- Add route handle data for breadcrumb information
- Make the current page non-clickable and visually distinct
- Use ARIA labels for accessibility

## Visual Design Implementation

### 1. World Cup Theme System

```typescript
// File: app/lib/theme.ts
// Implementation: Create World Cup themed color system

export const worldCupColors = {
  // Primary colors based on Qatar World Cup
  primary: {
    DEFAULT: "hsl(350, 90%, 45%)", // Maroon red (Qatar color)
    foreground: "hsl(0, 0%, 100%)",
  },
  // Secondary colors
  secondary: {
    DEFAULT: "hsl(205, 100%, 50%)", // Bright blue
    foreground: "hsl(0, 0%, 100%)",
  },
  // Accent colors for different activity types
  accent: {
    DEFAULT: "hsl(40, 95%, 55%)", // Gold
    foreground: "hsl(0, 0%, 0%)",
  },
  // Status colors
  success: {
    DEFAULT: "hsl(142, 70%, 45%)",
    foreground: "hsl(0, 0%, 100%)",
  },
  warning: {
    DEFAULT: "hsl(38, 95%, 50%)",
    foreground: "hsl(0, 0%, 0%)",
  },
  danger: {
    DEFAULT: "hsl(358, 85%, 55%)",
    foreground: "hsl(0, 0%, 100%)",
  },
  // Team colors for various countries
  teams: {
    qatar: "hsl(350, 90%, 45%)",
    brazil: "hsl(120, 100%, 30%)",
    argentina: "hsl(210, 100%, 70%)",
    // Add more team colors as needed
  }
};

// Update the CSS variables in app.css with these color values
```

**Helper Notes:**
- Use HSL color format for easier manipulation of lightness and saturation
- Create consistent color pairs with foreground text that meets WCAG contrast requirements
- Add team colors for easy theming based on favorite team
- Implement as CSS variables in app.css

### 2. Typography System

```css
/* File: app/app.css */
/* Implementation: Create consistent typography scale */

:root {
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-heading: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  
  /* Font sizes using fluid typography */
  --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 1.125rem + 0.625vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --font-size-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --font-size-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
  
  /* Line heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-loose: 1.75;
  
  /* Font weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

/* Apply base typography */
html {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: var(--line-height-normal);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }
h5 { font-size: var(--font-size-lg); }
h6 { font-size: var(--font-size-base); }

/* Add tailwind classes for typography */
@layer utilities {
  .text-heading-1 { @apply font-heading text-4xl font-bold leading-tight; }
  .text-heading-2 { @apply font-heading text-3xl font-bold leading-tight; }
  .text-heading-3 { @apply font-heading text-2xl font-semibold leading-tight; }
  .text-heading-4 { @apply font-heading text-xl font-semibold leading-tight; }
  .text-body-lg { @apply text-lg leading-normal; }
  .text-body { @apply text-base leading-normal; }
  .text-body-sm { @apply text-sm leading-normal; }
  .text-caption { @apply text-xs leading-tight; }
}
```

**Helper Notes:**
- Implement fluid typography that scales based on viewport width
- Create consistent type scale for headings and body text
- Maintain accessible line heights for readability
- Use Tailwind utility classes for easy application

### 3. Layout Components

```typescript
// File: app/components/layout/PageLayout.tsx
// Implementation: Create consistent page layout with header, content, and footer

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "../navigation/Breadcrumbs";

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
}

export function PageLayout({ children, showBreadcrumbs = true }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          {showBreadcrumbs && <Breadcrumbs />}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

```typescript
// File: app/components/layout/Footer.tsx
// Implementation: Create consistent footer with navigation and legal info

import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-6 md:py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h4 className="text-base font-semibold">{t('footer.about')}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              {/* Add more about links */}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold">{t('footer.support')}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground">
                  {t('footer.faq')}
                </Link>
              </li>
              {/* Add more support links */}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold">{t('footer.legal')}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {currentYear} World Cup Itinerary. {t('footer.allRightsReserved')}
        </div>
      </div>
    </footer>
  );
}
```

**Helper Notes:**
- Create flexible layouts that accommodate different content needs
- Use semantic HTML elements (header, main, footer)
- Ensure consistent spacing and container widths
- Add proper grid structures for responsive layouts

### 4. Landing Page

```typescript
// File: app/routes/index.tsx
// Implementation: Create compelling landing page

import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { PageLayout } from "~/components/layout/PageLayout";

export default function LandingPage() {
  const { t } = useTranslation();
  
  return (
    <PageLayout showBreadcrumbs={false}>
      {/* Hero section */}
      <section className="py-12 md:py-20">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-heading-1 max-w-4xl">
            {t('landing.heroTitle')}
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            {t('landing.heroSubtitle')}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">{t('landing.getStarted')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/demo">{t('landing.viewDemo')}</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-heading-2 text-center">{t('landing.features')}</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {/* Feature icon */}
              </div>
              <h3 className="mt-4 text-heading-4">{t('landing.feature1Title')}</h3>
              <p className="mt-2 text-muted-foreground">
                {t('landing.feature1Description')}
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {/* Feature icon */}
              </div>
              <h3 className="mt-4 text-heading-4">{t('landing.feature2Title')}</h3>
              <p className="mt-2 text-muted-foreground">
                {t('landing.feature2Description')}
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {/* Feature icon */}
              </div>
              <h3 className="mt-4 text-heading-4">{t('landing.feature3Title')}</h3>
              <p className="mt-2 text-muted-foreground">
                {t('landing.feature3Description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container flex flex-col items-center text-center">
          <h2 className="text-heading-2">{t('landing.ctaTitle')}</h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            {t('landing.ctaDescription')}
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/register">{t('landing.signUp')}</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
```

**Helper Notes:**
- Create visually appealing sections with proper spacing
- Use responsive grids for feature display
- Include compelling calls-to-action
- Ensure all text is internationalized

## Enhanced Features Implementation

### 1. Match Countdown Timer

```typescript
// File: app/components/features/CountdownTimer.tsx
// Implementation: Create dynamic countdown timer for matches

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface CountdownTimerProps {
  targetDate: string | Date;
  onComplete?: () => void;
  className?: string;
}

export function CountdownTimer({ targetDate, onComplete, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { t } = useTranslation();
  
  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else if (onComplete) {
      onComplete();
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = timeLeft as any;
  
  if (!days && !hours && !minutes && !seconds) {
    return <div className={className}>{t('countdown.matchStarted')}</div>;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{days}</span>
        <span className="text-xs text-muted-foreground">{t('countdown.days')}</span>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{hours}</span>
        <span className="text-xs text-muted-foreground">{t('countdown.hours')}</span>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{minutes}</span>
        <span className="text-xs text-muted-foreground">{t('countdown.minutes')}</span>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{seconds}</span>
        <span className="text-xs text-muted-foreground">{t('countdown.seconds')}</span>
      </div>
    </div>
  );
}
```

**Helper Notes:**
- Use clean interval/timeout management with useEffect
- Include accessibility considerations for time display
- Add translations for all text elements
- Consider adding visual effects as time gets closer to zero

### 2. Stadium Map Component

```typescript
// File: app/components/features/StadiumMap.tsx
// Implementation: Create interactive stadium map with seat visualization

import { useState } from "react";
import { useTranslation } from "react-i18next";

interface StadiumMapProps {
  stadiumId: string;
  seatSection?: string;
  seatRow?: string;
  seatNumber?: string;
  onSectionClick?: (section: string) => void;
}

export function StadiumMap({ 
  stadiumId, 
  seatSection, 
  seatRow, 
  seatNumber, 
  onSectionClick 
}: StadiumMapProps) {
  const [activeSection, setActiveSection] = useState(seatSection);
  const { t } = useTranslation();
  
  // Stadium data would come from an API or static import
  const stadiumData = getStadiumData(stadiumId);
  
  function handleSectionClick(section: string) {
    setActiveSection(section);
    if (onSectionClick) {
      onSectionClick(section);
    }
  }
  
  if (!stadiumData) {
    return <div>{t('stadium.notFound')}</div>;
  }
  
  return (
    <div className="relative">
      <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
        {/* SVG stadium map would go here */}
        <svg viewBox="0 0 800 450" className="w-full h-full">
          {/* Render stadium sections from stadiumData */}
          {stadiumData.sections.map((section) => (
            <path
              key={section.id}
              d={section.path}
              className={`cursor-pointer transition-colors ${
                activeSection === section.id
                  ? 'fill-primary stroke-primary-foreground'
                  : 'fill-muted-foreground/20 stroke-muted-foreground/30 hover:fill-muted-foreground/30'
              }`}
              onClick={() => handleSectionClick(section.id)}
              aria-label={`${t('stadium.section')} ${section.name}`}
            />
          ))}
          
          {/* Field/pitch */}
          <rect
            x="250"
            y="150"
            width="300"
            height="150"
            className="fill-green-600/80 stroke-white"
          />
        </svg>
      </div>
      
      {/* Section information */}
      {activeSection && (
        <div className="mt-4 rounded-md border bg-card p-4 shadow-sm">
          <h3 className="text-heading-4">
            {t('stadium.section')} {activeSection}
          </h3>
          {seatRow && seatNumber && (
            <p className="mt-2">
              {t('stadium.yourSeat', { row: seatRow, number: seatNumber })}
            </p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            {stadiumData.sections.find((s) => s.id === activeSection)?.description}
          </p>
        </div>
      )}
    </div>
  );
}

// Helper function to fetch stadium data
function getStadiumData(stadiumId: string) {
  // This would typically come from an API
  const stadiums = {
    "lusail": {
      name: "Lusail Stadium",
      capacity: 80000,
      sections: [
        { id: "A", name: "A", path: "M100,100 L200,100 L200,200 L100,200 Z", description: "Main stand section A" },
        // Additional sections would be defined here
      ]
    },
    // Other stadiums would be defined here
  };
  
  return stadiums[stadiumId as keyof typeof stadiums];
}
```

**Helper Notes:**
- Use SVG for scalable, interactive stadium maps
- Implement proper accessibility for interactive elements
- Add hover states and active states for better UX
- Consider adding zoom functionality for large stadiums

### 3. Weather Forecast Integration

```typescript
// File: app/components/features/WeatherForecast.tsx
// Implementation: Create weather forecast display

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog } from "lucide-react";

interface WeatherForecastProps {
  date: string | Date;
  location: { lat: number; lng: number };
  className?: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export function WeatherForecast({ date, location, className }: WeatherForecastProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        // This would typically be an API call
        // const response = await fetch(`/api/weather?date=${formatDate(date)}&lat=${location.lat}&lng=${location.lng}`);
        // const data = await response.json();
        
        // Mock data for example
        const mockData: WeatherData = {
          temperature: 28,
          condition: "sunny",
          icon: "sun",
          precipitation: 0,
          humidity: 65,
          windSpeed: 12,
        };
        
        setWeather(mockData);
        setError(null);
      } catch (err) {
        setError(t('weather.error'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchWeather();
  }, [date, location.lat, location.lng, t]);
  
  function getWeatherIcon(icon: string) {
    switch (icon) {
      case "sun":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloud":
        return <Cloud className="h-8 w-8 text-slate-400" />;
      case "rain":
        return <CloudRain className="h-8 w-8 text-slate-400" />;
      case "snow":
        return <CloudSnow className="h-8 w-8 text-slate-400" />;
      case "thunder":
        return <CloudLightning className="h-8 w-8 text-slate-400" />;
      case "fog":
        return <CloudFog className="h-8 w-8 text-slate-400" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  }
  
  if (loading) {
    return (
      <div className={`animate-pulse rounded-md bg-muted p-4 ${className}`}>
        <div className="h-8 w-24 rounded-md bg-muted-foreground/20" />
        <div className="mt-2 h-4 w-32 rounded-md bg-muted-foreground/20" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`rounded-md bg-destructive/10 p-4 text-destructive ${className}`}>
        {error}
      </div>
    );
  }
  
  if (!weather) {
    return null;
  }
  
  return (
    <div className={`rounded-md border bg-card p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">{t('weather.forecast')}</h4>
          <p className="text-2xl font-bold">{weather.temperature}°C</p>
          <p className="text-sm text-muted-foreground">
            {t(`weather.conditions.${weather.condition}`)}
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          {getWeatherIcon(weather.icon)}
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <p className="text-muted-foreground">{t('weather.precipitation')}</p>
          <p className="font-medium">{weather.precipitation}%</p>
        </div>
        <div>
          <p className="text-muted-foreground">{t('weather.humidity')}</p>
          <p className="font-medium">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-muted-foreground">{t('weather.wind')}</p>
          <p className="font-medium">{weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}
```

**Helper Notes:**
- Implement proper loading and error states
- Use appropriate weather icons based on conditions
- Add translations for all weather conditions
- Consider caching weather data to reduce API calls

### 4. Transportation Time Estimates

```typescript
// File: app/components/features/TransportEstimate.tsx
// Implementation: Create transportation time estimates

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Clock, MapPin, Bus, Train, Car } from "lucide-react";

interface TransportEstimateProps {
  from: { lat: number; lng: number; name: string };
  to: { lat: number; lng: number; name: string };
  mode?: 'car' | 'public' | 'walking';
  departureTime?: Date;
  className?: string;
}

interface RouteEstimate {
  duration: number; // in minutes
  distance: number; // in kilometers
  arrivalTime: Date;
  transitOptions: Array<{
    mode: 'bus' | 'train' | 'car' | 'walk';
    duration: number;
    line?: string;
  }>;
}

export function TransportEstimate({ 
  from, 
  to, 
  mode = 'public', 
  departureTime = new Date(),
  className 
}: TransportEstimateProps) {
  const [estimate, setEstimate] = useState<RouteEstimate | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  
  useEffect(() => {
    async function fetchRouteEstimate() {
      try {
        setLoading(true);
        // This would typically be an API call
        // const response = await fetch(
        //   `/api/transport?from=${from.lat},${from.lng}&to=${to.lat},${to.lng}&mode=${mode}&departure=${departureTime.toISOString()}`
        // );
        // const data = await response.json();
        
        // Mock data for example
        setTimeout(() => {
          const mockEstimate: RouteEstimate = {
            duration: 45,
            distance: 12.5,
            arrivalTime: new Date(departureTime.getTime() + 45 * 60 * 1000),
            transitOptions: [
              { mode: 'walk', duration: 5 },
              { mode: 'bus', duration: 30, line: '22' },
              { mode: 'walk', duration: 10 }
            ]
          };
          
          setEstimate(mockEstimate);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    
    fetchRouteEstimate();
  }, [from, to, mode, departureTime]);
  
  function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  function getTransitIcon(mode: string) {
    switch (mode) {
      case 'bus':
        return <Bus className="h-4 w-4" />;
      case 'train':
        return <Train className="h-4 w-4" />;
      case 'car':
        return <Car className="h-4 w-4" />;
      case 'walk':
      default:
        return <Clock className="h-4 w-4" />;
    }
  }
  
  if (loading) {
    return (
      <div className={`animate-pulse rounded-md border bg-card p-4 ${className}`}>
        <div className="h-4 w-3/4 rounded-md bg-muted" />
        <div className="mt-2 h-6 w-1/2 rounded-md bg-muted" />
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-5/6 rounded-md bg-muted" />
        </div>
      </div>
    );
  }
  
  if (!estimate) {
    return (
      <div className={`rounded-md border bg-card p-4 ${className}`}>
        {t('transport.noEstimate')}
      </div>
    );
  }
  
  return (
    <div className={`rounded-md border bg-card p-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {t('transport.travelTime')}
        </span>
      </div>
      
      <div className="mt-1 text-2xl font-bold">
        {estimate.duration} {t('transport.minutes')}
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <span className="text-muted-foreground">{t('transport.departure')}:</span>{' '}
          <span className="font-medium">{formatTime(departureTime)}</span>
        </div>
        <div>
          <span className="text-muted-foreground">{t('transport.arrival')}:</span>{' '}
          <span className="font-medium">{formatTime(estimate.arrivalTime)}</span>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{from.name}</span>
        </div>
        
        {estimate.transitOptions.map((option, index) => (
          <div key={index} className="ml-2 flex items-center gap-2 border-l pl-4 py-1">
            {getTransitIcon(option.mode)}
            <span className="text-sm">
              {option.mode === 'bus' || option.mode === 'train' 
                ? t(`transport.${option.mode}Line`, { line: option.line })
                : t(`transport.${option.mode}`)}
              {' '}
              ({option.duration} {t('transport.min')})
            </span>
          </div>
        ))}
        
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{to.name}</span>
        </div>
      </div>
    </div>
  );
}
```

**Helper Notes:**
- Use informative loading states with skeleton UI
- Implement clear visualization of transit options
- Format times according to user's locale
- Add proper error handling for API failures

## Content Implementation

### 1. Multi-language Support

```typescript
// File: app/lib/i18n/i18n.ts
// Implementation: Configure i18next for multi-language support

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from '../locales/en/common.json';
import enItinerary from '../locales/en/itinerary.json';
import enDashboard from '../locales/en/dashboard.json';

import arCommon from '../locales/ar/common.json';
import arItinerary from '../locales/ar/itinerary.json';
import arDashboard from '../locales/ar/dashboard.json';

import frCommon from '../locales/fr/common.json';
import frItinerary from '../locales/fr/itinerary.json';
import frDashboard from '../locales/fr/dashboard.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        itinerary: enItinerary,
        dashboard: enDashboard,
      },
      ar: {
        common: arCommon,
        itinerary: arItinerary,
        dashboard: arDashboard,
      },
      fr: {
        common: frCommon,
        itinerary: frItinerary,
        dashboard: frDashboard,
      },
    },
    fallbackLng: 'en',
    ns: ['common', 'itinerary', 'dashboard'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      useSuspense: false, // Disable Suspense
    },
  });

export default i18n;
```

```typescript
// File: app/components/layout/LanguageSwitcher.tsx
// Implementation: Create language switcher component

import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
  ];
  
  function changeLanguage(lng: string) {
    i18n.changeLanguage(lng);
    // Set document direction for RTL languages
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  }
  
  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={i18n.language === lang.code ? 'bg-accent' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

**Helper Notes:**
- Configure i18next with namespaces for organized translations
- Add RTL support for Arabic language
- Implement language detection from browser
- Create easy-to-use language switcher component

### 2. Team Information Components

```typescript
// File: app/components/content/TeamInfo.tsx
// Implementation: Create team information display

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface TeamInfoProps {
  teamId: string;
  showStats?: boolean;
  showPlayers?: boolean;
  className?: string;
}

interface TeamData {
  id: string;
  name: string;
  code: string;
  flag: string;
  stats?: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  players?: Array<{
    id: string;
    name: string;
    position: string;
    number: number;
  }>;
}

export function TeamInfo({ 
  teamId, 
  showStats = false, 
  showPlayers = false, 
  className 
}: TeamInfoProps) {
  const [team, setTeam] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  
  useEffect(() => {
    async function fetchTeamData() {
      try {
        setLoading(true);
        // This would typically be an API call
        // const response = await fetch(`/api/teams/${teamId}`);
        // const data = await response.json();
        
        // Mock data for example
        setTimeout(() => {
          const mockTeam: TeamData = {
            id: teamId,
            name: teamId === "arg" ? "Argentina" : "Brazil",
            code: teamId.toUpperCase(),
            flag: `/flags/${teamId}.svg`,
            stats: {
              played: 7,
              won: 6,
              drawn: 1,
              lost: 0,
              goalsFor: 12,
              goalsAgainst: 3,
            },
            players: [
              { id: "p1", name: "Player 1", position: "GK", number: 1 },
              { id: "p2", name: "Player 2", position: "DF", number: 4 },
              { id: "p3", name: "Player 3", position: "MF", number: 10 },
              { id: "p4", name: "Player 4", position: "FW", number: 11 },
            ]
          };
          
          setTeam(mockTeam);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    
    fetchTeamData();
  }, [teamId]);
  
  if (loading) {
    return (
      <div className={`animate-pulse rounded-md border bg-card p-4 ${className}`}>
        <div className="h-6 w-32 rounded-md bg-muted" />
        <div className="mt-2 h-4 w-24 rounded-md bg-muted" />
        {showStats && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 rounded-md bg-muted" />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  if (!team) {
    return (
      <div className={`rounded-md border bg-card p-4 ${className}`}>
        {t('team.notFound')}
      </div>
    );
  }
  
  return (
    <div className={`rounded-md border bg-card p-4 ${className}`}>
      <div className="flex items-center gap-3">
        <img 
          src={team.flag} 
          alt={t('team.flag', { team: team.name })} 
          className="h-6 w-10 rounded shadow-sm" 
          onError={(e) => {
            // Fallback if flag image fails to load
            (e.target as HTMLImageElement).src = "/flags/placeholder.svg";
          }}
        />
        <div>
          <h3 className="text-lg font-semibold">{team.name}</h3>
          <p className="text-sm text-muted-foreground">{team.code}</p>
        </div>
      </div>
      
      {showStats && team.stats && (
        <div className="mt-4">
          <h4 className="text-sm font-medium">{t('team.stats')}</h4>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md bg-muted/20 p-2">
              <p className="text-xs text-muted-foreground">{t('team.played')}</p>
              <p className="text-lg font-semibold">{team.stats.played}</p>
            </div>
            <div className="rounded-md bg-muted/20 p-2">
              <p className="text-xs text-muted-foreground">{t('team.won')}</p>
              <p className="text-lg font-semibold">{team.stats.won}</p>
            </div>
            <div className="rounded-md bg-muted/20 p-2">
              <p className="text-xs text-muted-foreground">{t('team.drawn')}</p>
              <p className="text-lg font-semibold">{team.stats.drawn}</p>
            </div>
            <div className="rounded-md bg-muted/20 p-2">
              <p className="text-xs text-muted-foreground">{t('team.lost')}</p>
              <p className="text-lg font-semibold">{team.stats.lost}</p>
            </div>
            <div className="rounded-md bg-muted/20 p-2">
              <p className="text-xs text-muted-foreground">{t('team.goalsFor')}</p>
              <p className="text-lg font-semibold">{team.stats.goalsFor}</p>
            </div>
            <div className="rounded-md bg-muted/20 p-2">
              <p className="text-xs text-muted-foreground">{t('team.goalsAgainst')}</p>
              <p className="text-lg font-semibold">{team.stats.goalsAgainst}</p>
            </div>
          </div>
        </div>
      )}
      
      {showPlayers && team.players && (
        <div className="mt-4">
          <h4 className="text-sm font-medium">{t('team.keyPlayers')}</h4>
          <div className="mt-2 space-y-2">
            {team.players.map((player) => (
              <div key={player.id} className="flex items-center gap-2 rounded-md border p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {player.number}
                </div>
                <div>
                  <p className="text-sm">{player.name}</p>
                  <p className="text-xs text-muted-foreground">{t(`team.positions.${player.position}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

**Helper Notes:**
- Implement appropriate loading states with skeleton UI
- Add proper image error handling for flags
- Use translations for all text elements
- Create modular component with configurable display options

### 3. Local Attractions Component

```typescript
// File: app/components/content/LocalAttractions.tsx
// Implementation: Create local attractions near venues

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Clock, Star } from "lucide-react";

interface LocalAttractionsProps {
  venueId: string;
  count?: number;
  className?: string;
}

interface Attraction {
  id: string;
  name: string;
  description: string;
  distance: number; // in kilometers
  travelTime: number; // in minutes
  rating: number; // out of 5
  image?: string;
  type: 'restaurant' | 'landmark' | 'shopping' | 'entertainment';
}

export function LocalAttractions({ 
  venueId, 
  count = 3, 
  className 
}: LocalAttractionsProps) {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  
  useEffect(() => {
    async function fetchAttractions() {
      try {
        setLoading(true);
        // This would typically be an API call
        // const response = await fetch(`/api/venues/${venueId}/attractions?count=${count}`);
        // const data = await response.json();
        
        // Mock data for example
        setTimeout(() => {
          const mockAttractions: Attraction[] = [
            {
              id: "a1",
              name: "Souq Waqif",
              description: "Traditional market with local goods and restaurants",
              distance: 1.2,
              travelTime: 15,
              rating: 4.5,
              image: "/attractions/souq.jpg",
              type: "landmark",
            },
            {
              id: "a2",
              name: "Museum of Islamic Art",
              description: "World-class museum with Islamic art from three continents",
              distance: 2.5,
              travelTime: 20,
              rating: 4.8,
              image: "/attractions/museum.jpg",
              type: "landmark",
            },
            {
              id: "a3",
              name: "Katara Cultural Village",
              description: "Cultural center with galleries, shops, and restaurants",
              distance: 3.8,
              travelTime: 25,
              rating: 4.3,
              image: "/attractions/katara.jpg",
              type: "entertainment",
            },
          ].slice(0, count);
          
          setAttractions(mockAttractions);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    
    fetchAttractions();
  }, [venueId, count]);
  
  if (loading) {
    return (
      <div className={className}>
        <h3 className="text-lg font-semibold">{t('attractions.nearby')}</h3>
        <div className="mt-4 space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-md border p-4">
              <div className="h-32 rounded-md bg-muted" />
              <div className="mt-2 h-6 w-3/4 rounded-md bg-muted" />
              <div className="mt-2 h-4 w-full rounded-md bg-muted" />
              <div className="mt-4 flex justify-between">
                <div className="h-4 w-20 rounded-md bg-muted" />
                <div className="h-4 w-16 rounded-md bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (attractions.length === 0) {
    return (
      <div className={className}>
        <h3 className="text-lg font-semibold">{t('attractions.nearby')}</h3>
        <p className="mt-2 text-muted-foreground">{t('attractions.none')}</p>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold">{t('attractions.nearby')}</h3>
      <div className="mt-4 space-y-4">
        {attractions.map((attraction) => (
          <div key={attraction.id} className="overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
            {attraction.image && (
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = "/attractions/placeholder.jpg";
                  }}
                />
              </div>
            )}
            <div className="p-4">
              <h4 className="font-semibold">{attraction.name}</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {attraction.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {attraction.distance} {t('attractions.km')}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {attraction.travelTime} {t('attractions.min')}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{attraction.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Helper Notes:**
- Use responsive image sizing with lazy loading
- Add proper image error handling
- Implement appropriate loading states
- Use translations for all text elements

## Best Practices

1. **Component Design**
   - Follow compound component pattern from shadcn/ui
   - Use TypeScript interfaces for all props
   - Create shared context where appropriate
   - Implement controlled components with uncontrolled fallbacks

2. **Performance**
   - Memoize expensive calculations with useMemo
   - Use useCallback for event handlers passed as props
   - Implement React.memo for pure components
   - Avoid unnecessary re-renders with proper state management

3. **Accessibility**
   - Add proper ARIA attributes to all interactive elements
   - Ensure keyboard navigation for all interactions
   - Use semantic HTML elements
   - Implement proper focus management
   - Add proper alt text for all images

4. **Internationalization**
   - Use translation hooks for all text content
   - Implement RTL support for Arabic language
   - Format dates and times according to locale
   - Use translation namespaces for organization

5. **Styling**
   - Use CSS variables for theming
   - Follow consistent spacing scale
   - Implement proper responsive design
   - Use utility-first approach with Tailwind
   - Create reusable component variants

6. **State Management**
   - Use React Query for server state
   - Use Zustand for client state
   - Implement proper loading and error states
   - Use optimistic updates for better UX

7. **Error Handling**
   - Implement proper error boundaries
   - Add informative error messages
   - Use fallbacks for missing data
   - Log errors for debugging

8. **Code Organization**
   - Follow consistent file and folder structure
   - Use index files for clean exports
   - Group related components together
   - Create reusable hooks for common logic