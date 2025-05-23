/**
 * Utilities for migrating data from standardized JSON files to Supabase
 */

import fs from 'fs';
import path from 'path';
import { supabase } from '../lib/supabase';
import type { Database } from '../../src/types/database.types';

// Directory containing standardized itinerary files
const STANDARDIZED_DIR = path.join(process.cwd(), 'doc/itineraires/standardized');

/**
 * Migrates all standardized JSON files to Supabase
 * 
 * @param userId - The user ID to associate the data with
 * @returns A summary of the migration results
 */
export async function migrateAllToSupabase(userId: string) {
  try {
    // Get all standardized JSON files
    const files = fs.readdirSync(STANDARDIZED_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json') && !file.includes('validation_errors'));
    
    // Initialize results
    const results = {
      total: jsonFiles.length,
      success: 0,
      failed: 0,
      errors: [] as string[]
    };
    
    // Create a trip to associate all itineraries with
    const { data: tripData, error: tripError } = await supabase
      .from('trips')
      .insert({
        user_id: userId,
        title: 'World Cup 2025',
        destination: 'New Jersey, USA',
        start_date: '2025-06-01',
        end_date: '2025-06-30',
      })
      .select()
      .single();
    
    if (tripError) {
      throw new Error(`Error creating trip: ${tripError.message}`);
    }
    
    const tripId = tripData.id;
    
    // Process each file
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(STANDARDIZED_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);
        
        // Migrate this itinerary day
        await migrateItineraryDay(data, tripId, userId);
        
        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(`Error migrating ${file}: ${error.message}`);
      }
    }
    
    return results;
  } catch (error: any) {
    throw new Error(`Migration failed: ${error.message}`);
  }
}

/**
 * Migrates a single itinerary day to Supabase
 * 
 * @param data - The standardized itinerary day data
 * @param tripId - The ID of the trip to associate with
 * @param userId - The user ID to associate the data with
 */
