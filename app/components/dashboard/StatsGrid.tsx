import React from 'react';
import { Calendar, Users, MapPin, Sun, Star, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { DashboardData } from '../../api/dashboardDataLoader';

interface StatsGridProps {
  dashboardData: DashboardData | null;
  daysLeft: number;
}

export default function StatsGrid({ dashboardData, daysLeft }: StatsGridProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Days Left Card - Enhanced */}
      <div className="group relative transform hover:scale-105 transition-all duration-500">
        <div className="absolute -inset-1 stats-card-glow-gold rounded-3xl blur-lg opacity-25 group-hover:opacity-60 transition-all duration-500 animate-pulse" />
        <div className="relative bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 stats-card-border-gold transition-all duration-500 shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 stats-card-bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <div className="absolute -inset-3 stats-icon-glow-gold rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative stats-icon-bg-gold p-3 rounded-2xl backdrop-blur-sm border stats-icon-border-gold">
                  <Calendar className="w-8 h-8 stats-icon-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black stats-number-gold group-hover:scale-110 transition-transform duration-300 inline-block">{daysLeft}</span>
                <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Days</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white font-bold text-lg mb-2">{t('dashboard.stats.daysLeft')}</p>
                <p className="text-white/60 text-sm">{t('dashboard.stats.untilTournament')}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/50">
                  <span>{t('dashboard.stats.progress')}</span>
                  <span>{Math.max(10, 100 - (daysLeft / 200) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full stats-progress-gold transition-all duration-1000 shadow-lg relative"
                    style={{ width: `${Math.max(10, 100 - (daysLeft / 200) * 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Travelers Card - Enhanced */}
      <div className="group relative transform hover:scale-105 transition-all duration-500">
        <div className="absolute -inset-1 stats-card-glow-red rounded-3xl blur-lg opacity-25 group-hover:opacity-60 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="relative bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 stats-card-border-red transition-all duration-500 shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 stats-card-bg-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <div className="absolute -inset-3 stats-icon-glow-red rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative stats-icon-bg-red p-3 rounded-2xl backdrop-blur-sm border stats-icon-border-red">
                  <Users className="w-8 h-8 stats-icon-red group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black stats-number-red group-hover:scale-110 transition-transform duration-300 inline-block">{dashboardData?.tripOverview.travelers || 4}</span>
                <div className="text-xs text-white/50 font-medium uppercase tracking-wider">{t('dashboard.stats.people')}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white font-bold text-lg mb-2">{t('dashboard.stats.travelers')}</p>
                <p className="text-white/60 text-sm">{t('dashboard.stats.readyForAdventure')}</p>
              </div>

              <div className="flex items-center space-x-2">
                {[...Array(dashboardData?.tripOverview.travelers || 4)].map((_, i) => (
                  <div key={i} className="relative">
                    <div
                      className="w-5 h-5 traveler-dot rounded-full shadow-lg group-hover:scale-110 transition-all duration-300"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                    <div className="absolute -inset-1 traveler-dot-glow rounded-full blur-sm animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
                <span className="text-white/40 text-sm ml-2">Team ready!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Card - Enhanced */}
      <div className="group relative transform hover:scale-105 transition-all duration-500">
        <div className="absolute -inset-1 stats-card-glow-gold rounded-3xl blur-lg opacity-25 group-hover:opacity-60 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="relative bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 stats-card-border-gold transition-all duration-500 shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 stats-card-bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <div className="absolute -inset-3 stats-icon-glow-gold rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative stats-icon-bg-gold p-3 rounded-2xl backdrop-blur-sm border stats-icon-border-gold">
                  <MapPin className="w-8 h-8 stats-icon-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black stats-number-gold group-hover:scale-110 transition-transform duration-300 inline-block">{dashboardData?.statistics.uniqueLocations || 5}</span>
                <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Cities</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white font-bold text-lg mb-2">Destinations</p>
                <p className="text-white/60 text-sm">Incredible locations</p>
              </div>

              <div className="flex items-center space-x-2 text-white/70">
                <div className="relative">
                  <Navigation className="w-5 h-5 destination-nav-icon" />
                  <div className="absolute -inset-1 destination-nav-glow rounded-full blur-sm animate-pulse" />
                </div>
                <span className="font-semibold text-sm">{dashboardData?.tripOverview.destination || 'Multiple Cities'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Card - Enhanced */}
      <div className="group relative transform hover:scale-105 transition-all duration-500">
        <div className="absolute -inset-1 stats-card-glow-red rounded-3xl blur-lg opacity-25 group-hover:opacity-60 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="relative bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 stats-card-border-red transition-all duration-500 shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 stats-card-bg-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -top-4 -right-4 w-24 h-24 weather-orb rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <div className="absolute -inset-3 stats-icon-glow-red rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative stats-icon-bg-red p-3 rounded-2xl backdrop-blur-sm border stats-icon-border-red">
                  <Sun className="w-8 h-8 stats-icon-red group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black stats-number-red group-hover:scale-110 transition-transform duration-300 inline-block">32°C</span>
                <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Perfect</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white font-bold text-lg mb-2">Perfect Weather</p>
                <p className="text-white/60 text-sm">Ideal for football!</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 weather-star fill-current" />
                  ))}
                </div>
                <span className="text-white/60 text-sm">Excellent conditions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
