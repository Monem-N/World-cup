import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative py-20 md:py-32 lg:py-40 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/hero/hero1.jpg')" }}
      aria-label={t('landing.heroAltText', 'Stadium filled with cheering fans')}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Darker overlay for better text contrast */}
      <div className="container relative z-10 flex flex-col items-center text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          {t('landing.heroTitle', 'Plan Your Ultimate World Cup Experience')}
        </h1>
        <p className="mt-6 max-w-4xl text-lg sm:text-xl text-gray-200 leading-relaxed">
          {t('landing.heroSubtitle', 'Organize your matches, transportation, accommodations, and activities in one place. Never miss a moment of the action.')}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className={cn(
            "px-8 py-3 text-lg",
            "bg-white text-primary hover:bg-gray-200 transition-colors duration-300"
          )}>
            <Link to="/itinerary">{t('landing.getStarted', 'Get Started')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className={cn(
            "px-8 py-3 text-lg",
            "border-white text-white hover:bg-white hover:text-primary transition-colors duration-300"
          )}>
            <Link to="/dashboard">{t('landing.viewDashboard', 'View Dashboard')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}