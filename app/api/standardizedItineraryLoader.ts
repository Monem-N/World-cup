/**
 * Standardized Itinerary Loader
 * 
 * This module provides functions to load itinerary data from the standardized JSON files.
 */

import type { DayProgram, Activity, WeatherInfo } from '../lib/types';
import fs from 'fs';
import path from 'path';

// Directory containing standardized itinerary files
const STANDARDIZED_DIR = 'doc/itineraires/standardized';

/**
 * Loads a standardized itinerary file for a specific date
 * 
 * @param date - Date string in YYYY-MM-DD format
 * @returns Promise resolving to the DayProgram for the specified date
 */
export async function loadStandardizedItinerary(date: string): Promise<DayProgram | null> {
  try {
    // Find the file that matches the date
    const files = fs.readdirSync(STANDARDIZED_DIR);
    const matchingFile = files.find(file => file.includes(date) && file.endsWith('.json'));
    
    if (!matchingFile) {
      console.warn(`No standardized itinerary file found for date: ${date}`);
      return null;
    }
    
    // Read and parse the file
    const filePath = path.join(STANDARDIZED_DIR, matchingFile);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const standardizedData = JSON.parse(fileContent);
    
    // Convert to DayProgram format
    return convertToDayProgram(standardizedData);
  } catch (error) {
    console.error(`Error loading standardized itinerary for date ${date}:`, error);
    return null;
  }
}

/**
 * Converts standardized itinerary data to the DayProgram format used by the application
 * 
 * @param standardizedData - Data from standardized JSON file
 * @returns DayProgram object
 */
function convertToDayProgram(standardizedData: any): DayProgram {
  // Create weather info if available
  let weatherInfo: WeatherInfo | undefined = undefined;
  if (standardizedData.weather) {
    weatherInfo = {
      date: standardizedData.date,
      temperature: standardizedData.weather.temperature,
      condition: standardizedData.weather.condition || '',
      icon: standardizedData.weather.icon || ''
    };
  }
  
  // Convert activities
  const activities: Activity[] = standardizedData.activities?.map((activity: any) => {
    // Create location object if available
    const location = activity.location ? {
      name: activity.location.name,
      lat: activity.location.latitude,
      lng: activity.location.longitude,
      address: activity.location.address,
      contact: activity.location.contact,
      confirmationNumber: activity.location.confirmation_number,
      website: activity.location.website,
      mapUrl: activity.location.map_url,
      venueType: activity.location.venue_type
    } : undefined;
    
    // Create transport object if available
    const transport = activity.transport ? {
      mode: activity.transport.mode,
      carrier: activity.transport.carrier,
      bookingReference: activity.transport.booking_reference,
      seatMap: activity.transport.seat_map,
      pickup_time: activity.transport.pickup_time,
      pickup_location: activity.transport.pickup_location,
      estimated_cost: activity.transport.estimated_cost,
      shared_with: activity.transport.shared_with,
      notes: activity.transport.notes
    } : undefined;
    
    // Create attachments array if available
    const attachments = activity.attachments?.map((att: any) => att.file_name) || undefined;
    
    // Return the activity in the format expected by the application
    return {
      id: activity.id,
      type: activity.type,
      title: activity.title,
      time: activity.time.substring(0, 5), // Convert HH:MM:SS to HH:MM
      duration: activity.duration,
      location,
      transport,
      notes: activity.notes,
      attachments,
      status: activity.status,
      important: activity.important,
      requiresConfirmation: activity.requires_confirmation,
      isGroupEvent: activity.is_group_event,
      // Store original ID if it exists
      original_id: activity.original_id
    };
  }) || [];
  
  // Extract additional data from metadata if available
  const additionalData = standardizedData.metadata?.additional_data || {};
  
  // Return the DayProgram
  return {
    date: standardizedData.date,
    title: standardizedData.title,
    summary: standardizedData.summary || '',
    weather: weatherInfo,
    reminders: standardizedData.reminders || [],
    docs: standardizedData.documents?.map((doc: any) => doc.file_name) || [],
    items: activities,
    _source: 'standardized',
    // Store additional data that might be useful
    _additionalData: additionalData
  };
}

/**
 * Gets all available dates from standardized itinerary files
 * 
 * @returns Array of date strings in YYYY-MM-DD format
 */
export function getAvailableDates(): string[] {
  try {
    const files = fs.readdirSync(STANDARDIZED_DIR);
    const dates = files
      .filter(file => file.endsWith('.json') && !file.includes('validation_errors'))
      .map(file => {
        // Extract date from filename (assuming format like "14-06_2025-06-14.json")
        const match = file.match(/(\d{4}-\d{2}-\d{2})\.json$/);
        return match ? match[1] : null;
      })
      .filter((date): date is string => date !== null)
      .sort();
    
    return dates;
  } catch (error) {
    console.error('Error getting available dates:', error);
    return [];
  }
}
