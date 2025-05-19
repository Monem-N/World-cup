-- WARNING: This script creates public access policies for testing purposes.
-- DO NOT use this in production!

-- Enable RLS on all tables (if not already enabled)
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

-- Create public access policies for all tables
CREATE POLICY "Public read access for trips"
  ON public.trips FOR SELECT
  USING (true);

CREATE POLICY "Public read access for itinerary_days"
  ON public.itinerary_days FOR SELECT
  USING (true);

CREATE POLICY "Public read access for activities"
  ON public.activities FOR SELECT
  USING (true);

CREATE POLICY "Public read access for locations"
  ON public.locations FOR SELECT
  USING (true);

CREATE POLICY "Public read access for transport_details"
  ON public.transport_details FOR SELECT
  USING (true);

CREATE POLICY "Public read access for seat_maps"
  ON public.seat_maps FOR SELECT
  USING (true);

CREATE POLICY "Public read access for shared_transport"
  ON public.shared_transport FOR SELECT
  USING (true);

CREATE POLICY "Public read access for attachments"
  ON public.attachments FOR SELECT
  USING (true);

CREATE POLICY "Public read access for weather"
  ON public.weather FOR SELECT
  USING (true);

CREATE POLICY "Public read access for reminders"
  ON public.reminders FOR SELECT
  USING (true);

CREATE POLICY "Public read access for documents"
  ON public.documents FOR SELECT
  USING (true);

CREATE POLICY "Public read access for travel_essentials"
  ON public.travel_essentials FOR SELECT
  USING (true);

-- Also create public insert policies for testing
CREATE POLICY "Public insert access for trips"
  ON public.trips FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public insert access for itinerary_days"
  ON public.itinerary_days FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public insert access for activities"
  ON public.activities FOR INSERT
  WITH CHECK (true);

-- To revert these changes, run:
-- DROP POLICY "Public read access for trips" ON public.trips;
-- DROP POLICY "Public read access for itinerary_days" ON public.itinerary_days;
-- ... and so on for all tables
