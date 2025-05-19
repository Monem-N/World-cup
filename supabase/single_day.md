-- Add data for a single day (2025-06-03) with all related data
DO $$
DECLARE
  trip_id UUID;
  day_id UUID;
  activity_id UUID;
  transport_id UUID;
  location_id UUID;
BEGIN
  -- First, check if we already have a trip
  SELECT id INTO trip_id FROM public.trips LIMIT 1;
  
  -- If no trip exists, create one
  IF trip_id IS NULL THEN
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
  END IF;
  
  -- Create the itinerary day for 2025-06-03
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (
    uuid_generate_v4(),
    trip_id,
    '2025-06-03',
    'Training Day + City Tour',
    'Morning training session followed by a guided tour of New York City.'
  )
  RETURNING id INTO day_id;
  
  -- Add weather information
  INSERT INTO public.weather (itinerary_day_id, temperature, condition, icon)
  VALUES (
    day_id,
    26,
    'Sunny',
    'sunny'
  );
  
  -- Add reminders
  INSERT INTO public.reminders (itinerary_day_id, text)
  VALUES 
    (day_id, 'Bring training gear'),
    (day_id, 'Wear comfortable shoes for the tour'),
    (day_id, 'Don''t forget sunscreen');
  
  -- Add documents
  INSERT INTO public.documents (itinerary_day_id, file_name, file_path)
  VALUES 
    (day_id, 'training-schedule.pdf', '/documents/training-schedule.pdf'),
    (day_id, 'nyc-tour-map.pdf', '/documents/nyc-tour-map.pdf');
  
  -- Activity 1: Breakfast
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
    'Buffet breakfast at the hotel restaurant',
    'pending',
    1
  );
  
  -- Activity 2: Training Session
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, important, requires_confirmation, is_group_event, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity',
    'Team Training Session',
    '09:00:00',
    '2h',
    'Training session with the team at the practice facility',
    'pending',
    TRUE,
    TRUE,
    TRUE,
    2
  )
  RETURNING id INTO activity_id;
  
  -- Add location for training session
  INSERT INTO public.locations (
    activity_id, name, address, latitude, longitude, contact, confirmation_number
  )
  VALUES (
    activity_id,
    'Red Bull Training Facility',
    '50 Columbia Rd, Morristown, NJ 07960',
    40.7969,
    -74.4773,
    '+1 (555) 123-4567',
    'TRN-2025-0603'
  );
  
  -- Add transport for training session
  INSERT INTO public.transport_details (
    id, activity_id, mode, pickup_time, pickup_location, estimated_cost
  )
  VALUES (
    uuid_generate_v4(),
    activity_id,
    'Team Bus',
    '08:30:00',
    'Hotel Lobby',
    0
  )
  RETURNING id INTO transport_id;
  
  -- Activity 3: Lunch
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'meal',
    'Lunch at Training Facility',
    '12:00:00',
    '1h',
    'Nutritionist-approved meal at the training facility',
    'pending',
    3
  );
  
  -- Activity 4: Return to Hotel
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, status, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'transport',
    'Return to Hotel',
    '13:30:00',
    '30m',
    'pending',
    4
  )
  RETURNING id INTO activity_id;
  
  -- Add transport details for return to hotel
  INSERT INTO public.transport_details (
    activity_id, mode, pickup_time, pickup_location
  )
  VALUES (
    activity_id,
    'Team Bus',
    '13:30:00',
    'Training Facility Entrance'
  );
  
  -- Activity 5: Free Time
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity',
    'Free Time / Rest',
    '14:00:00',
    '2h',
    'Time to rest or explore the hotel area',
    'pending',
    5
  );
  
  -- Activity 6: NYC Tour
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, important, is_group_event, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity',
    'New York City Tour',
    '16:00:00',
    '4h',
    'Guided tour of New York City landmarks including Times Square, Central Park, and the Empire State Building',
    'pending',
    TRUE,
    TRUE,
    6
  )
  RETURNING id INTO activity_id;
  
  -- Add location for NYC Tour
  INSERT INTO public.locations (
    activity_id, name, address, latitude, longitude, website, map_url
  )
  VALUES (
    activity_id,
    'Times Square (Meeting Point)',
    'Times Square, New York, NY 10036',
    40.7580,
    -73.9855,
    'https://www.timessquarenyc.org',
    'https://goo.gl/maps/XYZ123'
  );
  
  -- Add transport for NYC Tour
  INSERT INTO public.transport_details (
    id, activity_id, mode, pickup_time, pickup_location, estimated_cost
  )
  VALUES (
    uuid_generate_v4(),
    activity_id,
    'Charter Bus',
    '15:30:00',
    'Hotel Lobby',
    0
  )
  RETURNING id INTO transport_id;
  
  -- Activity 7: Dinner in NYC
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, notes, status, is_group_event, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'meal',
    'Dinner in New York',
    '20:00:00',
    '2h',
    'Group dinner at a famous New York restaurant',
    'pending',
    TRUE,
    7
  )
  RETURNING id INTO activity_id;
  
  -- Add location for dinner
  INSERT INTO public.locations (
    activity_id, name, address, latitude, longitude, contact, confirmation_number, venue_type
  )
  VALUES (
    activity_id,
    'Carmine''s Italian Restaurant',
    '200 W 44th St, New York, NY 10036',
    40.7577,
    -73.9869,
    '+1 (212) 221-3800',
    'RES-2025-0603',
    'Restaurant'
  );
  
  -- Activity 8: Return to Hotel from NYC
  INSERT INTO public.activities (
    id, itinerary_day_id, type, title, time, duration, status, sequence_order
  )
  VALUES (
    uuid_generate_v4(),
    day_id,
    'transport',
    'Return to Hotel from NYC',
    '22:30:00',
    '1h',
    'pending',
    8
  )
  RETURNING id INTO activity_id;
  
  -- Add transport details for return from NYC
  INSERT INTO public.transport_details (
    activity_id, mode, pickup_time, pickup_location
  )
  VALUES (
    activity_id,
    'Charter Bus',
    '22:30:00',
    'Outside Carmine''s Restaurant'
  );
  
  RAISE NOTICE 'Successfully added data for 2025-06-03';
END $$;