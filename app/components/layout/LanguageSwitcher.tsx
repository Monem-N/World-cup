import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '~/components/ui/dropdown-menu';
import { Globe, Check, Languages } from 'lucide-react';
import { useCallback, useMemo } from "react";

// Language configuration
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', region: 'North America' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪', region: 'Middle East' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', region: 'Europe' },
  { code: 'es', name: 'Español', flag: '🇪🇸', region: 'Europe' },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
    // Set document direction for RTL languages
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  }, [i18n]);

  const currentLang = useMemo(() => {
    return languages.find((lang) => lang.code === i18n.language) || languages[0];
  }, [i18n.language]);

  // Group languages by region
  const languagesByRegion = useMemo(() => {
    const grouped: Record<string, typeof languages> = {};

    languages.forEach(lang => {
      if (!grouped[lang.region]) {
        grouped[lang.region] = [];
      }
      grouped[lang.region].push(lang);
    });

    return grouped;
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/10 relative"
          aria-label={t('language.change', 'Change language')}
        >
          <Globe className="h-5 w-5" />
          <span className="absolute bottom-1 right-1 flex h-3 w-3 items-center justify-center">
            <span className="text-[8px]">{currentLang.flag}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          {t('language.select', 'Select Language')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {Object.entries(languagesByRegion).map(([region, langs]) => (
          <DropdownMenuGroup key={region}>
            <div className="px-2 py-1.5 text-xs text-muted-foreground">{region}</div>
            {langs.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  {lang.name}
                </span>
                {i18n.language === lang.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
            {region !== Object.keys(languagesByRegion).slice(-1)[0] && (
              <DropdownMenuSeparator />
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}