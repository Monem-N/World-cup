import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Plane, Hotel, Ticket, Clock, CloudRain, Sun, Cloud, Luggage, ArrowRight, Star, Compass, Camera, Globe, Heart, Hourglass, Sparkles, Trophy, Map, Navigation, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Link } from 'react-router';
import { loadDashboardData, type DashboardData } from '../api/dashboardDataLoader';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  // Calculate days left based on real data or fallback
  const startDate = dashboardData?.tripOverview.startDate ? new Date(dashboardData.tripOverview.startDate) : new Date('June 15, 2025');
  const daysLeft = Math.ceil((startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const progress = Math.max(0, Math.min(100, ((14 - daysLeft) / 14) * 100));

  useEffect(() => {
    const loadData = async () => {
      try {
        setDataError(null);
        const data = await loadDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setDataError('Failed to load trip data');
      } finally {
        setIsLoading(false);
      }
    };

    const timeTimer = setInterval(() => setCurrentTime(new Date()), 1000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Load data
    loadData();

    return () => {
      clearInterval(timeTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
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
            Preparing Your Journey...
          </h2>
          <div className="flex items-center justify-center space-x-3 text-white/80 mb-4">
            <Globe className="w-6 h-6 animate-spin loading-icon" />
            <span className="text-lg font-medium">Loading FIFA Club World Cup 2025™ experience...</span>
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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10 max-w-md mx-auto px-6">
          <AlertCircle className="w-16 h-16 error-icon mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Unable to Load Trip Data</h2>
          <p className="text-white/70 mb-6">{dataError}</p>
          <button
            onClick={() => window.location.reload()}
            className="error-button text-black px-6 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Dynamic background effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.15), transparent 40%)`
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
        {/* Enhanced Header Section */}
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
                    <span className="text-white font-bold text-xl tracking-wide">FIFA Club World Cup 2025™</span>
                    <span className="premium-subtitle text-sm font-medium">Official Tournament Experience</span>
                  </div>
                  {dashboardData && (
                    <div className="flex items-center space-x-2 ml-4">
                      <div className="relative">
                        <div className="w-3 h-3 live-indicator rounded-full animate-pulse" />
                        <div className="absolute -inset-1 live-indicator-glow rounded-full blur-sm animate-pulse" />
                      </div>
                      <span className="live-data-badge px-4 py-2 rounded-full text-sm font-semibold border live-data-border backdrop-blur-sm">
                        Live Data
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
                {dashboardData?.tripOverview.destination || 'USA 2025'}
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
                {dashboardData?.tripOverview.title || 'Your ultimate football journey awaits'}
              </p>
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                Get ready for an unforgettable experience at the world's most prestigious club tournament
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
                    <span className="text-white/60 text-sm font-medium uppercase tracking-wider">Tournament Dates</span>
                    <span className="text-white font-bold text-xl">
                      {dashboardData?.tripOverview.startDate && dashboardData?.tripOverview.endDate
                        ? `${new Date(dashboardData.tripOverview.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${new Date(dashboardData.tripOverview.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                        : 'June 15 - 28, 2025'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid with Premium Styling */}
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
                      <p className="text-white font-bold text-lg mb-2">Days Left</p>
                      <p className="text-white/60 text-sm">Until tournament begins</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/50">
                        <span>Progress</span>
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
                      <div className="text-xs text-white/50 font-medium uppercase tracking-wider">People</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white font-bold text-lg mb-2">Travelers</p>
                      <p className="text-white/60 text-sm">Ready for adventure</p>
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
        </div>

        {/* Enhanced Countdown Timer - Hero Section */}
        <div className="mb-16">
          <div className="relative">
            {/* Animated Background */}
            <div className="absolute inset-0 countdown-bg rounded-4xl blur-xl animate-pulse" />

            {/* Main Container */}
            <div className="relative bg-black/50 backdrop-blur-2xl rounded-4xl p-12 border border-white/20 shadow-2xl overflow-hidden">
              {/* Floating Particles Effect */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 countdown-particle rounded-full animate-float"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 2) * 80}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: `${4 + i * 0.5}s`
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="relative inline-block mb-6">
                    <Hourglass className="w-16 h-16 countdown-icon mx-auto animate-bounce" />
                    <div className="absolute -inset-4 countdown-icon-glow rounded-full blur-lg animate-pulse" />
                  </div>
                  <h2 className="countdown-title text-5xl font-black mb-4">
                    Countdown to Kickoff
                  </h2>
                  <p className="text-2xl text-white/80 font-light">The excitement is building up!</p>
                </div>

                {/* Enhanced Countdown Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {[
                    { value: Math.floor(daysLeft), label: 'Days', colorClass: 'countdown-gold' },
                    { value: Math.floor((daysLeft % 1) * 24), label: 'Hours', colorClass: 'countdown-red' },
                    { value: Math.floor(((daysLeft % 1) * 24 % 1) * 60), label: 'Minutes', colorClass: 'countdown-gold' },
                    { value: Math.floor((((daysLeft % 1) * 24 % 1) * 60 % 1) * 60), label: 'Seconds', colorClass: 'countdown-red' }
                  ].map((item, index) => (
                    <div key={index} className="group relative">
                      <div className={`absolute -inset-1 countdown-glow-${item.colorClass} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300`} />
                      <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 text-center group-hover:scale-105 transition-all duration-300">
                        <div className={`text-5xl md:text-6xl font-black countdown-number-${item.colorClass} mb-2 leading-none`}>
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-white/80 font-semibold text-lg tracking-wider uppercase">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-12 max-w-2xl mx-auto">
                  <div className="flex justify-between text-white/60 text-sm mb-2">
                    <span>Tournament Approaching</span>
                    <span>{Math.max(0, Math.min(100, ((365 - daysLeft) / 365) * 100)).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full countdown-progress transition-all duration-1000 shadow-lg"
                      style={{ width: `${Math.max(0, Math.min(100, ((365 - daysLeft) / 365) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 tab-nav-glow rounded-3xl blur opacity-50" />
            <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-3 border border-white/20 inline-flex shadow-2xl">
              {[
                { id: 'overview', label: 'Overview', icon: Plane, description: 'Trip summary' },
                { id: 'itinerary', label: 'Itinerary', icon: Calendar, description: 'Daily schedule' },
                { id: 'essentials', label: 'Essentials', icon: Luggage, description: 'Travel checklist' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 ${
                    activeTab === tab.id
                      ? 'tab-active text-black shadow-2xl scale-105 transform'
                      : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-102'
                  }`}
                >
                  <div className="relative">
                    <tab.icon className={`w-6 h-6 transition-all duration-300 ${
                      activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    {activeTab === tab.id && (
                      <div className="absolute -inset-2 bg-black/20 rounded-full blur-sm animate-pulse" />
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-bold tracking-wide">{tab.label}</span>
                    <span className={`text-xs font-medium ${
                      activeTab === tab.id ? 'text-black/70' : 'text-white/50'
                    }`}>
                      {tab.description}
                    </span>
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trip Overview */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Globe className="w-8 h-8 tab-content-icon-gold" />
                  <h3 className="text-2xl font-bold text-white">Trip Overview</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-white/70">Destination</span>
                    <span className="text-white font-semibold">{dashboardData?.tripOverview.destination || 'Qatar'}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-white/70">Duration</span>
                    <span className="text-white font-semibold">{dashboardData?.tripOverview.duration || 14} Days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-white/70">Total Activities</span>
                    <span className="text-white font-semibold">{dashboardData?.statistics.totalActivities || 45}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-white/70">Dates</span>
                    <span className="text-white font-semibold">
                      {dashboardData?.tripOverview.startDate && dashboardData?.tripOverview.endDate
                        ? `${new Date(dashboardData.tripOverview.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(dashboardData.tripOverview.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                        : 'Jun 15 - 28'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Compass className="w-8 h-8 tab-content-icon-red" />
                  <h3 className="text-2xl font-bold text-white">Journey Progress</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/70">Planning Complete</span>
                      <span className="text-white font-semibold">85%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full tab-progress-bar rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <CheckCircle className="w-6 h-6 tab-content-icon-gold mx-auto mb-2" />
                      <p className="text-white font-semibold">Booked</p>
                      <p className="text-white/70 text-sm">Flights & Hotels</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <Clock className="w-6 h-6 tab-content-icon-red mx-auto mb-2" />
                      <p className="text-white font-semibold">Pending</p>
                      <p className="text-white/70 text-sm">Match Tickets</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Your Football Journey</h3>
                <p className="text-white/70">Every match, every moment planned to perfection</p>
              </div>
              <div className="grid gap-6">
                {(dashboardData?.itinerarySummary || []).length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">No Itinerary Data Available</h4>
                    <p className="text-white/60">
                      Itinerary details will appear here once standardized files are loaded.
                    </p>
                  </div>
                ) : (
                  (dashboardData?.itinerarySummary || []).map((item, index) => (
                  <Link
                    key={item.date}
                    to={`/itinerary/${item.date}`}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group block"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 itinerary-day-number rounded-full flex items-center justify-center text-black font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-5 h-5 tab-content-icon-gold" />
                          <span className="text-white font-semibold">
                            {new Date(item.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          {item.hasMatches && (
                            <span className="match-day-badge px-2 py-1 rounded-full text-xs font-medium">
                              Match Day
                            </span>
                          )}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-white/60 text-sm mb-2 line-clamp-2">{item.summary}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-white/70">
                            <MapPin className="w-4 h-4" />
                            <span>{item.activityCount} activities</span>
                          </div>
                          {item.keyActivities.length > 0 && (
                            <div className="flex items-center space-x-1">
                              {item.keyActivities.slice(0, 2).map((activity, i) => (
                                <span key={i} className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs">
                                  {activity.length > 15 ? `${activity.substring(0, 15)}...` : activity}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'essentials' && (
            <div className="space-y-8">
              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 mx-auto essential-icon-gold rounded-2xl flex items-center justify-center mb-3">
                    <Calendar className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{dashboardData?.statistics.totalDays || 14}</h3>
                  <p className="text-white/70">Total Days</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 mx-auto essential-icon-red rounded-2xl flex items-center justify-center mb-3">
                    <Star className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{dashboardData?.statistics.totalActivities || 45}</h3>
                  <p className="text-white/70">Activities</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 mx-auto essential-icon-gold rounded-2xl flex items-center justify-center mb-3">
                    <Plane className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{dashboardData?.statistics.totalTransports || 12}</h3>
                  <p className="text-white/70">Transports</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                  <div className="w-16 h-16 mx-auto essential-icon-red rounded-2xl flex items-center justify-center mb-3">
                    <Trophy className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{dashboardData?.statistics.totalMatches || 8}</h3>
                  <p className="text-white/70">Matches</p>
                </div>
              </div>

              {/* Essential Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Documents', icon: Ticket, items: ['Passport', 'Visa', 'Travel Insurance'], colorClass: 'essential-category-gold' },
                  { title: 'Accommodation', icon: Hotel, items: ['Hotel Bookings', 'Check-in Times', 'Contact Info'], colorClass: 'essential-category-red' },
                  { title: 'Transportation', icon: Plane, items: ['Flight Tickets', 'Airport Transfers', 'Local Transport'], colorClass: 'essential-category-gold' },
                  { title: 'Entertainment', icon: Camera, items: ['Match Tickets', 'Stadium Maps', 'Fan Events'], colorClass: 'essential-category-red' }
                ].map((category, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                    <div className="text-center mb-4">
                      <div className={`w-16 h-16 mx-auto ${category.colorClass} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 essential-check-icon flex-shrink-0" />
                          <span className="text-white/80 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Quick Actions Footer - Premium Design */}
        <div className="mt-24">
          <div className="relative">
            {/* Multi-layer Background Effects */}
            <div className="absolute inset-0 footer-bg-primary rounded-4xl blur-2xl animate-pulse" />
            <div className="absolute inset-0 footer-bg-secondary rounded-4xl blur-3xl" />

            {/* Main Footer Container with Enhanced Glassmorphism */}
            <div className="relative bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-3xl rounded-4xl p-16 border border-white/30 shadow-2xl overflow-hidden">
              {/* Floating Particles Background */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 footer-particle rounded-full animate-float blur-sm"
                    style={{
                      left: `${10 + i * 12}%`,
                      top: `${20 + (i % 3) * 30}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: `${5 + i * 0.5}s`
                    }}
                  />
                ))}
              </div>

              {/* Enhanced Header Section */}
              <div className="relative z-10 text-center mb-16">
                <div className="inline-flex items-center justify-center space-x-4 mb-8">
                  <div className="relative">
                    <div className="absolute -inset-4 footer-heart-glow rounded-full blur-xl animate-pulse" />
                    <div className="relative footer-heart-bg p-4 rounded-2xl backdrop-blur-sm border footer-heart-border">
                      <Heart className="w-10 h-10 footer-heart-icon animate-pulse" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="footer-title text-5xl md:text-6xl font-black leading-tight">
                      Ready for the Adventure?
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-2 h-2 footer-action-dot rounded-full animate-pulse" />
                      <span className="footer-action-text text-sm font-semibold uppercase tracking-wider">Take Action Now</span>
                    </div>
                  </div>
                </div>

                <p className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
                  Explore destinations, get travel tips, and stay updated with the latest match schedules
                </p>
                <p className="text-lg text-white/60 max-w-3xl mx-auto mt-4 leading-relaxed">
                  Your journey to the FIFA Club World Cup 2025™ starts with these essential tools
                </p>
              </div>

              {/* Enhanced Action Buttons Grid */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                {/* Explore Destinations Button - Enhanced */}
                <div className="group relative">
                  <div className="absolute -inset-2 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500 animate-pulse button-glow-gold" />
                  <div className="absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 button-glow-gold-inner" />

                  <button className="action-button-gold relative w-full text-black px-10 py-8 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl group overflow-hidden">
                    {/* Button Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-black/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        <div className="relative bg-black/20 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-black/30 transition-all duration-300">
                          <Map className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="font-black tracking-wide text-2xl block mb-2">Explore Destinations</span>
                        <span className="text-base opacity-90 font-semibold">Discover amazing places</span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Travel Tips Button - Enhanced */}
                <div className="group relative">
                  <div className="absolute -inset-2 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500 animate-pulse button-glow-red" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 button-glow-red-inner" />

                  <button className="action-button-red relative w-full text-black px-10 py-8 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl group overflow-hidden">
                    {/* Button Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-black/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        <div className="relative bg-black/20 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-black/30 transition-all duration-300">
                          <Camera className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="font-black tracking-wide text-2xl block mb-2">Travel Tips</span>
                        <span className="text-base opacity-90 font-semibold">Expert advice & insider guides</span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Match Schedule Button - Enhanced */}
                <div className="group relative">
                  <div className="absolute -inset-2 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500 animate-pulse button-glow-gold" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 button-glow-gold-inner" />

                  <button className="action-button-gold relative w-full text-black px-10 py-8 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl group overflow-hidden">
                    {/* Button Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-black/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        <div className="relative bg-black/20 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-black/30 transition-all duration-300">
                          <Trophy className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="font-black tracking-wide text-2xl block mb-2">Match Schedule</span>
                        <span className="text-base opacity-90 font-semibold">Never miss a game or event</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Enhanced Footer Note with Additional Elements */}
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-20 h-px footer-line-left" />
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 footer-sparkles animate-pulse" />
                    <span className="footer-premium-text font-semibold text-sm uppercase tracking-wider">Premium Experience</span>
                    <Sparkles className="w-5 h-5 footer-sparkles animate-pulse" />
                  </div>
                  <div className="w-20 h-px footer-line-right" />
                </div>

                <p className="text-white/60 text-lg font-light leading-relaxed max-w-3xl mx-auto">
                  Your ultimate FIFA Club World Cup 2025™ experience awaits
                </p>
                <p className="text-white/40 text-sm mt-2">
                  Join thousands of fans in the most prestigious club tournament
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            filter: brightness(1) drop-shadow(0 0 8px var(--color-gold));
          }
          50% {
            opacity: 0.8;
            filter: brightness(1.2) drop-shadow(0 0 16px var(--color-gold));
          }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        /* Hero Title Gradient Text with Fallback */
        .hero-title {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 25%, #FFD700 50%, #DC2626 75%, #FFD700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: gradient-shift 4s ease infinite;
        }

        /* Fallback for browsers that don't support background-clip: text */
        @supports not (-webkit-background-clip: text) {
          .hero-title {
            background: none;
            color: #FFD700;
            text-shadow:
              0 0 10px rgba(255, 215, 0, 0.5),
              0 0 20px rgba(220, 38, 38, 0.3),
              0 0 30px rgba(255, 215, 0, 0.2);
          }
        }

        /* Footer Title Gradient Text */
        .footer-title {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 50%, #FFD700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: gradient-shift 3s ease infinite;
        }

        /* Fallback for footer title */
        @supports not (-webkit-background-clip: text) {
          .footer-title {
            background: none;
            color: #FFD700;
            text-shadow:
              0 0 8px rgba(255, 215, 0, 0.4),
              0 0 16px rgba(220, 38, 38, 0.2);
          }
        }

        /* Action Button Styles with Hardcoded Colors */
        .action-button-gold {
          background: linear-gradient(135deg, #FFD700 0%, #FFD700 30%, #DC2626 100%);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        .action-button-gold:hover {
          background: linear-gradient(135deg, #FFF700 0%, #FFE55C 30%, #EF4444 100%);
          background-size: 200% 200%;
        }

        .action-button-re
          background: linear-gradient(135deg, #DC2626 0%, #DC2626 30%, #FFD700 100%);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        .action-button-red:hover {
          background: linear-gradient(135deg, #EF4444 0%, #F87171 30%, #FFF700 100%);
          background-size: 200% 200%;
        }

        /* Button Glow Effects */
        .button-glow-gold {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 50%, #FFD700 100%);
        }

        .button-glow-gold-inner {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.4) 0%, rgba(220, 38, 38, 0.4) 100%);
        }

        .button-glow-red {
          background: linear-gradient(135deg, #DC2626 0%, #FFD700 50%, #DC2626 100%);
        }

        .button-glow-red-inner {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.4) 0%, rgba(255, 215, 0, 0.4) 100%);
        }

        /* Footer Line Effects */
        .footer-line-left {
          background: linear-gradient(to right, transparent, #FFD700);
        }

        .footer-line-right {
          background: linear-gradient(to right, #FFD700, transparent);
        }

        /* Loading State Styles */
        .loading-particle {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
        }

        .loading-spinner {
          border-color: #FFD700;
        }

        .loading-icon {
          color: #FFD700;
        }

        .loading-title {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: gradient-shift 3s ease infinite;
        }

        @supports not (-webkit-background-clip: text) {
          .loading-title {
            background: none;
            color: #FFD700;
          }
        }

        .loading-progress {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        /* Error State Styles */
        .error-icon {
          color: #DC2626;
        }

        .error-button {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        .error-button:hover {
          background: linear-gradient(135deg, #FFF700 0%, #EF4444 100%);
        }

        /* Premium Badge Styles */
        .premium-badge-glow {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(220, 38, 38, 0.3) 50%, rgba(255, 215, 0, 0.3) 100%);
        }

        .premium-badge-bg {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%);
        }

        .premium-badge-border {
          border-color: rgba(255, 215, 0, 0.4);
        }

        .premium-icon {
          color: #FFD700;
        }

        .premium-icon-glow {
          background: rgba(255, 215, 0, 0.3);
        }

        .premium-icon-glow-outer {
          background: rgba(255, 215, 0, 0.1);
        }

        .premium-subtitle {
          color: rgba(255, 215, 0, 0.8);
        }

        .live-indicator {
          background: #FFD700;
        }

        .live-indicator-glow {
          background: rgba(255, 215, 0, 0.5);
        }

        .live-data-badge {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
          color: #FFD700;
        }

        .live-data-border {
          border-color: rgba(255, 215, 0, 0.5);
        }

        /* Hero Title Background and Decorative Elements */
        .hero-title-bg {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 50%, rgba(220, 38, 38, 0.1) 100%);
        }

        .hero-line-left {
          background: linear-gradient(to right, transparent, #FFD700);
        }

        .hero-line-right {
          background: linear-gradient(to right, #DC2626, transparent);
        }

        .hero-center-icon {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        /* Trip Dates Styles */
        .trip-dates-glow {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
        }

        .trip-dates-icon {
          color: #FFD700;
        }

        .trip-dates-icon-glow {
          background: rgba(255, 215, 0, 0.2);
        }

        /* Stats Cards Styles */
        .stats-card-glow-gold {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 50%, #FFD700 100%);
        }

        .stats-card-glow-red {
          background: linear-gradient(135deg, #DC2626 0%, #FFD700 50%, #DC2626 100%);
        }

        .stats-card-border-gold:hover {
          border-color: rgba(255, 215, 0, 0.6);
        }

        .stats-card-border-red:hover {
          border-color: rgba(220, 38, 38, 0.6);
        }

        .stats-card-bg-gold {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, transparent 100%);
        }

        .stats-card-bg-red {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, transparent 100%);
        }

        .stats-icon-glow-gold {
          background: rgba(255, 215, 0, 0.2);
        }

        .stats-icon-glow-red {
          background: rgba(220, 38, 38, 0.2);
        }

        .stats-icon-bg-gold {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
        }

        .stats-icon-bg-red {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(255, 215, 0, 0.2) 100%);
        }

        .stats-icon-border-gold {
          border-color: rgba(255, 215, 0, 0.3);
        }

        .stats-icon-border-red {
          border-color: rgba(220, 38, 38, 0.3);
        }

        .stats-icon-gold {
          color: #FFD700;
        }

        .stats-icon-red {
          color: #DC2626;
        }

        .stats-number-gold {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .stats-number-red {
          background: linear-gradient(135deg, #DC2626 0%, #FFD700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        @supports not (-webkit-background-clip: text) {
          .stats-number-gold {
            background: none;
            color: #FFD700;
          }
          .stats-number-red {
            background: none;
            color: #DC2626;
          }
        }

        .stats-progress-gold {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 50%, #FFD700 100%);
        }

        .stats-progress-red {
          background: linear-gradient(135deg, #DC2626 0%, #FFD700 50%, #DC2626 100%);
        }

        /* Additional Stats Card Elements */
        .traveler-dot {
          background: linear-gradient(135deg, #DC2626 0%, #FFD700 100%);
        }

        .traveler-dot-glow {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, rgba(255, 215, 0, 0.3) 100%);
        }

        .destination-nav-icon {
          color: #FFD700;
        }

        .destination-nav-glow {
          background: rgba(255, 215, 0, 0.2);
        }

        .weather-orb {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(255, 215, 0, 0.2) 100%);
        }

        .weather-star {
          color: #FFD700;
        }

        /* Countdown Timer Styles */
        .countdown-bg {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(220, 38, 38, 0.2) 50%, rgba(255, 215, 0, 0.2) 100%);
        }

        .countdown-particle {
          background: rgba(255, 215, 0, 0.3);
        }

        .countdown-icon {
          color: #FFD700;
        }

        .countdown-icon-glow {
          background: rgba(255, 215, 0, 0.2);
        }

        .countdown-title {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: gradient-shift 4s ease infinite;
        }

        @supports not (-webkit-background-clip: text) {
          .countdown-title {
            background: none;
            color: #FFD700;
          }
        }

        .countdown-glow-countdown-gold {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        .countdown-glow-countdown-red {
          background: linear-gradient(135deg, #DC2626 0%, #FFD700 100%);
        }

        .countdown-number-countdown-gold {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .countdown-number-countdown-red {
          background: linear-gradient(135deg, #DC2626 0%, #FFD700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        @supports not (-webkit-background-clip: text) {
          .countdown-number-countdown-gold {
            background: none;
            color: #FFD700;
          }
          .countdown-number-countdown-red {
            background: none;
            color: #DC2626;
          }
        }

        .countdown-progress {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        /* Tab Navigation Styles */
        .tab-nav-glow {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(220, 38, 38, 0.3) 100%);
        }

        .tab-active {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        /* Tab Content Styles */
        .tab-content-icon-gold {
          color: #FFD700;
        }

        .tab-content-icon-red {
          color: #DC2626;
        }

        .tab-progress-bar {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        .itinerary-day-number {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        .match-day-badge {
          background: rgba(220, 38, 38, 0.2);
          color: #DC2626;
        }

        /* Essential Categories Styles */
        .essential-icon-gold {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        .essential-icon-red {
          background: linear-gradient(135deg, #DC2626 0%, #FFD700 100%);
        }

        .essential-category-gold {
          background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        }

        .essential-category-red {
          background: linear-gradient(135deg, #DC2626 0%, #FFD700 100%);
        }

        .essential-check-icon {
          color: #FFD700;
        }

        /* Footer Styles */
        .footer-bg-primary {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(220, 38, 38, 0.15) 50%, rgba(255, 215, 0, 0.15) 100%);
        }

        .footer-bg-secondary {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 50%, rgba(220, 38, 38, 0.1) 100%);
        }

        .footer-particle {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(220, 38, 38, 0.3) 100%);
        }

        .footer-heart-glow {
          background: rgba(220, 38, 38, 0.2);
        }

        .footer-heart-bg {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(255, 215, 0, 0.2) 100%);
        }

        .footer-heart-border {
          border-color: rgba(220, 38, 38, 0.4);
        }

        .footer-heart-icon {
          color: #DC2626;
        }

        .footer-action-dot {
          background: #FFD700;
        }

        .footer-action-text {
          color: rgba(255, 215, 0, 0.8);
        }

        .footer-sparkles {
          color: #FFD700;
        }

        .footer-premium-text {
          color: #FFD700;
        }

        /* Enhanced glassmorphism utilities */
        .glass-premium {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-card-hover:hover {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(24px) saturate(200%);
          border: 1px solid rgba(255, 215, 0, 0.3);
          transform: translateY(-4px) scale(1.02);
        }

        /* Custom rounded corners for premium look */
        .rounded-4xl {
          border-radius: 2rem;
        }

        /* Enhanced shadow utilities */
        .shadow-premium {
          box-shadow:
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .shadow-glow-gold {
          box-shadow:
            0 0 20px rgba(255, 215, 0, 0.3),
            0 0 40px rgba(255, 215, 0, 0.1),
            0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .shadow-glow-red {
          box-shadow:
            0 0 20px rgba(220, 38, 38, 0.3),
            0 0 40px rgba(220, 38, 38, 0.1),
            0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
