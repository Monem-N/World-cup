import { supabase } from '../lib/supabase';
import type { Trip } from '../../src/types/database.types';

export interface CreateTripParams {
  title: string;
  destination: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
}

export interface UpdateTripParams {
  id: string;
  title?: string;
  destination?: string;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
}

// Get all trips for the current user
export async function getTrips(): Promise<Trip[]> {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .order('start_date', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
}

// Get a specific trip by ID
export async function getTrip(id: string): Promise<Trip> {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    if (!data) {
      throw new Error(`Trip with ID ${id} not found`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching trip with ID ${id}:`, error);
    throw error;
  }
}

// Create a new trip
export async function createTrip(params: CreateTripParams): Promise<Trip> {
  try {
    const { data, error } = await supabase
      .from('trips')
      .insert({
        title: params.title,
        destination: params.destination,
        start_date: params.startDate,
        end_date: params.endDate,
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
}

// Update an existing trip
export async function updateTrip(params: UpdateTripParams): Promise<Trip> {
  try {
    const updateData: any = {};
    
    if (params.title !== undefined) updateData.title = params.title;
    if (params.destination !== undefined) updateData.destination = params.destination;
    if (params.startDate !== undefined) updateData.start_date = params.startDate;
    if (params.endDate !== undefined) updateData.end_date = params.endDate;
    
    const { data, error } = await supabase
      .from('trips')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error updating trip with ID ${params.id}:`, error);
    throw error;
  }
}

// Delete a trip
export async function deleteTrip(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('trips')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting trip with ID ${id}:`, error);
    throw error;
  }
}
