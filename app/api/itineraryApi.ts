import type { DayProgram, WeatherInfo } from '../lib/types';
import { supabase } from '../lib/supabase';
import type { CompleteItineraryDay } from '../../src/types/database.types';

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

export async function fetchItinerary(date: string): Promise<DayProgram> {
  console.log(`Fetching itinerary data for date: ${date}`);

  try {
    // For testing purposes, let's directly query the itinerary_days table by date
    const { data: days, error: daysError } = await supabase
      .from('itinerary_days')
      .select('id')
      .eq('date', date)
      .limit(1);

    if (daysError) {
      console.warn(`Error querying itinerary days:`, daysError);
      console.log('Falling back to mock data');
      const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
      return { ...mockData, _source: 'mock' };
    }

    if (!days || days.length === 0) {
      console.warn(`No itinerary found for date: ${date}`);
      console.log('Falling back to mock data');
      const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
      return { ...mockData, _source: 'mock' };
    }

    const dayId = days[0].id;
    console.log(`Found itinerary day with ID: ${dayId}`);

    try {
      // Instead of using the RPC function, let's query the data directly
      console.log('Fetching day details directly...');

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

      // Weather is optional, so we don't throw on error

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
        console.log('Falling back to mock data');
        const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
        return { ...mockData, _source: 'mock' };
      }

      // Transform the data from Supabase format to DayProgram format
      return {
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
        _source: 'supabase' // Indicate this data came from Supabase
      };
    } catch (queryError) {
      console.error('Error with direct queries:', queryError);
      console.log('Trying RPC function as fallback...');

      // Try the RPC function as a fallback
      const { data, error } = await supabase
        .rpc('get_itinerary_day', { day_id: dayId });

      if (error) {
        console.warn('Error fetching itinerary day details:', error);
        console.log('Falling back to mock data');
        const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
        return { ...mockData, _source: 'mock' };
      }

      if (!data) {
        console.warn('No data returned from get_itinerary_day function');
        console.log('Falling back to mock data');
        const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
        return { ...mockData, _source: 'mock' };
      }

      // Return the data from the RPC function
      return {
        ...data,
        _source: 'supabase-rpc'
      };
    }

    // This code is unreachable - we need to remove it
    // The function will return from either the try block or the catch block above
    /*
    console.log('Successfully fetched data from Supabase');

    // Transform the data from Supabase format to DayProgram format
    const itineraryDay = data as CompleteItineraryDay;

    return {
      date: itineraryDay.date,
      title: itineraryDay.title,
      summary: itineraryDay.summary || '',
      weather: itineraryDay.weather ? {
        date: itineraryDay.date,
        temperature: itineraryDay.weather.temperature,
        condition: itineraryDay.weather.condition,
        icon: itineraryDay.weather.icon
      } : undefined,
      reminders: itineraryDay.reminders || [],
      docs: itineraryDay.docs || [],
      items: itineraryDay.items ? itineraryDay.items.map((item: any) => ({
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
      })) : [],
      _source: 'supabase' // Indicate this data came from Supabase
    };
    */
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    console.log('Falling back to mock data');
    const mockData = date === "2025-06-01" ? mockDayProgramDay1 : mockDayProgramDay2;
    return { ...mockData, _source: 'mock' };
  }
}
