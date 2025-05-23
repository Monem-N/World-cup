import { useTranslation } from "react-i18next";
import { Trophy, Calendar, MapPin } from "lucide-react"; // Example icons, replace with appropriate ones

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Trophy, // Replace with actual icon component
      titleKey: 'landing.feature1Title',
      defaultTitle: 'Match Tracking',
      descriptionKey: 'landing.feature1Description',
      defaultDescription: 'Keep track of all your matches with detailed information about venues, teams, and kickoff times.',
    },
    {
      icon: Calendar, // Replace with actual icon component
      titleKey: 'landing.feature2Title',
      defaultTitle: 'Transportation Planning',
      descriptionKey: 'landing.feature2Description',
      defaultDescription: 'Plan your routes between venues, accommodations, and attractions with real-time transit information.',
    },
    {
      icon: MapPin, // Replace with actual icon component
      titleKey: 'landing.feature3Title',
      defaultTitle: 'Local Attractions',
      descriptionKey: 'landing.feature3Description',
      defaultDescription: 'Discover restaurants, museums, and cultural sites near each venue to make the most of your World Cup journey.',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-muted/30" aria-labelledby="features-heading">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
          {t('landing.features', 'Features')}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {t(feature.titleKey, feature.defaultTitle)}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t(feature.descriptionKey, feature.defaultDescription)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}