import { useTranslation } from "react-i18next";
import * as React from "react";
import { NavLink } from "~/components/navigation/NavLink";
import {
  Trophy,
  Mail,
  Globe,
  MapPin,
  Calendar,
  Users,
  Heart,
  Sparkles,
  ArrowUp,
  ExternalLink,
  Zap,
  Shield,
  Headphones,
  BookOpen,
  MessageCircle,
  Share2,
  Camera
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";

// Enhanced social links with platform colors and hover effects
const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: MessageCircle,
    color: 'hover:text-blue-400',
    bgColor: 'hover:bg-blue-400/10'
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: Share2,
    color: 'hover:text-blue-600',
    bgColor: 'hover:bg-blue-600/10'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Camera,
    color: 'hover:text-pink-500',
    bgColor: 'hover:bg-pink-500/10'
  }
];

// Define types for footer links
interface FooterLink {
  to: string;
  label: string;
  defaultLabel: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface FooterSection {
  title: string;
  defaultTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  links: FooterLink[];
}

// Enhanced navigation sections with icons and descriptions
const footerSections: FooterSection[] = [
  {
    title: 'footer.explore',
    defaultTitle: 'Explore',
    icon: Globe,
    links: [
      { to: '/dashboard', label: 'footer.dashboard', defaultLabel: 'Dashboard', icon: Trophy, badge: 'New' },
      { to: '/itinerary', label: 'footer.itinerary', defaultLabel: 'My Itinerary', icon: Calendar },
      { to: '/venues', label: 'footer.venues', defaultLabel: 'Stadiums', icon: MapPin },
      { to: '/teams', label: 'footer.teams', defaultLabel: 'Teams & Stats', icon: Users },
    ]
  },
  {
    title: 'footer.support',
    defaultTitle: 'Support',
    icon: Headphones,
    links: [
      { to: '/help', label: 'footer.help', defaultLabel: 'Help Center', icon: BookOpen },
      { to: '/contact', label: 'footer.contact', defaultLabel: 'Contact Us', icon: Mail },
      { to: '/faq', label: 'footer.faq', defaultLabel: 'FAQ', icon: Sparkles },
      { to: '/feedback', label: 'footer.feedback', defaultLabel: 'Feedback', icon: Heart },
    ]
  },
  {
    title: 'footer.legal',
    defaultTitle: 'Legal',
    icon: Shield,
    links: [
      { to: '/terms', label: 'footer.terms', defaultLabel: 'Terms of Service' },
      { to: '/privacy', label: 'footer.privacy', defaultLabel: 'Privacy Policy' },
      { to: '/cookies', label: 'footer.cookies', defaultLabel: 'Cookie Policy' },
    ]
  }
];

export const Footer = React.memo(function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Show scroll to top button when user scrolls down
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-yellow-500 to-red-500 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}

      <footer className="relative overflow-hidden border-t bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -left-8 w-32 h-32 bg-red-500/5 rounded-full animate-bounce [animation-duration:3s]"></div>
          <div className="absolute bottom-8 right-1/4 w-16 h-16 bg-yellow-400/10 rounded-full animate-pulse [animation-delay:1s]"></div>
        </div>

        <div className="relative py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter section */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-2xl p-6 md:p-8 mb-12 border border-white/10 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <h3 className="text-xl font-bold">
                    {t('footer.newsletter.title', 'Stay in the Game!')}
                  </h3>
                </div>
                <p className="text-white/80">
                  {t('footer.newsletter.description', 'Get exclusive updates, match alerts, and insider tips delivered to your inbox.')}
                </p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto min-w-[300px]">
                <Input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder', 'Enter your email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  required
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 transition-all duration-300 hover:scale-105"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <Heart className="h-4 w-4 mr-1" />
                      {t('footer.newsletter.subscribed', 'Subscribed!')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-1" />
                      {t('footer.newsletter.subscribe', 'Subscribe')}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-red-500 shadow-lg">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h2 className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                    {t('app.title', 'World Cup Itinerary')}
                  </h2>
                  <p className="text-xs text-white/60">
                    {t('footer.tagline', 'Your Ultimate Match Companion')}
                  </p>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                {t('footer.description', 'Experience every moment of the World Cup with our intelligent planning platform. From match schedules to local attractions, we\'ve got you covered.')}
              </p>

              {/* Enhanced social links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color} ${social.bgColor}`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <section.icon className="h-5 w-5 text-yellow-400" />
                  <h4 className="font-semibold text-lg">
                    {t(section.title, section.defaultTitle)}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.to} className="group">
                      <NavLink
                        to={link.to}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 text-sm group-hover:translate-x-1"
                      >
                        {link.icon && <link.icon className="h-4 w-4 text-white/50 group-hover:text-yellow-400 transition-colors" />}
                        <span>{t(link.label, link.defaultLabel)}</span>
                        {link.badge && (
                          <Badge variant="outline" className="ml-auto px-1.5 py-0 h-4 text-[10px] border-yellow-400/30 text-yellow-400">
                            {link.badge}
                          </Badge>
                        )}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom section with enhanced styling */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span>&copy; {currentYear} World Cup Itinerary.</span>
                <span className="hidden md:inline">•</span>
                <span>{t('footer.allRightsReserved', 'All rights reserved')}</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  {t('footer.madeWith', 'Made with')}
                  <Heart className="h-3 w-3 text-red-400 animate-pulse" />
                  {t('footer.forFans', 'for football fans')}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-white/50">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>{t('footer.status', 'All systems operational')}</span>
                </div>
                <span>•</span>
                <span>{t('footer.version', 'v2.1.0')}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
});