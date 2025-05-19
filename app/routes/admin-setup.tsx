import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../src/types/database.types';

// WARNING: This component is for development/testing only
// It uses a service role key which has admin privileges
// NEVER expose this key in production code or commit it to version control

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [serviceKey, setServiceKey] = useState('');
  
  const handleSetupData = async () => {
    if (!serviceKey) {
      setError('Please enter your service role key');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Create a Supabase client with the service role key
      const supabaseAdmin = createClient<Database>(
        import.meta.env.VITE_SUPABASE_URL as string,
        serviceKey
      );
      
      // Insert a sample trip
      const { data: tripData, error: tripError } = await supabaseAdmin
        .from('trips')
        .insert({
          title: 'World Cup 2025',
          destination: 'New Jersey, USA',
          start_date: '2025-06-01',
          end_date: '2025-06-10',
          user_id: '00000000-0000-0000-0000-000000000000' // This will be replaced
        })
        .select()
        .single();
      
      if (tripError) throw tripError;
      
      // Insert a sample itinerary day
      const { data: dayData, error: dayError } = await supabaseAdmin
        .from('itinerary_days')
        .insert({
          trip_id: tripData.id,
          date: '2025-06-01',
          title: 'Arrival Day',
          summary: 'Arrive in New Jersey and check in to the hotel.'
        })
        .select()
        .single();
      
      if (dayError) throw dayError;
      
      // Insert sample activities
      const { error: activitiesError } = await supabaseAdmin
        .from('activities')
        .insert([
          {
            itinerary_day_id: dayData.id,
            type: 'transport',
            title: 'Flight to New York',
            time: '09:00:00',
            duration: '8h',
            notes: 'Check in online beforehand.',
            status: 'completed',
            sequence_order: 1
          },
          {
            itinerary_day_id: dayData.id,
            type: 'meal',
            title: 'Lunch at Airport',
            time: '14:30:00',
            duration: '1h',
            notes: 'After immigration',
            status: 'pending',
            sequence_order: 2
          },
          {
            itinerary_day_id: dayData.id,
            type: 'transport',
            title: 'Transfer to Hotel',
            time: '16:00:00',
            duration: '1h',
            status: 'pending',
            sequence_order: 3
          },
          {
            itinerary_day_id: dayData.id,
            type: 'hotel',
            title: 'Check-in at Hotel',
            time: '17:30:00',
            notes: 'Early check-in requested.',
            status: 'pending',
            sequence_order: 4
          }
        ]);
      
      if (activitiesError) throw activitiesError;
      
      setSuccess('Sample data created successfully! Try visiting /itinerary/2025-06-01 now.');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Admin Setup</h1>
      
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
        <p className="font-bold">Warning!</p>
        <p>This page is for development/testing only. It uses a service role key which has admin privileges.</p>
        <p>Never expose this key in production code or commit it to version control.</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="serviceKey" className="block text-sm font-medium text-gray-700">
            Supabase Service Role Key
          </label>
          <input
            id="serviceKey"
            type="password"
            value={serviceKey}
            onChange={(e) => setServiceKey(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your service role key"
          />
          <p className="mt-1 text-sm text-gray-500">
            You can find this in your Supabase dashboard under Project Settings &gt; API
          </p>
        </div>
        
        <button
          onClick={handleSetupData}
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Setting up...' : 'Set Up Sample Data'}
        </button>
      </div>
    </div>
  );
}
