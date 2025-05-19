import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { fetchItinerary } from '../api/itineraryApi';
import { getTrips, createTrip } from '../api/tripApi';
import type { Trip } from '../../src/types/database.types';
import type { DayProgram } from '../lib/types';

export default function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Testing Supabase connection...');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [itinerary, setItinerary] = useState<DayProgram | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test Supabase connection
        const { data, error } = await supabase.from('trips').select('count');
        
        if (error) {
          throw error;
        }
        
        setStatus('success');
        setMessage(`Successfully connected to Supabase! Found ${data[0]?.count || 0} trips.`);
        
        // Try to fetch trips
        const tripsData = await getTrips();
        setTrips(tripsData);
        
        // Try to fetch itinerary for a specific date
        if (tripsData.length > 0) {
          const itineraryData = await fetchItinerary('2025-06-02');
          setItinerary(itineraryData);
        }
      } catch (err: any) {
        setStatus('error');
        setMessage(`Error connecting to Supabase: ${err.message}`);
        setError(err.message);
      }
    }
    
    testConnection();
  }, []);
  
  const handleCreateTrip = async () => {
    try {
      setStatus('loading');
      setMessage('Creating a new trip...');
      
      const newTrip = await createTrip({
        title: 'Test Trip',
        destination: 'Test Destination',
        startDate: '2025-07-01',
        endDate: '2025-07-10',
      });
      
      setStatus('success');
      setMessage(`Successfully created trip: ${newTrip.title}`);
      
      // Refresh trips list
      const tripsData = await getTrips();
      setTrips(tripsData);
    } catch (err: any) {
      setStatus('error');
      setMessage(`Error creating trip: ${err.message}`);
      setError(err.message);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Supabase Integration Test</h2>
      
      <div className={`p-3 mb-4 rounded ${
        status === 'loading' ? 'bg-blue-100' : 
        status === 'success' ? 'bg-green-100' : 
        'bg-red-100'
      }`}>
        <p className="font-medium">
          Status: {status}
        </p>
        <p>
          {message}
        </p>
        {error && (
          <p className="text-red-600 mt-2">
            {error}
          </p>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Trips</h3>
        {trips.length === 0 ? (
          <p>No trips found.</p>
        ) : (
          <ul className="list-disc pl-5">
            {trips.map(trip => (
              <li key={trip.id}>
                {trip.title} - {trip.destination} ({trip.start_date} to {trip.end_date})
              </li>
            ))}
          </ul>
        )}
        
        <button
          onClick={handleCreateTrip}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={status === 'loading'}
        >
          Create Test Trip
        </button>
      </div>
      
      {itinerary && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Itinerary for {itinerary.date}</h3>
          <p><strong>Title:</strong> {itinerary.title}</p>
          <p><strong>Summary:</strong> {itinerary.summary}</p>
          
          <h4 className="font-medium mt-2">Activities:</h4>
          <ul className="list-disc pl-5">
            {itinerary.items.map(item => (
              <li key={item.id}>
                {item.time} - {item.title} ({item.type})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
