import { supabase } from '../lib/supabase';
import type { Activity } from '../../src/types/database.types';

// Update activity status
export async function updateActivityStatus(
  activityId: string, 
  status: 'pending' | 'confirmed' | 'completed'
): Promise<Activity> {
  try {
    const { data, error } = await supabase
      .from('activities')
      .update({ status })
      .eq('id', activityId)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error updating activity status for ID ${activityId}:`, error);
    throw error;
  }
}

// Create a new activity
export async function createActivity(
  itineraryDayId: string,
  activity: {
    type: 'transport' | 'match' | 'meal' | 'hotel' | 'activity';
    title: string;
    time: string;
    duration?: string;
    notes?: string;
    status?: 'pending' | 'confirmed' | 'completed';
    important?: boolean;
    requires_confirmation?: boolean;
    is_group_event?: boolean;
    sequence_order: number;
    location?: {
      name: string;
      address?: string;
      latitude: number;
      longitude: number;
      contact?: string;
      confirmation_number?: string;
      website?: string;
      map_url?: string;
      venue_type?: string;
    };
    transport?: {
      mode: string;
      carrier?: string;
      booking_reference?: string;
      pickup_time?: string;
      pickup_location?: string;
      estimated_cost?: number;
      notes?: string;
    };
  }
): Promise<Activity> {
  try {
    // Start a transaction
    const { data: activityData, error: activityError } = await supabase
      .from('activities')
      .insert({
        itinerary_day_id: itineraryDayId,
        type: activity.type,
        title: activity.title,
        time: activity.time,
        duration: activity.duration,
        notes: activity.notes,
        status: activity.status || 'pending',
        important: activity.important,
        requires_confirmation: activity.requires_confirmation,
        is_group_event: activity.is_group_event,
        sequence_order: activity.sequence_order,
      })
      .select()
      .single();
    
    if (activityError) {
      throw activityError;
    }
    
    const activityId = activityData.id;
    
    // Insert location if provided
    if (activity.location) {
      const { error: locationError } = await supabase
        .from('locations')
        .insert({
          activity_id: activityId,
          name: activity.location.name,
          address: activity.location.address,
          latitude: activity.location.latitude,
          longitude: activity.location.longitude,
          contact: activity.location.contact,
          confirmation_number: activity.location.confirmation_number,
          website: activity.location.website,
          map_url: activity.location.map_url,
          venue_type: activity.location.venue_type,
        });
      
      if (locationError) {
        throw locationError;
      }
    }
    
    // Insert transport details if provided
    if (activity.transport) {
      const { error: transportError } = await supabase
        .from('transport_details')
        .insert({
          activity_id: activityId,
          mode: activity.transport.mode,
          carrier: activity.transport.carrier,
          booking_reference: activity.transport.booking_reference,
          pickup_time: activity.transport.pickup_time,
          pickup_location: activity.transport.pickup_location,
          estimated_cost: activity.transport.estimated_cost,
          notes: activity.transport.notes,
        });
      
      if (transportError) {
        throw transportError;
      }
    }
    
    return activityData;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
}

// Delete an activity
export async function deleteActivity(activityId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', activityId);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting activity with ID ${activityId}:`, error);
    throw error;
  }
}
