-- functions.sql
-- This file contains functions and triggers for the World Cup Itinerary application
-- To use this file, run it in the Supabase SQL Editor after running schema.sql and rls.sql

-- Function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER set_updated_at_profiles
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_trips
BEFORE UPDATE ON public.trips
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_itinerary_days
BEFORE UPDATE ON public.itinerary_days
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_activities
BEFORE UPDATE ON public.activities
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_locations
BEFORE UPDATE ON public.locations
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_transport_details
BEFORE UPDATE ON public.transport_details
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_weather
BEFORE UPDATE ON public.weather
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_travel_essentials
BEFORE UPDATE ON public.travel_essentials
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to create a user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (NEW.id, NEW.email, '');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create a user profile after signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get a complete itinerary day with all related data
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
    'docs', (
      SELECT jsonb_agg(d.file_name)
      FROM public.documents d
      WHERE d.itinerary_day_id = id.id
    ),
    'items', (
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
          'location', (
            SELECT jsonb_build_object(
              'name', l.name,
              'address', l.address,
              'lat', l.latitude,
              'lng', l.longitude,
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
            SELECT jsonb_agg(at.file_name)
            FROM public.attachments at
            WHERE at.activity_id = a.id
          )
        )
      )
      FROM public.activities a
      WHERE a.itinerary_day_id = id.id
      ORDER BY a.sequence_order
    )
  ) INTO result
  FROM public.itinerary_days id
  WHERE id.id = day_id;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
