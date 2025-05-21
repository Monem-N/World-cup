/**
 * API route for getting itinerary data for a specific date
 */

import type { LoaderFunctionArgs } from 'react-router-dom';
import { loadStandardizedItineraryRaw } from '~/server/itineraryServer';

// Helper function to create JSON responses
function json(data: any, options: { status?: number } = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: options.status || 200,
  });
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { date } = params;

  if (!date) {
    return json({ error: 'Date parameter is required' }, { status: 400 });
  }

  try {
    const rawData = loadStandardizedItineraryRaw(date);

    if (!rawData) {
      return json({ error: 'Itinerary not found' }, { status: 404 });
    }

    return json(rawData);
  } catch (error) {
    console.error(`Error loading itinerary for date ${date}:`, error);
    return json({ error: 'Failed to load itinerary' }, { status: 500 });
  }
}
