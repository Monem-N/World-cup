import type { DayProgram, WeatherInfo } from '../lib/types';
import { supabase } from '../lib/supabase';
import { loadStandardizedItinerary, getAvailableDates } from './standardizedItineraryLoader.browser';
import {
  getItineraryOffline,
  saveItineraryOffline,
  getAvailableDatesOffline,
  processSyncQueue
} from './syncUtils';

// Keep the mock data for fallback and testing
const mockWeatherDay1: WeatherInfo = {
  date: "2025-06-01",
  temperature: 22,
  condition: "Ensoleillé",
  icon: "sunny"
};

const mockWeatherDay2: WeatherInfo = {
  date: "2025-06-02",
  temperature: 24,
  condition: "Partiellement nuageux",
  icon: "partly_cloudy"
};

export const mockDayProgramDay1: DayProgram = {
  date: "2025-06-01",
  title: "Arrivée à New York",
  summary: "Arrivée à New York, enregistrement à l'hôtel, exploration de la ville.",
  weather: mockWeatherDay1,
  reminders: ["Apporter les documents de voyage", "Charger la batterie externe du téléphone"],
  docs: ["hotel-checkin.pdf", "itinerary.pdf"],
  items: [
    {
      id: "breakfast1",
      type: "meal",
      title: "Petit-déjeuner à l'aéroport",
      time: "07:30",
      duration: "1h",
      location: {
        name: "Aéroport Charles de Gaulle Terminal 2",
        lat: 49.0097,
        lng: 2.5479
      },
      notes: "Prendre un petit-déjeuner rapide avant l'embarquement",
      status: "pending"
    },
    {
      id: "flight1",
      type: "transport",
      title: "Vol de Paris à New York",
      time: "09:00",
      duration: "8h",
      location: {
        name: "Aéroport Charles de Gaulle (CDG)",
        lat: 49.0097,
        lng: 2.5479
      },
      transport: {
        mode: "Vol",
        carrier: "Air France",
        bookingReference: "AF123",
        seatMap: {
          "Alice": "12A",
          "Bob": "12B",
          "Charlie": "12C"
        },
        notes: "Faire l'enregistrement en ligne au préalable."
      },
      attachments: ["billet-avion.pdf"],
      status: "completed"
    },
    {
      id: "lunch1",
      type: "meal",
      title: "Déjeuner à JFK",
      time: "15:30",
      duration: "1h",
      location: {
        name: "Terminal 4, Aéroport JFK",
        lat: 40.6413,
        lng: -73.7781
      },
      notes: "Déjeuner après l'immigration",
      status: "pending"
    },
    {
      id: "transfer1",
      type: "transport",
      title: "Transfert de l'aéroport à l'hôtel",
      time: "17:00",
      duration: "1h",
      location: {
        name: "Aéroport international John F. Kennedy (JFK)",
        lat: 40.6413,
        lng: -73.7781
      },
      transport: {
        mode: "Taxi",
        pickup_time: "17:00",
        pickup_location: "Terminal 4, sortie des arrivées",
        estimated_cost: 65
      },
      status: "pending"
    },
    {
      id: "hotel1",
      type: "hotel",
      title: "Enregistrement à l'Hôtel XYZ",
      time: "18:30",
      location: {
        name: "Hôtel XYZ",
        address: "123 Rue Principale, New York, NY",
        lat: 40.7128,
        lng: -74.0060,
        contact: "+1 212-555-1212",
        confirmationNumber: "HXYZ987"
      },
      notes: "Demande d'enregistrement anticipé.",
      status: "pending"
    },
    {
      id: "dinner1",
      type: "meal",
      title: "Dîner dans un restaurant local",
      time: "20:00",
      duration: "2h",
      location: {
        name: "Restaurant ABC",
        address: "456 Rue Secondaire, New York, NY",
        lat: 40.7145,
        lng: -74.0076
      },
      notes: "Réservation pour 4 personnes.",
      status: "pending"
    }
  ]
};

