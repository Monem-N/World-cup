-- Insert test data for 2025-06-02
DO $$
DECLARE
  trip_id UUID;
  day_id UUID;
  activity_id UUID;
BEGIN
  -- Insert a trip (without requiring a user ID)
  INSERT INTO public.trips (id, user_id, title, destination, start_date, end_date)
  VALUES (
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000000', -- This is a placeholder user ID
    'World Cup 2025',
    'New Jersey, USA',
    '2025-06-01',
    '2025-06-10'
  )
  RETURNING id INTO trip_id;
  
  -- Insert an itinerary day for 2025-06-02
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (
    uuid_generate_v4(),
    trip_id,
    '2025-06-02',
    'Match Day',
    'Visit the stadium and watch the match.'
  )
  RETURNING id INTO day_id;
  
  -- Insert weather for the day
  INSERT INTO public.weather (itinerary_day_id, temperature, condition, icon)
  VALUES (
    day_id,
    24,
    'Partly cloudy',
    'partly_cloudy'
  );
  
  -- Insert activities
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'meal',
    'Breakfast at Hotel',
    '07:00:00',
    '1h',
    'Buffet breakfast at the hotel',
    'pending',
    1
  );
  
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity',
    'Visit to the Stadium',
    '09:00:00',
    '3h',
    'Guided tour of the stadium',
    'pending',
    2
  )
  RETURNING id INTO activity_id;
  
  -- Insert location for the stadium visit
  INSERT INTO public.locations (
    activity_id, name, latitude, longitude, address
  )
  VALUES (
    activity_id,
    'MetLife Stadium',
    40.8135,
    -74.0745,
    '1 MetLife Stadium Dr, East Rutherford, NJ'
  );
  
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'meal',
    'Lunch',
    '12:30:00',
    '1h',
    'Lunch at a local restaurant',
    'pending',
    3
  );
  
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, important, requires_confirmation, is_group_event, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'match',
    'World Cup Match',
    '19:00:00',
    '2h',
    'Arrive early for security checks',
    'pending',
    TRUE,
    TRUE,
    TRUE,
    4
  )
  RETURNING id INTO activity_id;
  
  -- Insert location for the match
  INSERT INTO public.locations (
    activity_id, name, latitude, longitude, address
  )
  VALUES (
    activity_id,
    'MetLife Stadium',
    40.8135,
    -74.0745,
    '1 MetLife Stadium Dr, East Rutherford, NJ'
  );
  
  -- Insert transport details for the match
  INSERT INTO public.transport_details (
    activity_id, mode, pickup_time, pickup_location, estimated_cost
  )
  VALUES (
    activity_id,
    'Uber',
    '17:30:00',
    'Hotel Lobby',
    40
  );
  
  -- Insert reminders
  INSERT INTO public.reminders (itinerary_day_id, text)
  VALUES 
    (day_id, 'Bring match ticket'),
    (day_id, 'Wear team colors');
  
  -- Insert documents
  INSERT INTO public.documents (itinerary_day_id, file_name, file_path)
  VALUES 
    (day_id, 'match-ticket.pdf', '/documents/match-ticket.pdf'),
    (day_id, 'stadium-map.pdf', '/documents/stadium-map.pdf');
  
  RAISE NOTICE 'Successfully inserted test data for 2025-06-02';
END $$;
