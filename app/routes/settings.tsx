import { useTranslation } from "react-i18next";
import { PageLayout } from "~/components/layout/PageLayout";
import { LanguageSwitcher } from "~/components/layout/LanguageSwitcher";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export function meta() {
  const { t } = useTranslation();
  return [
    { title: t('user.settings', 'Settings') + ' - World Cup Itinerary' },
    { name: "description", content: 'Application settings and preferences' },
  ];
}

export default function SettingsPage() {
  const { t } = useTranslation();
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">{t('user.settings', 'Settings')}</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('nav.language', 'Language')}
              </CardTitle>
              <CardDescription>
                Choose your preferred language for the application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LanguageSwitcher />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-muted-foreground">
                  Notification settings will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>
                Control your privacy and data settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-muted-foreground">
                  Privacy settings will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