export const mockDayProgramDay2: DayProgram = {
  date: "2025-06-02",
  title: "Journée de visite et match",
  summary: "Visite de la Statue de la Liberté, déjeuner, et match de football.",
  weather: mockWeatherDay2,
  reminders: ["Apporter le billet de match", "Vérifier l'itinéraire"],
  docs: ["match-ticket.pdf", "map.pdf"],
  items: [
    {
      id: "breakfast2",
      type: "meal",
      title: "Petit-déjeuner à l'hôtel",
      time: "07:00",
      duration: "1h",
      location: {
        name: "Hôtel XYZ",
        lat: 40.7128,
        lng: -74.0060
      },
      notes: "Petit-déjeuner buffet à l'hôtel",
      status: "pending"
    },
    {
      id: "activity1",
      type: "activity",
      title: "Visite de la Statue de la Liberté",
      time: "09:00",
      duration: "3h",
      location: {
        name: "Statue de la Liberté",
        address: "Liberty Island, New York, NY",
        lat: 40.6892,
        lng: -74.0445
      },
      notes: "Visite guidée réservée.",
      status: "pending",
      isGroupEvent: true
    },
    {
      id: "lunch2",
      type: "meal",
      title: "Déjeuner dans un café",
      time: "12:30",
      duration: "1h",
      location: {
        name: "Café DEF",
        address: "789 Rue Tertiaire, New York, NY",
        lat: 40.7161,
        lng: -74.0089
      },
      notes: "Déjeuner léger.",
      status: "pending"
    },
    {
      id: "match1",
      type: "match",
      title: "Match de football au MetLife Stadium",
      time: "19:00",
      duration: "2h",
      location: {
        name: "MetLife Stadium",
        address: "1 MetLife Stadium Dr, East Rutherford, NJ",
        lat: 40.8135,
        lng: -74.0745
      },
      transport: {
        mode: "Uber",
        pickup_time: "17:30",
        pickup_location: "Hôtel XYZ",
        estimated_cost: 40,
        shared_with: ["User1", "User2", "User3"]
      },
      notes: "Arriver tôt pour les contrôles de sécurité. Place Section 134, Rangée 12.",
      attachments: ["match-ticket.pdf"],
      status: "pending",
      important: true,
      requiresConfirmation: true,
      isGroupEvent: true
    }
  ]
};

