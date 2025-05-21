/**
 * Server-side functions for handling itinerary data
 */

import fs from 'fs';
import path from 'path';
import type { DayProgram } from '../lib/types';

// Directory containing standardized itinerary files
const STANDARDIZED_DIR = path.join(process.cwd(), 'doc/itineraires/standardized');

/**
 * Gets all available dates from standardized itinerary files
 *
 * @returns Array of date strings in YYYY-MM-DD format
 */
export async function getAvailableDates(): Promise<string[]> {
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

/**
 * Loads a standardized itinerary file for a specific date
 *
 * @param date - Date string in YYYY-MM-DD format
 * @returns The raw data from the standardized JSON file
 */
export function loadStandardizedItineraryRaw(date: string): any | null {
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
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading standardized itinerary for date ${date}:`, error);
    return null;
  }
}