async function migrateItineraryDay(data: any, tripId: string, userId: string) {
  // Start a transaction
  const { error: transactionError } = await supabase.rpc('begin_transaction');
  if (transactionError) throw transactionError;
  
  try {
    // Insert the itinerary day
    const { data: dayData, error: dayError } = await supabase
      .from('itinerary_days')
      .insert({
        id: data.id,
        trip_id: tripId,
        date: data.date,
        title: data.title,
        summary: data.summary || null,
        source: data.metadata?.source || 'json_migration',
        version: data.metadata?.version || '1.0',
        timezone: data.metadata?.timezone || 'America/New_York',
        additional_data: data.metadata?.additional_data || {}
      })
      .select()
      .single();
    
    if (dayError) throw dayError;
    
    // Insert weather if available
    if (data.weather) {
      const { error: weatherError } = await supabase
        .from('weather')
        .insert({
          itinerary_day_id: dayData.id,
          temperature: data.weather.temperature,
          condition: data.weather.condition,
          icon: data.weather.icon
        });
      
      if (weatherError) throw weatherError;
    }
    
    // Insert reminders if available
    if (data.reminders && data.reminders.length > 0) {
      const remindersToInsert = data.reminders.map((text: string) => ({
        itinerary_day_id: dayData.id,
        text
      }));
      
      const { error: remindersError } = await supabase
        .from('reminders')
        .insert(remindersToInsert);
      
      if (remindersError) throw remindersError;
    }
    
    // Insert documents if available
    if (data.documents && data.documents.length > 0) {
      const documentsToInsert = data.documents.map((doc: any) => ({
        itinerary_day_id: dayData.id,
        file_name: doc.file_name,
        file_path: doc.file_path || '',
        file_type: doc.file_type || null
      }));
      
      const { error: documentsError } = await supabase
        .from('documents')
        .insert(documentsToInsert);
      
      if (documentsError) throw documentsError;
    }
    
    // Insert activities if available
    if (data.activities && data.activities.length > 0) {
      for (const activity of data.activities) {
        // Insert the activity
        const { data: activityData, error: activityError } = await supabase
          .from('activities')
          .insert({
            id: activity.id,
            itinerary_day_id: dayData.id,
            type: activity.type,
            title: activity.title,
            time: activity.time,
            duration: activity.duration || null,
            notes: activity.notes || null,
            status: activity.status,
            important: activity.important || false,
            requires_confirmation: activity.requires_confirmation || false,
            is_group_event: activity.is_group_event || false,
            sequence_order: activity.sequence_order
          })
          .select()
          .single();
        
        if (activityError) throw activityError;
        
        // Insert location if available
        if (activity.location) {
          const { error: locationError } = await supabase
            .from('locations')
            .insert({
              activity_id: activityData.id,
              name: activity.location.name,
              address: activity.location.address || null,
              latitude: activity.location.latitude || 0,
              longitude: activity.location.longitude || 0,
              contact: activity.location.contact || null,
              confirmation_number: activity.location.confirmation_number || null,
              website: activity.location.website || null,
              map_url: activity.location.map_url || null,
              venue_type: activity.location.venue_type || null
            });
          
          if (locationError) throw locationError;
        }
        
        // Insert transport details if available
        if (activity.transport) {
          const { data: transportData, error: transportError } = await supabase
            .from('transport_details')
            .insert({
              activity_id: activityData.id,
              mode: activity.transport.mode,
              carrier: activity.transport.carrier || null,
              booking_reference: activity.transport.booking_reference || null,
              pickup_time: activity.transport.pickup_time || null,
              pickup_location: activity.transport.pickup_location || null,
              estimated_cost: activity.transport.estimated_cost || null,
              notes: activity.transport.notes || null
            })
            .select()
            .single();
          
          if (transportError) throw transportError;
          
          // Insert seat map if available
          if (activity.transport.seat_map) {
            const seatMapsToInsert = Object.entries(activity.transport.seat_map).map(([passenger, seat]) => ({
              transport_detail_id: transportData.id,
              passenger_name: passenger,
              seat_number: seat
            }));
            
            if (seatMapsToInsert.length > 0) {
              const { error: seatMapError } = await supabase
                .from('seat_maps')
                .insert(seatMapsToInsert);
              
              if (seatMapError) throw seatMapError;
            }
          }
          
          // Insert shared transport if available
          if (activity.transport.shared_with && activity.transport.shared_with.length > 0) {
            // For simplicity, we'll just associate with the current user
            const { error: sharedTransportError } = await supabase
              .from('shared_transport')
              .insert({
                transport_detail_id: transportData.id,
                user_id: userId
              });
            
            if (sharedTransportError) throw sharedTransportError;
          }
        }
        
        // Insert attachments if available
        if (activity.attachments && activity.attachments.length > 0) {
          const attachmentsToInsert = activity.attachments.map((attachment: any) => ({
            activity_id: activityData.id,
            file_name: attachment.file_name,
            file_path: attachment.file_path || '',
            file_type: attachment.file_type || null
          }));
          
          const { error: attachmentsError } = await supabase
            .from('attachments')
            .insert(attachmentsToInsert);
          
          if (attachmentsError) throw attachmentsError;
        }
      }
    }
    
    // Insert travel essentials if available
    if (data.travel_essentials && data.travel_essentials.length > 0) {
      const essentialsToInsert = data.travel_essentials.map((essential: any) => ({
        item_id: essential.id,
        itinerary_day_id: dayData.id,
        name: essential.name,
        category: essential.category || 'General',
        packed: essential.packed || false
      }));
      
      const { error: essentialsError } = await supabase
        .from('travel_essentials')
        .insert(essentialsToInsert);
      
      if (essentialsError) throw essentialsError;
    }
    
    // Commit the transaction
    const { error: commitError } = await supabase.rpc('commit_transaction');
    if (commitError) throw commitError;
    
  } catch (error) {
    // Rollback the transaction on error
    await supabase.rpc('rollback_transaction');
    throw error;
  }
}
