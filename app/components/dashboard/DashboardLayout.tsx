import { Trophy, Globe, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardHeader from './DashboardHeader';
import StatsGrid from './StatsGrid';
import CountdownSection from './CountdownSection';
import TabNavigation from './TabNavigation';
import TabContent from './TabContent';
import QuickActionsFooter from './QuickActionsFooter';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useMouseTracking } from '../../hooks/useMouseTracking';
import { useTabNavigation } from '../../hooks/useTabNavigation';

export default function DashboardLayout() {
  const { t } = useTranslation();
  const { isLoading, dashboardData, dataError, daysLeft } = useDashboardData();
  const mousePosition = useMouseTracking();
  const { activeTab, setActiveTab } = useTabNavigation();

  if (isLoading) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden rounded-3xl">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full loading-particle animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>

        <div className="text-center z-10">
          <div className="relative mb-12">
            <div className="w-32 h-32 mx-auto border-4 loading-spinner border-t-transparent rounded-full animate-spin shadow-glow-gold"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Trophy className="w-12 h-12 loading-icon animate-pulse" />
            </div>
          </div>
          <h2 className="loading-title text-4xl md:text-5xl font-black mb-6 animate-pulse">
            {t('dashboard.loading.preparingJourney')}
          </h2>
          <div className="flex items-center justify-center space-x-3 text-white/80 mb-4">
            <Globe className="w-6 h-6 animate-spin loading-icon" />
            <span className="text-lg font-medium">{t('dashboard.loading.loadingExperience')}</span>
          </div>
          <div className="w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
            <div className="h-full loading-progress animate-pulse rounded-full" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there's an error and no data
  if (dataError && !dashboardData) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden rounded-3xl">
        <div className="text-center z-10 max-w-md mx-auto px-6">
          <AlertCircle className="w-16 h-16 error-icon mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">{t('dashboard.error.unableToLoad')}</h2>
          <p className="text-white/70 mb-6">{dataError}</p>
          <button
            onClick={() => window.location.reload()}
            className="error-button text-black px-6 py-3 rounded-full font-semibold transition-all duration-300"
          >
            {t('dashboard.error.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden rounded-3xl">
      {/* Dynamic background effect */}
      <div
        className="absolute inset-0 opacity-30 rounded-3xl"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.15), transparent 40%)`
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <DashboardHeader
          dashboardData={dashboardData}
          mousePosition={mousePosition}
        />

        {/* Enhanced Stats Grid with Premium Styling */}
        <StatsGrid
          dashboardData={dashboardData}
          daysLeft={daysLeft}
        />


      </div>
      <div>
        {/* Enhanced Countdown Timer - Hero Section */}
        <CountdownSection />

        {/* Enhanced Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tab Content */}
        <div className="space-y-8">
          <TabContent
            activeTab={activeTab}
            dashboardData={dashboardData}
          />
        </div>

        {/* Enhanced Quick Actions Footer - Premium Design */}
        <QuickActionsFooter />
      </div>
    </div>
  );
}
