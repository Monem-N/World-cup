import React from 'react';
import { Link } from 'react-router';
import { 
  Globe, 
  Compass, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Star, 
  Plane, 
  Trophy, 
  Ticket, 
  Hotel, 
  Camera 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { DashboardData } from '../../api/dashboardDataLoader';

interface TabContentProps {
  activeTab: string;
  dashboardData: DashboardData | null;
}

export default function TabContent({ activeTab, dashboardData }: TabContentProps) {
  const { t } = useTranslation();

  if (activeTab === 'overview') {
    return (
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
    );
  }

  if (activeTab === 'itinerary') {
    return (
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
    );
  }

  if (activeTab === 'essentials') {
    return (
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
    );
  }

  return null;
}
