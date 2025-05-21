/**
 * API route for getting available itinerary dates
 */

import { getAvailableDates } from '~/server/itineraryServer';

// Helper function to create JSON responses
function json(data: any, options: { status?: number } = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: options.status || 200,
  });
}

export async function loader() {
  try {
    const dates = await getAvailableDates();
    return json(dates);
  } catch (error) {
    console.error('Error loading itinerary dates:', error);
    return json([], { status: 500 });
  }
}
