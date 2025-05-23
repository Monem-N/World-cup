import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import * as React from "react";
import { NavLink } from "~/components/navigation/NavLink";
import { Trophy, Mail, Globe, Twitter, Facebook, Instagram } from "lucide-react";

export const Footer = React.memo(function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-r from-yellow-500 to-red-500 mt-12">
      <div className="container py-10 md:py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-8">
          {/* Logo and description */}
          <div className="md:max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-lg">
                {t('app.title', 'World Cup Itinerary')}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.description', 'Your ultimate companion for planning and organizing your World Cup experience. Never miss a match, find the best routes, and discover local attractions.')}
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-base font-semibold mb-4">{t('footer.about', 'About')}</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <NavLink to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    {t('footer.aboutUs', 'About Us')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    {t('footer.faq', 'FAQ')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    {t('footer.contact', 'Contact')}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">{t('footer.features', 'Features')}</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <NavLink to="/itinerary" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.itinerary', 'Itinerary')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/venues" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.venues', 'Venues')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/teams" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.teams', 'Teams')}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">{t('footer.legal', 'Legal')}</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <NavLink to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.terms', 'Terms of Service')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.privacy', 'Privacy Policy')}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {currentYear} World Cup Itinerary. {t('footer.allRightsReserved', 'All rights reserved')}
        </div>
      </div>
    </footer>
  );
});