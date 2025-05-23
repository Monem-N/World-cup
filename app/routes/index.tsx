import { useTranslation } from "react-i18next";
import { PageLayout } from "~/components/layout/PageLayout";
import { HeroSection } from "~/components/landing/HeroSection";
import { FeaturesSection } from "~/components/landing/FeaturesSection";
import { CTASection } from "~/components/landing/CTASection";

export function meta() {
  const { t } = useTranslation();
  return [
    { title: t('meta.title', 'World Cup Itinerary - Your Ultimate World Cup Companion') },
    { name: "description", content: t('meta.description', 'Manage your World Cup experience with our itinerary planner') },
  ];
}

export default function LandingPage() {
  return (
    <PageLayout showBreadcrumbs={false}>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </PageLayout>
  );
}