import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-20 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
      <div className="container flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
        <h2 id="cta-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t('landing.ctaTitle', 'Ready for the World Cup?')}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
          {t('landing.ctaDescription', 'Join thousands of fans who are using World Cup Itinerary to plan their perfect tournament experience.')}
        </p>
        <Button asChild size="lg" className={cn(
          "mt-8 px-8 py-3 text-lg",
          "bg-white text-primary hover:bg-gray-200 transition-colors duration-300"
        )}>
          <Link to="/register">{t('landing.signUp', 'Sign Up Now')}</Link>
        </Button>
      </div>
    </section>
  );
}