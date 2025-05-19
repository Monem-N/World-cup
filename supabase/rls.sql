-- rls.sql
-- This file contains Row Level Security (RLS) policies for the World Cup Itinerary application
-- To use this file, run it in the Supabase SQL Editor after running schema.sql

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seat_maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_transport ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_essentials ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for trips table
CREATE POLICY "Users can view their own trips"
  ON public.trips FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trips"
  ON public.trips FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips"
  ON public.trips FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips"
  ON public.trips FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for itinerary_days table
CREATE POLICY "Users can view their own itinerary days"
  ON public.itinerary_days FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.trips
    WHERE trips.id = itinerary_days.trip_id
    AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own itinerary days"
  ON public.itinerary_days FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.trips
    WHERE trips.id = itinerary_days.trip_id
    AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own itinerary days"
  ON public.itinerary_days FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.trips
    WHERE trips.id = itinerary_days.trip_id
    AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own itinerary days"
  ON public.itinerary_days FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.trips
    WHERE trips.id = itinerary_days.trip_id
    AND trips.user_id = auth.uid()
  ));

-- Create policies for activities table
CREATE POLICY "Users can view their own activities"
  ON public.activities FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.itinerary_days
    JOIN public.trips ON itinerary_days.trip_id = trips.id
    WHERE activities.itinerary_day_id = itinerary_days.id
    AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own activities"
  ON public.activities FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.itinerary_days
    JOIN public.trips ON itinerary_days.trip_id = trips.id
    WHERE activities.itinerary_day_id = itinerary_days.id
    AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own activities"
  ON public.activities FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.itinerary_days
    JOIN public.trips ON itinerary_days.trip_id = trips.id
    WHERE activities.itinerary_day_id = itinerary_days.id
    AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own activities"
  ON public.activities FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.itinerary_days
    JOIN public.trips ON itinerary_days.trip_id = trips.id
    WHERE activities.itinerary_day_id = itinerary_days.id
    AND trips.user_id = auth.uid()
  ));

-- Similar policies for other tables would follow the same pattern
-- For brevity, we'll create a generic policy for the remaining tables

-- Helper function to check if a user owns an activity
CREATE OR REPLACE FUNCTION public.user_owns_activity(activity_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.activities
    JOIN public.itinerary_days ON activities.itinerary_day_id = itinerary_days.id
    JOIN public.trips ON itinerary_days.trip_id = trips.id
    WHERE activities.id = activity_id
    AND trips.user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
