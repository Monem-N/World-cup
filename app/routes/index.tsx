import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { PageLayout } from "~/components/layout/PageLayout";

export function meta() {
  return [
    { title: "World Cup Itinerary - Your Ultimate World Cup Companion" },
    { name: "description", content: "Manage your World Cup experience with our itinerary planner" },
  ];
}

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <PageLayout showBreadcrumbs={false}>
      {/* Hero section */}
      <section className="py-12 md:py-20">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t('landing.heroTitle', 'Plan Your Ultimate World Cup Experience')}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            {t('landing.heroSubtitle', 'Organize your matches, transportation, accommodations, and activities in one place. Never miss a moment of the action.')}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">{t('landing.getStarted', 'Get Started')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/demo">{t('landing.viewDemo', 'View Demo')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            {t('landing.features', 'Features')}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {/* Feature icon would go here */}
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {t('landing.feature1Title', 'Match Tracking')}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t('landing.feature1Description', 'Keep track of all your matches with detailed information about venues, teams, and kickoff times.')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {/* Feature icon would go here */}
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {t('landing.feature2Title', 'Transportation Planning')}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t('landing.feature2Description', 'Plan your routes between venues, accommodations, and attractions with real-time transit information.')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {/* Feature icon would go here */}
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {t('landing.feature3Title', 'Local Attractions')}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t('landing.feature3Description', 'Discover restaurants, museums, and cultural sites near each venue to make the most of your World Cup journey.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {t('landing.ctaTitle', 'Ready for the World Cup?')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t('landing.ctaDescription', 'Join thousands of fans who are using World Cup Itinerary to plan their perfect tournament experience.')}
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/register">{t('landing.signUp', 'Sign Up Now')}</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}