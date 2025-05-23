/**
 * Dashboard Data Loader
 * 
 * This module aggregates data from standardized itinerary files to provide
 * summary information for the dashboard.
 */

import { getAvailableDates } from './standardizedItineraryLoader.browser';

export interface DashboardData {
  tripOverview: {
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    duration: number;
    totalActivities: number;
    totalDestinations: number;
    travelers: number;
  };
  itinerarySummary: Array<{
    date: string;
    title: string;
    summary: string;
    activityCount: number;
    hasMatches: boolean;
    keyActivities: string[];
  }>;
  statistics: {
    totalDays: number;
    totalActivities: number;
    totalTransports: number;
    totalMeals: number;
    totalMatches: number;
    uniqueLocations: number;
  };
  upcomingHighlights: Array<{
    date: string;
    title: string;
    type: 'match' | 'activity' | 'transport';
    location: string;
    time: string;
  }>;
}

/**
 * Loads and aggregates dashboard data from standardized itinerary files
 */
export async function loadDashboardData(): Promise<DashboardData> {
  try {
    // Get all available dates
    const availableDates = await getAvailableDates();
    
    if (availableDates.length === 0) {
      return getFallbackDashboardData();
    }

    // Load data for each date
    const itineraryData = await Promise.all(
      availableDates.map(async (date) => {
        try {
          const response = await fetch(`/api/itineraries/${date}`);
          if (!response.ok) return null;
          return await response.json();
        } catch (error) {
          console.warn(`Failed to load data for ${date}:`, error);
          return null;
        }
      })
    );

    // Filter out failed loads
    const validItineraries = itineraryData.filter(Boolean);

    if (validItineraries.length === 0) {
      return getFallbackDashboardData();
    }

    // Aggregate the data
    return aggregateItineraryData(validItineraries, availableDates);
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return getFallbackDashboardData();
  }
}

/**
 * Aggregates itinerary data into dashboard format
 */
function aggregateItineraryData(itineraries: any[], dates: string[]): DashboardData {
  const sortedDates = dates.sort();
  const startDate = sortedDates[0];
  const endDate = sortedDates[sortedDates.length - 1];
  
  // Calculate statistics
  let totalActivities = 0;
  let totalTransports = 0;
  let totalMeals = 0;
  let totalMatches = 0;
  const uniqueLocations = new Set<string>();
  
  // Process each itinerary
  const itinerarySummary = itineraries.map((itinerary) => {
    const activities = itinerary.activities || [];
    const matches = activities.filter((a: any) => a.type === 'match');
    const transports = activities.filter((a: any) => a.type === 'transport');
    const meals = activities.filter((a: any) => a.type === 'meal');
    
    totalActivities += activities.length;
    totalTransports += transports.length;
    totalMeals += meals.length;
    totalMatches += matches.length;
    
    // Collect unique locations
    activities.forEach((activity: any) => {
      if (activity.location?.name) {
        uniqueLocations.add(activity.location.name);
      }
    });
    
    // Get key activities (first 3 non-transport activities)
    const keyActivities = activities
      .filter((a: any) => a.type !== 'transport')
      .slice(0, 3)
      .map((a: any) => a.title);
    
    return {
      date: itinerary.date,
      title: itinerary.title || `Day ${itinerary.date}`,
      summary: itinerary.summary || '',
      activityCount: activities.length,
      hasMatches: matches.length > 0,
      keyActivities
    };
  });

  // Get upcoming highlights (next 5 important activities)
  const upcomingHighlights = itineraries
    .flatMap((itinerary) => 
      (itinerary.activities || [])
        .filter((a: any) => a.type === 'match' || a.important)
        .map((a: any) => ({
          date: itinerary.date,
          title: a.title,
          type: a.type,
          location: a.location?.name || 'TBD',
          time: a.time || ''
        }))
    )
    .slice(0, 5);

  // Determine main destination from most common location
  const locationCounts = Array.from(uniqueLocations).reduce((acc, location) => {
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mainDestination = Object.entries(locationCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Multiple Destinations';

  // Extract trip title from first itinerary or create a default
  const tripTitle = itineraries[0]?.title?.includes('FIFA') || itineraries[0]?.title?.includes('World Cup') 
    ? 'FIFA Club World Cup 2025™'
    : 'World Cup Adventure 2025';

  return {
    tripOverview: {
      title: tripTitle,
      destination: mainDestination.includes('USA') ? 'USA' : mainDestination,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      duration: sortedDates.length,
      totalActivities,
      totalDestinations: uniqueLocations.size,
      travelers: 6 // This could be extracted from metadata if available
    },
    itinerarySummary: itinerarySummary.sort((a, b) => a.date.localeCompare(b.date)),
    statistics: {
      totalDays: sortedDates.length,
      totalActivities,
      totalTransports,
      totalMeals,
      totalMatches,
      uniqueLocations: uniqueLocations.size
    },
    upcomingHighlights
  };
}

/**
 * Provides fallback data when standardized files are not available
 */
function getFallbackDashboardData(): DashboardData {
  return {
    tripOverview: {
      title: "FIFA Club World Cup 2025™",
      destination: "USA",
      startDate: "June 15, 2025",
      endDate: "June 28, 2025",
      duration: 14,
      totalActivities: 45,
      totalDestinations: 5,
      travelers: 6
    },
    itinerarySummary: [
      {
        date: "2025-06-15",
        title: "Arrival Day",
        summary: "Arrival and initial exploration",
        activityCount: 5,
        hasMatches: false,
        keyActivities: ["Airport Transfer", "Hotel Check-in", "City Tour"]
      },
      {
        date: "2025-06-16",
        title: "Opening Ceremony",
        summary: "FIFA Club World Cup opening ceremony",
        activityCount: 6,
        hasMatches: true,
        keyActivities: ["Opening Ceremony", "Welcome Dinner", "Stadium Tour"]
      }
    ],
    statistics: {
      totalDays: 14,
      totalActivities: 45,
      totalTransports: 12,
      totalMeals: 18,
      totalMatches: 8,
      uniqueLocations: 15
    },
    upcomingHighlights: [
      {
        date: "2025-06-16",
        title: "Opening Ceremony",
        type: "match",
        location: "Al Bayt Stadium",
        time: "18:00"
      }
    ]
  };
}

/**
 * Formats a date string for display
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch {
    return dateString;
  }
}
