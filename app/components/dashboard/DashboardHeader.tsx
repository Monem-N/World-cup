import React from 'react';
import { Calendar, Trophy, Sparkles, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { DashboardData } from '../../api/dashboardDataLoader';

interface DashboardHeaderProps {
  dashboardData: DashboardData | null;
  mousePosition: { x: number; y: number };
}

export default function DashboardHeader({ dashboardData, mousePosition }: DashboardHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-20">
      <div className="text-center mb-16">
        {/* Premium Badge with Enhanced Styling */}
        <div className="relative inline-flex items-center space-x-4 mb-8">
          <div className="absolute -inset-2 premium-badge-glow rounded-full blur-xl animate-pulse opacity-60" />
          <div className="relative premium-badge-bg backdrop-blur-2xl rounded-full px-10 py-4 border premium-badge-border shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Trophy className="w-7 h-7 premium-icon animate-pulse" />
                <div className="absolute -inset-2 premium-icon-glow rounded-full blur-md animate-pulse" />
                <div className="absolute -inset-4 premium-icon-glow-outer rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white font-bold text-xl tracking-wide">{t('dashboard.tournament.name')}</span>
                <span className="premium-subtitle text-sm font-medium">{t('dashboard.tournament.officialExperience')}</span>
              </div>
              {dashboardData && (
                <div className="flex items-center space-x-2 ml-4">
                  <div className="relative">
                    <div className="w-3 h-3 live-indicator rounded-full animate-pulse" />
                    <div className="absolute -inset-1 live-indicator-glow rounded-full blur-sm animate-pulse" />
                  </div>
                  <span className="live-data-badge px-4 py-2 rounded-full text-sm font-semibold border live-data-border backdrop-blur-sm">
                    {t('dashboard.tournament.liveData')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Title with Enhanced Typography and Effects */}
        <div className="relative mb-10">
          <div className="absolute inset-0 hero-title-bg blur-3xl" />
          <h1 className="hero-title relative text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black mb-8 leading-none tracking-tight text-center">
            {dashboardData?.tripOverview.destination || t('dashboard.tournament.fallbackDestination')}
          </h1>
          {/* Enhanced Decorative Elements */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-1 hero-line-left rounded-full shadow-lg" />
            <div className="w-8 h-8 hero-center-icon rounded-full flex items-center justify-center shadow-xl">
              <Sparkles className="w-4 h-4 text-black animate-pulse" />
            </div>
            <div className="w-16 h-1 hero-line-right rounded-full shadow-lg" />
          </div>
        </div>

        {/* Enhanced Subtitle with Better Typography */}
        <div className="max-w-5xl mx-auto mb-10">
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light leading-relaxed mb-4">
            {dashboardData?.tripOverview.title || t('dashboard.tournament.fallbackTitle')}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {t('dashboard.tournament.description')}
          </p>
        </div>

        {/* Enhanced Trip Dates Display */}
        <div className="relative inline-flex items-center space-x-6">
          <div className="absolute -inset-1 trip-dates-glow rounded-3xl blur opacity-50" />
          <div className="relative bg-black/50 backdrop-blur-2xl rounded-3xl px-10 py-5 border border-white/30 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Calendar className="w-6 h-6 trip-dates-icon" />
                <div className="absolute -inset-1 trip-dates-icon-glow rounded-full blur-sm animate-pulse" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white/60 text-sm font-medium uppercase tracking-wider">{t('dashboard.tournament.tournamentDates')}</span>
                <span className="text-white font-bold text-xl">
                  {dashboardData?.tripOverview.startDate && dashboardData?.tripOverview.endDate
                    ? `${new Date(dashboardData.tripOverview.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${new Date(dashboardData.tripOverview.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                    : t('dashboard.tournament.fallbackDates')
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
