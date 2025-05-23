-- schema_updates.sql
-- This file contains updates to the database schema to align with the standardized JSON format
-- To use this file, run it in the Supabase SQL Editor after running schema.sql

-- Update activity_type enum to include 'accommodation'
ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'accommodation';

-- Add metadata fields to itinerary_days table
ALTER TABLE public.itinerary_days 
ADD COLUMN IF NOT EXISTS source TEXT,
ADD COLUMN IF NOT EXISTS version TEXT,
ADD COLUMN IF NOT EXISTS timezone TEXT,
ADD COLUMN IF NOT EXISTS additional_data JSONB;

-- Add travel_essentials relationship to itinerary_days
-- First, modify the travel_essentials table to reference itinerary_days instead of trips
ALTER TABLE public.travel_essentials 
DROP CONSTRAINT IF EXISTS travel_essentials_trip_id_fkey;

ALTER TABLE public.travel_essentials 
ADD COLUMN IF NOT EXISTS itinerary_day_id UUID REFERENCES public.itinerary_days(id) ON DELETE CASCADE;

-- Update the travel_essentials table to match the standardized schema
ALTER TABLE public.travel_essentials
ADD COLUMN IF NOT EXISTS item_id UUID DEFAULT uuid_generate_v4();

-- Create a function to get all travel essentials for a day
CREATE OR REPLACE FUNCTION public.get_travel_essentials(day_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check if the user owns this itinerary day
  IF NOT EXISTS (
    SELECT 1 FROM public.itinerary_days
    JOIN public.trips ON itinerary_days.trip_id = trips.id
    WHERE itinerary_days.id = day_id
    AND trips.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Get the travel essentials for this day
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', te.item_id,
      'name', te.name,
      'category', te.category,
      'packed', te.packed
    )
  ) INTO result
  FROM public.travel_essentials te
  WHERE te.itinerary_day_id = day_id;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the get_itinerary_day function to include travel_essentials
CREATE OR REPLACE FUNCTION public.get_itinerary_day(day_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check if the user owns this itinerary day
  IF NOT EXISTS (
    SELECT 1 FROM public.itinerary_days
    JOIN public.trips ON itinerary_days.trip_id = trips.id
    WHERE itinerary_days.id = day_id
    AND trips.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Get the itinerary day with all related data
  SELECT jsonb_build_object(
    'id', id.id,
    'trip_id', id.trip_id,
    'date', id.date,
    'title', id.title,
    'summary', id.summary,
    'weather', (
      SELECT jsonb_build_object(
        'temperature', w.temperature,
        'condition', w.condition,
        'icon', w.icon
      )
      FROM public.weather w
      WHERE w.itinerary_day_id = id.id
      LIMIT 1
    ),
    'reminders', (
      SELECT jsonb_agg(r.text)
      FROM public.reminders r
      WHERE r.itinerary_day_id = id.id
    ),
    'documents', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'file_name', d.file_name,
          'file_path', d.file_path,
          'file_type', d.file_type
        )
      )
      FROM public.documents d
      WHERE d.itinerary_day_id = id.id
    ),
    'activities', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', a.id,
          'type', a.type,
          'title', a.title,
          'time', a.time,
          'duration', a.duration,
          'notes', a.notes,
          'status', a.status,
          'important', a.important,
          'requires_confirmation', a.requires_confirmation,
          'is_group_event', a.is_group_event,
          'sequence_order', a.sequence_order,
          'location', (
            SELECT jsonb_build_object(
              'name', l.name,
              'address', l.address,
              'latitude', l.latitude,
              'longitude', l.longitude,
              'contact', l.contact,
              'confirmation_number', l.confirmation_number,
              'website', l.website,
              'map_url', l.map_url,
              'venue_type', l.venue_type
            )
            FROM public.locations l
            WHERE l.activity_id = a.id
            LIMIT 1
          ),
          'transport', (
            SELECT jsonb_build_object(
              'mode', td.mode,
              'carrier', td.carrier,
              'booking_reference', td.booking_reference,
              'pickup_time', td.pickup_time,
              'pickup_location', td.pickup_location,
              'estimated_cost', td.estimated_cost,
              'notes', td.notes,
              'seat_map', (
                SELECT jsonb_object_agg(sm.passenger_name, sm.seat_number)
                FROM public.seat_maps sm
                WHERE sm.transport_detail_id = td.id
              ),
              'shared_with', (
                SELECT jsonb_agg(p.username)
                FROM public.shared_transport st
                JOIN public.profiles p ON st.user_id = p.id
                WHERE st.transport_detail_id = td.id
              )
            )
            FROM public.transport_details td
            WHERE td.activity_id = a.id
            LIMIT 1
          ),
          'attachments', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'file_name', at.file_name,
                'file_path', at.file_path,
                'file_type', at.file_type
              )
            )
            FROM public.attachments at
            WHERE at.activity_id = a.id
          )
        )
      )
      FROM public.activities a
      WHERE a.itinerary_day_id = id.id
      ORDER BY a.sequence_order
    ),
    'travel_essentials', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', te.item_id,
          'name', te.name,
          'category', te.category,
          'packed', te.packed
        )
      )
      FROM public.travel_essentials te
      WHERE te.itinerary_day_id = id.id
    ),
    'metadata', (
      SELECT jsonb_build_object(
        'created_at', id.created_at,
        'updated_at', id.updated_at,
        'source', id.source,
        'version', id.version,
        'timezone', id.timezone,
        'additional_data', id.additional_data
      )
    )
  ) INTO result
  FROM public.itinerary_days id
  WHERE id.id = day_id;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
