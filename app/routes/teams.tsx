import { useTranslation } from "react-i18next";
import { PageLayout } from "~/components/layout/PageLayout";

export function meta() {
  const { t } = useTranslation();
  return [
    { title: t('nav.teams', 'Teams') + ' - World Cup Itinerary' },
    { name: "description", content: t('nav.teamsDescription', 'Browse participating teams, players, and match statistics') },
  ];
}

export default function TeamsPage() {
  const { t } = useTranslation();
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('nav.teams', 'Teams')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('nav.teamsDescription', 'Browse participating teams, players, and match statistics')}
        </p>
        
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            Team information and statistics will be available here.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
