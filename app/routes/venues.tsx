import { useTranslation } from "react-i18next";
import { PageLayout } from "~/components/layout/PageLayout";

export function meta() {
  const { t } = useTranslation();
  return [
    { title: t('nav.venues', 'Venues') + ' - World Cup Itinerary' },
    { name: "description", content: t('nav.venuesDescription', 'Explore stadiums and locations hosting World Cup matches') },
  ];
}

export default function VenuesPage() {
  const { t } = useTranslation();
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('nav.venues', 'Venues')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('nav.venuesDescription', 'Explore stadiums and locations hosting World Cup matches')}
        </p>
        
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            Venue information and details will be available here.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
