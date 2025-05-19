-- sample_data.sql
-- This file contains sample data for the World Cup Itinerary application
-- To use this file, run it in the Supabase SQL Editor after running schema.sql, rls.sql, and functions.sql

-- Insert a sample user (replace with your actual user ID from Supabase Auth)
-- This assumes you've already created a user in Supabase Auth
DO $$
DECLARE
  user_id UUID := '61e6b02b-3daa-4e7e-83b9-3b8173ec1717'; -- Replace with your actual user ID
  trip_id UUID;
  day_id UUID;
  activity_id UUID;
  transport_id UUID;
  weather_id UUID;
BEGIN
  -- Update the sample user's profile
  UPDATE public.profiles
  SET 
    username = 'worldcupfan',
    first_name = 'World Cup',
    last_name = 'Fan',
    avatar_url = 'https://example.com/avatar.jpg'
  WHERE id = user_id;

  -- Insert a sample trip
  INSERT INTO public.trips (id, user_id, title, destination, start_date, end_date)
  VALUES (
    uuid_generate_v4(),
    user_id,
    'World Cup 2025',
    'New Jersey, USA',
    '2025-06-01',
    '2025-06-10'
  )
  RETURNING id INTO trip_id;

  -- Insert a sample itinerary day
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (
    uuid_generate_v4(),
    trip_id,
    '2025-06-02',
    'Arrival + Match Day',
    'Arrive in New Jersey, check-in, attend opening match.'
  )
  RETURNING id INTO day_id;

  -- Insert weather for the day
  INSERT INTO public.weather (id, itinerary_day_id, temperature, condition, icon)
  VALUES (
    uuid_generate_v4(),
    day_id,
    7,
    'Partly cloudy',
    'cloudy'
  )
  RETURNING id INTO weather_id;

  -- Insert reminders
  INSERT INTO public.reminders (itinerary_day_id, text)
  VALUES 
    (day_id, 'Bring printed match ticket'),
    (day_id, 'Charge phone power bank');

  -- Insert documents
  INSERT INTO public.documents (itinerary_day_id, file_name, file_path, file_type)
  VALUES 
    (day_id, 'hotel-checkin.pdf', '/documents/hotel-checkin.pdf', 'application/pdf'),
    (day_id, 'match-ticket.pdf', '/documents/match-ticket.pdf', 'application/pdf');

  -- Insert breakfast activity
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'meal',
    'Breakfast at Airport',
    '06:30:00',
    '1h',
    'Grab a quick breakfast before boarding',
    'pending',
    1
  )
  RETURNING id INTO activity_id;

  -- Insert location for breakfast
  INSERT INTO public.locations (
    activity_id, name, latitude, longitude
  )
  VALUES (
    activity_id,
    'Heathrow Airport Terminal 5',
    51.4700,
    -0.4543
  );

  -- Insert flight activity
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, status, important, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'transport',
    'Flight from London to New York',
    '08:00:00',
    '8h',
    'completed',
    TRUE,
    2
  )
  RETURNING id INTO activity_id;

  -- Insert location for flight
  INSERT INTO public.locations (
    activity_id, name, latitude, longitude
  )
  VALUES (
    activity_id,
    'Heathrow Airport (LHR)',
    51.4700,
    -0.4543
  );

  -- Insert transport details for flight
  INSERT INTO public.transport_details (
    id, activity_id, mode, carrier, booking_reference, notes
  )
  VALUES (
    uuid_generate_v4(),
    activity_id,
    'Flight',
    'British Airways',
    'BA245',
    'Check-in online beforehand.'
  )
  RETURNING id INTO transport_id;

  -- Insert seat map for flight
  INSERT INTO public.seat_maps (transport_detail_id, passenger_name, seat_number)
  VALUES 
    (transport_id, 'Alice', '10A'),
    (transport_id, 'Bob', '10B'),
    (transport_id, 'Charlie', '10C');

  -- Insert attachment for flight
  INSERT INTO public.attachments (activity_id, file_name, file_path, file_type)
  VALUES (
    activity_id,
    'flight-ticket.pdf',
    '/attachments/flight-ticket.pdf',
    'application/pdf'
  );

  -- Insert lunch activity
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'meal',
    'Lunch at JFK',
    '14:30:00',
    '1h',
    'Have lunch after immigration',
    'pending',
    3
  )
  RETURNING id INTO activity_id;

  -- Insert location for lunch
  INSERT INTO public.locations (
    activity_id, name, latitude, longitude
  )
  VALUES (
    activity_id,
    'JFK Terminal 5',
    40.6413,
    -73.7781
  );

  -- Insert more activities as needed...

  -- Insert travel essentials
  INSERT INTO public.travel_essentials (trip_id, name, category, packed)
  VALUES 
    (trip_id, 'Passport', 'Documents', TRUE),
    (trip_id, 'Match tickets', 'Documents', TRUE),
    (trip_id, 'Power adapter', 'Electronics', FALSE),
    (trip_id, 'Sunscreen', 'Health', FALSE),
    (trip_id, 'Team jersey', 'Clothing', TRUE);

END $$;