async function fetchMockDayProgram(date: string): Promise<DayProgram> {
  console.log(`Récupération des données fictives pour la date : ${date}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
}

/**
 * Fetches an itinerary for a specific date
 *
 * Uses a cascading data source strategy:
 * 1. Try offline storage first (if offline)
 * 2. Try standardized files
 * 3. Try Supabase
 * 4. Fall back to mock data
 *
 * @param date - Date string in YYYY-MM-DD format
 * @returns Promise resolving to the DayProgram for the specified date
 */
export async function fetchItinerary(date: string): Promise<DayProgram> {
  console.log(`Fetching itinerary data for date: ${date}`);

  try {
    // Check if we're offline
    if (!navigator.onLine) {
      console.log('Device is offline, checking offline storage...');
      const offlineData = getItineraryOffline(date);

      if (offlineData) {
        console.log('Successfully loaded data from offline storage');
        return offlineData;
      }

      console.log('No offline data found, falling back to mock data');
      const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
      return { ...mockData, _source: 'mock' };
    }

    // Try to sync any pending changes
    try {
      const syncResults = await processSyncQueue();
      console.log('Sync results:', syncResults);
    } catch (syncError) {
      console.warn('Error syncing data:', syncError);
      // Continue with fetching even if sync fails
    }

    // First, try to load from standardized files
    console.log('Trying to load from standardized files...');
    const standardizedData = await loadStandardizedItinerary(date);

    if (standardizedData) {
      console.log('Successfully loaded data from standardized files');
      // Save to offline storage for future offline access
      saveItineraryOffline(date, standardizedData);
      return standardizedData;
    }

    console.log('No standardized data found, trying Supabase...');

    // If no standardized data, try Supabase
    const { data: days, error: daysError } = await supabase
      .from('itinerary_days')
      .select('id')
      .eq('date', date)
      .limit(1);

    if (daysError) {
      console.warn(`Error querying itinerary days:`, daysError);

      // Check offline storage before falling back to mock data
      const offlineData = getItineraryOffline(date);
      if (offlineData) {
        console.log('Found data in offline storage');
        return offlineData;
      }

      console.log('Falling back to mock data');
      const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
      return { ...mockData, _source: 'mock' };
    }

    if (!days || days.length === 0) {
      console.warn(`No itinerary found for date: ${date}`);

      // Check offline storage before falling back to mock data
      const offlineData = getItineraryOffline(date);
      if (offlineData) {
        console.log('Found data in offline storage');
        return offlineData;
      }

      console.log('Falling back to mock data');
      const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
      return { ...mockData, _source: 'mock' };
    }

    const dayId = days[0].id;
    console.log(`Found itinerary day with ID: ${dayId}`);

    try {
      // Try the RPC function first as it's more efficient
      console.log('Fetching day details using RPC function...');

      const { data: rpcData, error: rpcError } = await supabase
        .rpc('get_itinerary_day', { day_id: dayId });

      if (!rpcError && rpcData) {
        console.log('Successfully fetched data using RPC function');

        // Transform the data to DayProgram format
        const transformedData = transformSupabaseData(rpcData, date);

        // Save to offline storage
        saveItineraryOffline(date, transformedData);

        return transformedData;
      }

      // If RPC fails, fall back to direct queries
      console.log('RPC function failed, falling back to direct queries...');

      // Get the day details
      const { data: dayData, error: dayError } = await supabase
        .from('itinerary_days')
        .select('*')
        .eq('id', dayId)
        .single();

      if (dayError) throw dayError;

      // Get the activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select(`
          *,
          location:locations(*),
          transport:transport_details(*)
        `)
        .eq('itinerary_day_id', dayId)
        .order('sequence_order');

      if (activitiesError) throw activitiesError;

      // Get the weather
      let weatherData = null;
      try {
        const { data, error } = await supabase
          .from('weather')
          .select('temperature, condition, icon')
          .eq('itinerary_day_id', dayId)
          .maybeSingle();

        if (!error && data) {
          weatherData = data;
        }
      } catch (weatherError) {
        console.warn('Error fetching weather data:', weatherError);
        // Continue without weather data
      }

      // Get the reminders
      const { data: remindersData, error: remindersError } = await supabase
        .from('reminders')
        .select('text')
        .eq('itinerary_day_id', dayId);

      if (remindersError) throw remindersError;

      // Get the documents
      const { data: docsData, error: docsError } = await supabase
        .from('documents')
        .select('file_name')
        .eq('itinerary_day_id', dayId);

      if (docsError) throw docsError;

      // Combine all the data
      const combinedData = {
        ...dayData,
        weather: weatherData,
        reminders: remindersData?.map(r => r.text) || [],
        docs: docsData?.map(d => d.file_name) || [],
        items: activitiesData || []
      };

      console.log('Successfully fetched data directly from tables');

      if (!combinedData) {
        console.warn('No data returned from direct queries');

        // Check offline storage before falling back to mock data
        const offlineData = getItineraryOffline(date);
        if (offlineData) {
          console.log('Found data in offline storage');
          return offlineData;
        }

        console.log('Falling back to mock data');
        const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
        return { ...mockData, _source: 'mock' };
      }

      // Transform the data from Supabase format to DayProgram format
      const transformedData = {
        date: combinedData.date,
        title: combinedData.title,
        summary: combinedData.summary || '',
        weather: combinedData.weather ? {
          date: combinedData.date,
          temperature: combinedData.weather.temperature,
          condition: combinedData.weather.condition,
          icon: combinedData.weather.icon
        } : undefined,
        reminders: combinedData.reminders || [],
        docs: combinedData.docs || [],
        items: combinedData.items.map((item: any) => ({
          id: item.id,
          type: item.type,
          title: item.title,
          time: item.time,
          duration: item.duration,
          location: item.location,
          transport: item.transport,
          notes: item.notes,
          attachments: item.attachments,
          status: item.status,
          important: item.important,
          requiresConfirmation: item.requires_confirmation,
          isGroupEvent: item.is_group_event
        })),
        _source: 'supabase' as const // Indicate this data came from Supabase
      };

      // Save to offline storage
      saveItineraryOffline(date, transformedData);

      return transformedData;
    } catch (queryError) {
      console.error('Error with queries:', queryError);

      // Check offline storage before falling back to mock data
      const offlineData = getItineraryOffline(date);
      if (offlineData) {
        console.log('Found data in offline storage');
        return offlineData;
      }

      console.log('Falling back to mock data');
      const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
      return { ...mockData, _source: 'mock' };
    }
  } catch (error) {
    console.error('Error fetching itinerary:', error);

    // Check offline storage before falling back to mock data
    const offlineData = getItineraryOffline(date);
    if (offlineData) {
      console.log('Found data in offline storage');
      return offlineData;
    }

    console.log('Falling back to mock data');
    const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
    return { ...mockData, _source: 'mock' };
  }
}

/**
 * Transforms data from Supabase RPC function to DayProgram format
 */
function transformSupabaseData(data: any, date: string): DayProgram {
  return {
    date: data.date,
    title: data.title,
    summary: data.summary || '',
    weather: data.weather ? {
      date: date,
      temperature: data.weather.temperature,
      condition: data.weather.condition,
      icon: data.weather.icon
    } : undefined,
    reminders: data.reminders || [],
    docs: data.docs || [],
    items: data.activities ? data.activities.map((item: any) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      time: item.time,
      duration: item.duration,
      location: item.location,
      transport: item.transport,
      notes: item.notes,
      attachments: item.attachments ? item.attachments.map((a: any) => a.file_name) : [],
      status: item.status,
      important: item.important,
      requiresConfirmation: item.requires_confirmation,
      isGroupEvent: item.is_group_event
    })) : [],
    _source: 'supabase' as const,
    _additionalData: data.metadata?.additional_data
  };
}

/**
 * Gets all available itinerary dates
 *
 * Uses a cascading data source strategy:
 * 1. Try offline storage first (if offline)
 * 2. Try standardized files
 * 3. Try Supabase
 * 4. Fall back to mock data
 *
 * @returns Promise resolving to an array of date strings in YYYY-MM-DD format
 */
export async function getAvailableItineraryDates(): Promise<string[]> {
  try {
    // Check if we're offline
    if (!navigator.onLine) {
      console.log('Device is offline, checking offline storage for dates...');
      const offlineDates = getAvailableDatesOffline();

      if (offlineDates.length > 0) {
        console.log('Successfully loaded dates from offline storage');
        return offlineDates;
      }

      console.log('No offline dates found, falling back to mock dates');
      return ["2025-06-01", "2025-06-02"]; // Return mock dates as fallback
    }

    // First, get dates from standardized files
    const standardizedDates = await getAvailableDates();

    if (standardizedDates.length > 0) {
      return standardizedDates;
    }

    // If no standardized dates, try Supabase
    const { data, error } = await supabase
      .from('itinerary_days')
      .select('date')
      .order('date');

    if (error) {
      console.warn('Error fetching dates from Supabase:', error);

      // Check offline storage before falling back to mock dates
      const offlineDates = getAvailableDatesOffline();
      if (offlineDates.length > 0) {
        console.log('Found dates in offline storage');
        return offlineDates;
      }

      return ["2025-06-01", "2025-06-02"]; // Return mock dates as fallback
    }

    if (!data || data.length === 0) {
      console.warn('No dates found in Supabase');

      // Check offline storage before falling back to mock dates
      const offlineDates = getAvailableDatesOffline();
      if (offlineDates.length > 0) {
        console.log('Found dates in offline storage');
        return offlineDates;
      }

      return ["2025-06-01", "2025-06-02"]; // Return mock dates as fallback
    }

    return data.map(item => item.date);
  } catch (error) {
    console.error('Error getting available dates:', error);

    // Check offline storage before falling back to mock dates
    const offlineDates = getAvailableDatesOffline();
    if (offlineDates.length > 0) {
      console.log('Found dates in offline storage');
      return offlineDates;
    }

    return ["2025-06-01", "2025-06-02"]; // Return mock dates as fallback
  }
}

/**
 * Creates a new itinerary day
 *
 * @param tripId - The ID of the trip to associate with
 * @param data - The itinerary data to create
 * @returns Promise resolving to the created itinerary day
 */
export async function createItinerary(tripId: string, data: Partial<DayProgram>): Promise<DayProgram> {
  try {
    // Check if we're online
    if (!navigator.onLine) {
      throw new Error('Cannot create itinerary while offline');
    }

    // Generate a UUID for the new itinerary day
    const dayId = crypto.randomUUID();

    // Insert the itinerary day
    const { data: dayData, error: dayError } = await supabase
      .from('itinerary_days')
      .insert({
        id: dayId,
        trip_id: tripId,
        date: data.date,
        title: data.title || `Itinerary for ${data.date}`,
        summary: data.summary || '',
        source: 'api_creation',
        version: '1.0',
        timezone: 'America/New_York',
        additional_data: {}
      })
      .select()
      .single();

    if (dayError) {
      throw dayError;
    }

    // Insert weather if available
    if (data.weather) {
      const { error: weatherError } = await supabase
        .from('weather')
        .insert({
          itinerary_day_id: dayId,
          temperature: data.weather.temperature,
          condition: data.weather.condition,
          icon: data.weather.icon
        });

      if (weatherError) {
        console.warn('Error creating weather:', weatherError);
        // Continue without weather
      }
    }

    // Insert reminders if available
    if (data.reminders && data.reminders.length > 0) {
      const remindersToInsert = data.reminders.map(text => ({
        itinerary_day_id: dayId,
        text
      }));

      const { error: remindersError } = await supabase
        .from('reminders')
        .insert(remindersToInsert);

      if (remindersError) {
        console.warn('Error creating reminders:', remindersError);
        // Continue without reminders
      }
    }

    // Insert activities if available
    if (data.items && data.items.length > 0) {
      for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];

        // Insert the activity
        const { data: activityData, error: activityError } = await supabase
          .from('activities')
          .insert({
            id: item.id || crypto.randomUUID(),
            itinerary_day_id: dayId,
            type: item.type,
            title: item.title,
            time: item.time,
            duration: item.duration || null,
            notes: item.notes || null,
            status: item.status || 'pending',
            important: item.important || false,
            requires_confirmation: item.requiresConfirmation || false,
            is_group_event: item.isGroupEvent || false,
            sequence_order: i
          })
          .select()
          .single();

        if (activityError) {
          console.warn('Error creating activity:', activityError);
          continue; // Skip to the next activity
        }

        // Insert location if available
        if (item.location) {
          const { error: locationError } = await supabase
            .from('locations')
            .insert({
              activity_id: activityData.id,
              name: item.location.name,
              address: item.location.address || null,
              latitude: item.location.lat || 0,
              longitude: item.location.lng || 0,
              contact: item.location.contact || null,
              confirmation_number: item.location.confirmationNumber || null,
              website: item.location.website || null,
              map_url: item.location.mapUrl || null,
              venue_type: item.location.venueType || null
            });

          if (locationError) {
            console.warn('Error creating location:', locationError);
            // Continue without location
          }
        }

        // Insert transport details if available
        if (item.transport) {
          const { error: transportError } = await supabase
            .from('transport_details')
            .insert({
              activity_id: activityData.id,
              mode: item.transport.mode,
              carrier: item.transport.carrier || null,
              booking_reference: item.transport.bookingReference || null,
              pickup_time: item.transport.pickup_time || null,
              pickup_location: item.transport.pickup_location || null,
              estimated_cost: item.transport.estimated_cost || null,
              notes: item.transport.notes || null
            });

          if (transportError) {
            console.warn('Error creating transport details:', transportError);
            // Continue without transport details
          }
        }
      }
    }

    // Fetch the created itinerary
    return await fetchItinerary(data.date as string);
  } catch (error) {
    console.error('Error creating itinerary:', error);
    throw error;
  }
}

/**
 * Updates an existing itinerary day
 *
 * @param date - The date of the itinerary to update
 * @param data - The updated itinerary data
 * @returns Promise resolving to the updated itinerary day
 */
export async function updateItinerary(date: string, data: Partial<DayProgram>): Promise<DayProgram> {
  try {
    // Check if we're online
    if (!navigator.onLine) {
      // Save to offline storage and queue for sync
      const currentData = await fetchItinerary(date);
      const updatedData = { ...currentData, ...data };
      saveItineraryOffline(date, updatedData);
      return updatedData;
    }

    // Find the itinerary day ID
    const { data: days, error: daysError } = await supabase
      .from('itinerary_days')
      .select('id')
      .eq('date', date)
      .limit(1);

    if (daysError) {
      throw daysError;
    }

    if (!days || days.length === 0) {
      throw new Error(`No itinerary found for date: ${date}`);
    }

    const dayId = days[0].id;

    // Update the itinerary day
    const { error: updateError } = await supabase
      .from('itinerary_days')
      .update({
        title: data.title,
        summary: data.summary,
        updated_at: new Date().toISOString()
      })
      .eq('id', dayId);

    if (updateError) {
      throw updateError;
    }

    // Update weather if available
    if (data.weather) {
      // Check if weather exists
      const { data: existingWeather, error: weatherCheckError } = await supabase
        .from('weather')
        .select('id')
        .eq('itinerary_day_id', dayId)
        .limit(1);

      if (weatherCheckError) {
        console.warn('Error checking weather:', weatherCheckError);
      } else {
        if (existingWeather && existingWeather.length > 0) {
          // Update existing weather
          const { error: weatherUpdateError } = await supabase
            .from('weather')
            .update({
              temperature: data.weather.temperature,
              condition: data.weather.condition,
              icon: data.weather.icon,
              updated_at: new Date().toISOString()
            })
            .eq('itinerary_day_id', dayId);

          if (weatherUpdateError) {
            console.warn('Error updating weather:', weatherUpdateError);
          }
        } else {
          // Insert new weather
          const { error: weatherInsertError } = await supabase
            .from('weather')
            .insert({
              itinerary_day_id: dayId,
              temperature: data.weather.temperature,
              condition: data.weather.condition,
              icon: data.weather.icon
            });

          if (weatherInsertError) {
            console.warn('Error creating weather:', weatherInsertError);
          }
        }
      }
    }

    // Update reminders if available
    if (data.reminders) {
      // Delete existing reminders
      const { error: deleteRemindersError } = await supabase
        .from('reminders')
        .delete()
        .eq('itinerary_day_id', dayId);

      if (deleteRemindersError) {
        console.warn('Error deleting reminders:', deleteRemindersError);
      } else if (data.reminders.length > 0) {
        // Insert new reminders
        const remindersToInsert = data.reminders.map(text => ({
          itinerary_day_id: dayId,
          text
        }));

        const { error: remindersInsertError } = await supabase
          .from('reminders')
          .insert(remindersToInsert);

        if (remindersInsertError) {
          console.warn('Error creating reminders:', remindersInsertError);
        }
      }
    }

    // Fetch the updated itinerary
    return await fetchItinerary(date);
  } catch (error) {
    console.error('Error updating itinerary:', error);
    throw error;
  }
}

/**
 * Deletes an itinerary day
 *
 * @param date - The date of the itinerary to delete
 * @returns Promise resolving to a success message
 */
export async function deleteItinerary(date: string): Promise<{ success: boolean, message: string }> {
  try {
    // Check if we're online
    if (!navigator.onLine) {
      throw new Error('Cannot delete itinerary while offline');
    }

    // Find the itinerary day ID
    const { data: days, error: daysError } = await supabase
      .from('itinerary_days')
      .select('id')
      .eq('date', date)
      .limit(1);

    if (daysError) {
      throw daysError;
    }

    if (!days || days.length === 0) {
      throw new Error(`No itinerary found for date: ${date}`);
    }

    const dayId = days[0].id;

    // Delete the itinerary day (cascade will delete related records)
    const { error: deleteError } = await supabase
      .from('itinerary_days')
      .delete()
      .eq('id', dayId);

    if (deleteError) {
      throw deleteError;
    }

    return {
      success: true,
      message: `Itinerary for ${date} deleted successfully`
    };
  } catch (error: any) {
    console.error('Error deleting itinerary:', error);
    return {
      success: false,
      message: error.message || 'Failed to delete itinerary'
    };
  }
}