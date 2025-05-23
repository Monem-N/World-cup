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
          className="lang-switcher-trigger relative transition-all duration-300 hover:scale-110"
          aria-label={t('language.change', 'Change language')}
          style={{
            color: "rgba(255, 255, 255, 0.9)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#FFFFFF";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <Globe className="h-5 w-5" />
          <span className="absolute bottom-1 right-1 flex h-3 w-3 items-center justify-center">
            <span className="text-[8px]">{currentLang.flag}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="lang-switcher-content w-56"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <DropdownMenuLabel className="flex items-center gap-2">
          <Languages className="h-4 w-4" style={{ color: "#FFD700" }} />
          <span style={{ color: "#000000" }}>{t('language.select', 'Select Language')}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator style={{ background: "rgba(0, 0, 0, 0.1)" }} />

        {Object.entries(languagesByRegion).map(([region, langs]) => (
          <DropdownMenuGroup key={region}>
            <div
              className="px-2 py-1.5 text-xs"
              style={{ color: "rgba(0, 0, 0, 0.5)" }}
            >
              {region}
            </div>
            {langs.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="lang-menu-item flex items-center justify-between cursor-pointer transition-all duration-200"
                style={{
                  color: "#000000",
                  background: i18n.language === lang.code ? "rgba(255, 215, 0, 0.1)" : "transparent"
                }}
                onMouseEnter={(e) => {
                  if (i18n.language !== lang.code) {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = i18n.language === lang.code
                    ? "rgba(255, 215, 0, 0.1)"
                    : "transparent";
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <span style={{ color: "#000000" }}>{lang.name}</span>
                </span>
                {i18n.language === lang.code && (
                  <Check className="h-4 w-4" style={{ color: "#FFD700" }} />
                )}
              </DropdownMenuItem>
            ))}
            {region !== Object.keys(languagesByRegion).slice(-1)[0] && (
              <DropdownMenuSeparator style={{ background: "rgba(0, 0, 0, 0.1)" }} />
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}