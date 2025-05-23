/**
 * Utilities for synchronizing data between local storage and Supabase
 */

import { supabase } from '../lib/supabase';
import type { DayProgram } from '../lib/types';

// Constants
const SYNC_QUEUE_KEY = 'world_cup_sync_queue';
const OFFLINE_DATA_KEY = 'world_cup_offline_data';

// Types
interface SyncQueueItem {
  id: string;
  operation: 'create' | 'update' | 'delete';
  table: string;
  data: any;
  timestamp: number;
}

interface OfflineData {
  itineraries: Record<string, DayProgram>;
  lastSynced: number;
}

/**
 * Initializes the offline data store
 */
export function initOfflineStore(): OfflineData {
  const existingData = localStorage.getItem(OFFLINE_DATA_KEY);

  if (existingData) {
    return JSON.parse(existingData);
  }

  const initialData: OfflineData = {
    itineraries: {},
    lastSynced: Date.now()
  };

  localStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(initialData));
  return initialData;
}

/**
 * Saves an itinerary to the offline store
 *
 * @param date - The date of the itinerary
 * @param data - The itinerary data
 */
export function saveItineraryOffline(date: string, data: DayProgram): void {
  const offlineData = getOfflineData();

  offlineData.itineraries[date] = {
    ...data,
    _source: 'offline' as const
  };

  localStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(offlineData));

  // Add to sync queue
  addToSyncQueue({
    id: crypto.randomUUID(),
    operation: 'update',
    table: 'itineraries',
    data: { date, itinerary: data },
    timestamp: Date.now()
  });
}

/**
 * Gets an itinerary from the offline store
 *
 * @param date - The date of the itinerary
 * @returns The itinerary data or null if not found
 */
export function getItineraryOffline(date: string): DayProgram | null {
  const offlineData = getOfflineData();
  return offlineData.itineraries[date] || null;
}

/**
 * Gets all available dates from the offline store
 *
 * @returns Array of date strings
 */
export function getAvailableDatesOffline(): string[] {
  const offlineData = getOfflineData();
  return Object.keys(offlineData.itineraries).sort();
}

/**
 * Gets the offline data store
 *
 * @returns The offline data
 */
function getOfflineData(): OfflineData {
  const data = localStorage.getItem(OFFLINE_DATA_KEY);
  return data ? JSON.parse(data) : initOfflineStore();
}

/**
 * Adds an item to the sync queue
 *
 * @param item - The item to add to the queue
 */
function addToSyncQueue(item: SyncQueueItem): void {
  const queue = getSyncQueue();
  queue.push(item);
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
}

/**
 * Gets the sync queue
 *
 * @returns The sync queue
 */
function getSyncQueue(): SyncQueueItem[] {
  const queue = localStorage.getItem(SYNC_QUEUE_KEY);
  return queue ? JSON.parse(queue) : [];
}

/**
 * Processes the sync queue
 *
 * @returns A summary of the sync results
 */
export async function processSyncQueue(): Promise<{
  success: number;
  failed: number;
  remaining: number;
}> {
  const queue = getSyncQueue();
  const results = {
    success: 0,
    failed: 0,
    remaining: queue.length
  };

  if (queue.length === 0) {
    return results;
  }

  // Check if online
  if (!navigator.onLine) {
    return results;
  }

  // Process each item in the queue
  const newQueue: SyncQueueItem[] = [];

  for (const item of queue) {
    try {
      await syncItem(item);
      results.success++;
      results.remaining--;
    } catch (error) {
      console.error('Error syncing item:', error);
      results.failed++;
      newQueue.push(item);
    }
  }

  // Update the queue
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(newQueue));

  // Update last synced timestamp
  const offlineData = getOfflineData();
  offlineData.lastSynced = Date.now();
  localStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(offlineData));

  return results;
}

/**
 * Syncs a single item from the queue
 *
 * @param item - The item to sync
 */
async function syncItem(item: SyncQueueItem): Promise<void> {
  // Handle based on operation type
  switch (item.operation) {
    case 'create':
    case 'update':
      if (item.table === 'itineraries') {
        await syncItinerary(item.data.date, item.data.itinerary);
      }
      break;
    case 'delete':
      // Not implemented yet
      break;
  }
}

/**
 * Syncs an itinerary with Supabase
 *
 * @param date - The date of the itinerary
 * @param itinerary - The itinerary data
 */
async function syncItinerary(date: string, itinerary: DayProgram): Promise<void> {
  // First, check if this itinerary exists in Supabase
  const { data: days, error: daysError } = await supabase
    .from('itinerary_days')
    .select('id')
    .eq('date', date)
    .limit(1);

  if (daysError) {
    throw daysError;
  }

  if (days && days.length > 0) {
    // Update existing itinerary
    const dayId = days[0].id;

    // Update the itinerary day
    const { error: updateError } = await supabase
      .from('itinerary_days')
      .update({
        title: itinerary.title,
        summary: itinerary.summary,
        updated_at: new Date().toISOString()
      })
      .eq('id', dayId);

    if (updateError) {
      throw updateError;
    }

    // Update other related data as needed
    // This is a simplified example - a full implementation would update all related tables
  } else {
    // This is a new itinerary - would need to create it in Supabase
    // This would require a more complex implementation to create all related records
    console.warn('Creating new itineraries from offline data is not yet implemented');
  }
}
