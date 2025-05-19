do $$
DECLARE
  trip_id UUID;
  day_id UUID;
  activity_id UUID;
  traveler_id UUID; -- Using a generic name for traveler IDs
  -- Declare individual traveler IDs again for clarity and retrieval after potential ON CONFLICT
  abdelmoneme_id UUID;
  skander_id UUID;
  dhaker_id UUID;
  sabeur_id UUID;

BEGIN
  -- Enable the uuid-ossp extension if not already enabled
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  -- Create Tables if they do not exist, matching the SVG schema
  -- Note: The 'type' column in the activities table is an ENUM in your database,
  -- although shown as TEXT in the SVG. The CREATE TABLE below uses TEXT, but
  -- your database will enforce the ENUM constraint during INSERTs.
  -- Also, latitude and longitude in locations and time in activities are NOT NULL in your database despite SVG.

  CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY,
    user_id UUID,
    title TEXT,
    destination TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS public.itinerary_days (
    id UUID PRIMARY KEY,
    trip_id UUID REFERENCES public.trips(id),
    date DATE,
    title TEXT,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  -- Note: 'type' column is an ENUM in your database, 'time' is NOT NULL
  CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY,
    itinerary_day_id UUID REFERENCES public.itinerary_days(id),
    type TEXT, -- This should ideally be the ENUM type 'activity_type'
    title TEXT,
    time TIME, -- Your database requires this to be NOT NULL
    duration TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    sequence_order INTEGER,
    important BOOLEAN DEFAULT FALSE,
    requires_confirmation BOOLEAN DEFAULT FALSE,
    is_group_event BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS public.locations (
    activity_id UUID PRIMARY KEY REFERENCES public.activities(id),
    name TEXT,
    address TEXT,
    latitude DECIMAL, -- Your database requires this to be NOT NULL
    longitude DECIMAL, -- Your database likely requires this to be NOT NULL
    contact TEXT,
    confirmation_number TEXT,
    website TEXT,
    map_url TEXT,
    venue_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS public.transport_details (
    id UUID PRIMARY KEY,
    activity_id UUID REFERENCES public.activities(id),
    mode TEXT, -- e.g., 'Flight', 'Train', 'Bus', 'Car'
    carrier TEXT, -- Airline, Train company, etc.
    booking_reference TEXT,
    pickup_time TIME,
    pickup_location TEXT,
    estimated_cost DECIMAL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS public.weather (
    itinerary_day_id UUID PRIMARY KEY REFERENCES public.itinerary_days(id),
    temperature INTEGER,
    condition TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY,
    itinerary_day_id UUID REFERENCES public.itinerary_days(id),
    text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY,
    itinerary_day_id UUID REFERENCES public.itinerary_days(id),
    file_name TEXT,
    file_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS public.travelers (
    id UUID PRIMARY KEY,
    trip_id UUID REFERENCES public.trips(id),
    first_name TEXT,
    last_name TEXT,
    nationality TEXT,
    sex TEXT,
    date_of_birth DATE,
    phone_number TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY,
    trip_id UUID REFERENCES public.trips(id),
    description TEXT,
    amount DECIMAL,
    currency VARCHAR(3),
    payment_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  -- Note: The 'seat_maps' table exists in the SVG schema but is not populated with data from your files.
  -- CREATE TABLE IF NOT EXISTS public.seat_maps ( ... ); -- Add definition if needed

  -- Insert the main trip details
  INSERT INTO public.trips (id, user_id, title, destination, start_date, end_date)
  VALUES (
    uuid_generate_v4(),
    '61e6b02b-3daa-4e7e-83b9-3b8173ec1717', -- Updated User ID
    'FIFA Club World Cup 2025',
    'USA', -- Primary locations are New York/Jersey City and Nashville
    '2025-06-14',
    '2025-06-25'
  )
  ON CONFLICT DO NOTHING -- Add ON CONFLICT DO NOTHING for idempotency
  RETURNING id INTO trip_id;

  -- If trip_id was not set because it already exists, retrieve it
  IF trip_id IS NULL THEN
    SELECT id INTO trip_id
    FROM public.trips
    WHERE title = 'FIFA Club World Cup 2025'
      AND start_date = '2025-06-14'
      AND end_date = '2025-06-25'
    LIMIT 1;
  END IF;

  -- Add Travelers
  -- Using separate INSERT statements to correctly capture returned IDs and handle conflicts
  INSERT INTO public.travelers (id, trip_id, first_name, last_name, nationality, sex, date_of_birth, phone_number, email)
  VALUES (uuid_generate_v4(), trip_id, 'ABDELMONEME', 'NAIFER', 'Belgique', 'Homme', '1982-02-16', '+32 478178477', 'zied.b.amara@gmail.com')
  ON CONFLICT DO NOTHING
  RETURNING id INTO abdelmoneme_id;

  IF abdelmoneme_id IS NULL THEN SELECT id INTO abdelmoneme_id FROM public.travelers WHERE trip_id = trip_id AND first_name = 'ABDELMONEME' AND last_name = 'NAIFER' LIMIT 1; END IF;

  INSERT INTO public.travelers (id, trip_id, first_name, last_name, nationality, sex, date_of_birth, phone_number, email)
  VALUES (uuid_generate_v4(), trip_id, 'SKANDER', 'BEN AMMAR', 'Belgique', 'Homme', '1981-03-17', NULL, NULL)
  ON CONFLICT DO NOTHING
  RETURNING id INTO skander_id;

  IF skander_id IS NULL THEN SELECT id INTO skander_id FROM public.travelers WHERE trip_id = trip_id AND first_name = 'SKANDER' AND last_name = 'BEN AMMAR' LIMIT 1; END IF;


  INSERT INTO public.travelers (id, trip_id, first_name, last_name, nationality, sex, date_of_birth, phone_number, email)
  VALUES (uuid_generate_v4(), trip_id, 'DHAKER', 'NAGTI', 'Belgique', 'Homme', '1981-06-18', NULL, NULL)
  ON CONFLICT DO NOTHING
  RETURNING id INTO dhaker_id;

  IF dhaker_id IS NULL THEN SELECT id INTO dhaker_id FROM public.travelers WHERE trip_id = trip_id AND first_name = 'DHAKER' AND last_name = 'NAGTI' LIMIT 1; END IF;


  INSERT INTO public.travelers (id, trip_id, first_name, last_name, nationality, sex, date_of_birth, phone_number, email)
  VALUES (uuid_generate_v4(), trip_id, 'SABEUR', 'RAZGUI', 'Belgique', 'Homme', '1982-08-06', NULL, NULL)
  ON CONFLICT DO NOTHING
  RETURNING id INTO sabeur_id;

  IF sabeur_id IS NULL THEN SELECT id INTO sabeur_id FROM public.travelers WHERE trip_id = trip_id AND first_name = 'SABEUR' AND last_name = 'RAZGUI' LIMIT 1; END IF;


  -- Saturday, June 14
  INSERT INTO public.itinerary_days (id, trip_id, date, title)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-14', 'Arrival in New York')
  ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-14' LIMIT 1; END IF;

  -- Activity: Outbound Flight DL0141
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, duration, notes, sequence_order, requires_confirmation)
  VALUES (
    uuid_generate_v4(),
    day_id,
    'transport', -- Using 'transport' type (valid enum)
    'Outbound Flight DL0141 - Brussels (BRU) → New York (JFK)',
    '10:45:00',
    '2h 15m', -- Calculated duration
    'Flight DL0141. Departure: 10:45 from Brussels (BRU). Arrival: 13:00 at New York (JFK). Cabin: Main cabin. Baggage: 1x23 Kg (for Abdelmoneme Naifer). Ticket Number: 057 233 470 143 3.', -- Combining details into notes
    1,
    TRUE -- Requires confirmation (boarding pass)
  )
  ON CONFLICT DO NOTHING
  RETURNING id INTO activity_id;

  IF activity_id IS NULL THEN SELECT id INTO activity_id FROM public.activities WHERE itinerary_day_id = day_id AND title = 'Outbound Flight DL0141 - Brussels (BRU) → New York (JFK)' LIMIT 1; END IF;

  -- Add transport details for the flight (using available columns)
  INSERT INTO public.transport_details (id, activity_id, mode, carrier, booking_reference, notes)
  VALUES (
    uuid_generate_v4(),
    activity_id,
    'Flight',
    'DELTA AIR LINES', -- Carrier
    'TTA4RV', -- Booking Reference
    'Flight DL0141. Departure: 10:45 from Brussels (BRU). Arrival: 13:00 at New York (JFK). Ticket Number: 057 233 470 143 3. Cabin: Main cabin. Baggage: 1x23 Kg (for Abdelmoneme Naifer).' -- More details in notes
  )
  ON CONFLICT DO NOTHING;


  -- Activity: Check-in at Jersey City hotel
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, sequence_order, requires_confirmation)
  VALUES (
    uuid_generate_v4(),
    day_id,
    'hotel', -- Using 'hotel' type (valid enum)
    'Check-in at Jersey City hotel',
    '16:00:00', -- Time is "After 16:00", using 16:00 as a placeholder
    'Guests: 6 adults, Host: Mariam Mikhaeil',
    2,
    TRUE -- Requires confirmation (reservation details)
  )
   ON CONFLICT DO NOTHING
  RETURNING id INTO activity_id;

  IF activity_id IS NULL THEN SELECT id INTO activity_id FROM public.activities WHERE itinerary_day_id = day_id AND title = 'Check-in at Jersey City hotel' LIMIT 1; END IF;

  -- Add location for Jersey City hotel
  -- Using confirmation_number column in locations for hotel reservation
  -- Providing placeholder values for latitude and longitude
  INSERT INTO public.locations (activity_id, name, address, latitude, longitude, confirmation_number)
  VALUES (activity_id, 'Jersey City hotel', '35 Dwight St, 1st floor, Jersey City, NJ, 07305, United States of America', 40.70150358390281, -74.08068809411188, 'HA-50R169')
  ON CONFLICT DO NOTHING;

  -- Sunday, June 15
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-15', 'Free Day in New York/NJ', 'Non-Match Day: Free day in New York/NJ area')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-15' LIMIT 1; END IF;

  -- Suggested Activities as Activities (can be added as optional)
  -- Jersey Gardens Outlet Mall
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'Visit Jersey Gardens Outlet Mall',
    '10:00:00', -- Placeholder time
    'Location: Elizabeth, NJ',
    1
  ) ON CONFLICT DO NOTHING;
  -- Manhattan sightseeing
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'Manhattan sightseeing',
    '10:00:00', -- Placeholder time
    'Suggested: Times Square, Central Park',
    2
  ) ON CONFLICT DO NOTHING;

  -- Monday, June 16
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-16', 'Match Day in Philadelphia', 'Match 8: CR Flamengo vs EST')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-16' LIMIT 1; END IF;

  -- Activity: Match 8: CR Flamengo vs EST
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, important, requires_confirmation, is_group_event, sequence_order)
  VALUES (
    uuid_generate_v4(),
    day_id,
    'match', -- Using 'match' type (valid enum)
    'Match 8: CR Flamengo vs EST',
    '21:00:00',
    'Location: Lincoln Financial Field, Philadelphia, Tickets: Category PSUPPA. Note: Plan for travel time to Philadelphia (approximately 2 hours from Jersey City).', -- Location in notes
    TRUE,
    TRUE, -- Assuming match tickets require confirmation/possession
    TRUE,
    1
  )
   ON CONFLICT DO NOTHING
  RETURNING id INTO activity_id;

  IF activity_id IS NULL THEN SELECT id INTO activity_id FROM public.activities WHERE itinerary_day_id = day_id AND title = 'Match 8: CR Flamengo vs EST' LIMIT 1; END IF;

  -- Add location for the match (using location table for primary venue info)
  -- Providing placeholder values for latitude and longitude
  INSERT INTO public.locations (activity_id, name, address, latitude, longitude)
  VALUES (activity_id, 'Lincoln Financial Field', 'Philadelphia, PA', 39.901591684552045, -75.1675240913209)
   ON CONFLICT DO NOTHING;


  -- Tuesday, June 17
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-17', 'Free Day in New York/NJ', 'Non-Match Day: Free day in New York/NJ area')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-17' LIMIT 1; END IF;

  -- Suggested Activities
  -- Woodbury Common Premium Outlets
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'Visit Woodbury Common Premium Outlets',
    '10:00:00', -- Placeholder time
    'Location: Central Valley, NY',
    1
  ) ON CONFLICT DO NOTHING;
  -- Statue of Liberty & Ellis Island tour
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'Statue of Liberty & Ellis Island tour',
    '10:00:00', -- Placeholder time
    2
  ) ON CONFLICT DO NOTHING;

  -- Wednesday, June 18
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-18', 'Free Day in New York/NJ', 'Non-Match Day: Free day in New York/NJ area')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-18' LIMIT 1; END IF;

  -- Suggested Activities
  -- Empire State Building
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'Visit Empire State Building',
    '10:00:00', -- Placeholder time
    1
  ) ON CONFLICT DO NOTHING;
  -- Fifth Avenue shopping
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'Fifth Avenue shopping',
    '10:00:00', -- Placeholder time
    2
  ) ON CONFLICT DO NOTHING;

  -- Thursday, June 19
  INSERT INTO public.itinerary_days (id, trip_id, date, title)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-19', 'Travel to Nashville')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-19' LIMIT 1; END IF;


  -- Activity: Flight UA2038 - Newark (EWR) → Nashville (BNA)
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, duration, notes, sequence_order, requires_confirmation)
  VALUES (
    uuid_generate_v4(),
    day_id,
    'transport', -- Using 'transport' type (valid enum)
    'Flight UA2038 - Newark (EWR) → Nashville (BNA)',
    '21:42:00',
    '2h 33m', -- Duration from NY_nashville.pdf
    'Flight UA2038. Departure: 21:42 from New York/Newark, NJ, US (EWR). Arrival: 23:15 at Nashville, TN, US (BNA). Terminal: A. Class: Economy.', -- Combining details into notes
    1,
    TRUE -- Requires confirmation (boarding pass)
  )
   ON CONFLICT DO NOTHING
  RETURNING id INTO activity_id;

  IF activity_id IS NULL THEN SELECT id INTO activity_id FROM public.activities WHERE itinerary_day_id = day_id AND title = 'Flight UA2038 - Newark (EWR) → Nashville (BNA)' LIMIT 1; END IF;

  -- Add transport details for the flight (using available columns)
  INSERT INTO public.transport_details (id, activity_id, mode, carrier, booking_reference, notes)
  VALUES (
    uuid_generate_v4(),
    activity_id,
    'Flight',
    'United Airlines', -- Carrier
    'KY2226', -- Airline PNR - using this as the primary booking reference
    'Flight UA2038. Departure: 21:42 from New York/Newark, NJ, US (EWR). Arrival: 23:15 at Nashville, TN, US (BNA). Terminal: A. Class: Economy. Trip.com Booking Ref: 1306259360898895. Ticket Numbers: 016-3558139933, 016-3558139934, 016-3558139935, 016-3558139932.' -- More details in notes
  )
   ON CONFLICT DO NOTHING;


  -- Friday, June 20
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-20', 'Match Day in Nashville', 'Match 23: Club León vs EST')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-20' LIMIT 1; END IF;


  -- Placeholder for Nashville hotel Check-in (Details needed)
   INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, sequence_order, requires_confirmation) -- Added time column
   VALUES (
     uuid_generate_v4(),
     day_id,
     'hotel', -- Using 'hotel' type (valid enum)
     'Check-in at Nashville hotel',
     '16:00:00', -- Placeholder time (assuming typical check-in is afternoon)
     'Status: Booking required, Dates Needed: June 19-21, 2025',
     1,
     FALSE -- Requires confirmation once booked
   ) ON CONFLICT DO NOTHING;


  -- Activity: Match 23: Club León vs EST
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, important, requires_confirmation, is_group_event, sequence_order)
  VALUES (
    uuid_generate_v4(),
    day_id,
    'match', -- Using 'match' type (valid enum)
    'Match 23: Club León vs EST',
    '18:00:00',
    'Location: GEODIS Park, Nashville, Tickets: Category PSUPPA.', -- Location in notes
    TRUE,
    TRUE, -- Assuming match tickets require confirmation/possession
    TRUE,
    2
  )
   ON CONFLICT DO NOTHING
  RETURNING id INTO activity_id;

  IF activity_id IS NULL THEN SELECT id INTO activity_id FROM public.activities WHERE itinerary_day_id = day_id AND title = 'Match 23: Club León vs EST' LIMIT 1; END IF;


  -- Add location for the match (using location table for primary venue info)
  -- Providing placeholder values for latitude and longitude
  INSERT INTO public.locations (activity_id, name, address, latitude, longitude)
  VALUES (activity_id, 'GEODIS Park', 'Nashville, TN', 36.13037455354579, -86.76553610772864)
   ON CONFLICT DO NOTHING;


  -- Saturday, June 21
  INSERT INTO public.itinerary_days (id, trip_id, date, title)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-21', 'Travel to New York')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-21' LIMIT 1; END IF;


  -- Placeholder for Nashville hotel Check-out (Details needed)
   INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, sequence_order) -- Added time column
   VALUES (
     uuid_generate_v4(),
     day_id,
     'hotel', -- Using 'hotel' type (valid enum)
     'Check-out from Nashville hotel',
     '11:00:00', -- Placeholder time (assuming typical check-out time)
     'Status: Booking required',
     1
   ) ON CONFLICT DO NOTHING;


  -- Activity: Flight B61074 - Nashville (BNA) → New York (JFK)
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, duration, notes, sequence_order, requires_confirmation)
  VALUES (
    uuid_generate_v4(),
    day_id,
    'transport', -- Using 'transport' type (valid enum)
    'Flight B61074 - Nashville (BNA) → New York (JFK)',
    '06:00:00',
    '2h 27m', -- Duration from nashville.pdf
    'Flight B61074. Departure: 06:00 from Nashville, TN, US (BNA). Arrival: 09:27 at New York, NY, US (JFK). Terminal: T5. Class: Economy.', -- Combining details into notes
    2,
    TRUE -- Requires confirmation (boarding pass)
  )
   ON CONFLICT DO NOTHING
  RETURNING id INTO activity_id;

  IF activity_id IS NULL THEN SELECT id INTO activity_id FROM public.activities WHERE itinerary_day_id = day_id AND title = 'Flight B61074 - Nashville (BNA) → New York (JFK)' LIMIT 1; END IF;

  -- Add transport details for the flight (using available columns)
  INSERT INTO public.transport_details (id, activity_id, mode, carrier, booking_reference, notes)
  VALUES (
    uuid_generate_v4(),
    activity_id,
    'Flight',
    'JetBlue Airways', -- Carrier
    'SGNBQD', -- Confirmation Code - using this as the primary booking reference
    'Flight B61074. Departure: 06:00 from Nashville, TN, US (BNA). Arrival: 09:27 at New York, NY, US (JFK). Terminal: T5. Class: Economy. Trip.com Booking Ref: 1306259360898895. Ticket Numbers: 2792179557949, 2792179557950, 2792179557951, 2792179557952.' -- More details in notes
  )
   ON CONFLICT DO NOTHING;

  -- Sunday, June 22
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-22', 'Free Day in New York/NJ', 'Non-Match Day: Free day in New York/NJ area')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-22' LIMIT 1; END IF;

  -- Suggested Activities
  -- Top of the Rock observation deck
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'Visit Top of the Rock observation deck',
    '10:00:00', -- Placeholder time
    1
  ) ON CONFLICT DO NOTHING;
  -- Brooklyn Bridge walk
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'Brooklyn Bridge walk',
    '10:00:00', -- Placeholder time
    2
  ) ON CONFLICT DO NOTHING;

  -- Monday, June 23
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-23', 'Free Day in New York/NJ', 'Non-Match Day: Free day in New York/NJ area')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-23' LIMIT 1; END IF;

  -- Suggested Activities
  -- One World Observatory
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'Visit One World Observatory',
    '10:00:00', -- Placeholder time
    1
  ) ON CONFLICT DO NOTHING;
  -- The Oculus & Westfield World Trade Center shopping
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, sequence_order) -- Added time column
  VALUES (
    uuid_generate_v4(),
    day_id,
    'activity', -- Using 'activity' type (valid enum)
    'The Oculus & Westfield World Trade Center shopping',
    '10:00:00', -- Placeholder time
    'Type: Shopping',
    2
  ) ON CONFLICT DO NOTHING;

  -- Tuesday, June 24
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-24', 'Match Day in Philadelphia', 'Match 40: EST vs Chelsea FC')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-24' LIMIT 1; END IF;

  -- Activity: Match 40: EST vs Chelsea FC
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, important, requires_confirmation, is_group_event, sequence_order)
  VALUES (
    uuid_generate_v4(),
    day_id,
    'match', -- Using 'match' type (valid enum)
    'Match 40: EST vs Chelsea FC',
    '21:00:00',
    'Location: Lincoln Financial Field, Philadelphia, Tickets: Category PSUPPA.', -- Location in notes
    TRUE,
    TRUE, -- Assuming match tickets require confirmation/possession
    TRUE,
    1
  )
   ON CONFLICT DO NOTHING
  RETURNING id INTO activity_id;

  IF activity_id IS NULL THEN SELECT id INTO activity_id FROM public.activities WHERE itinerary_day_id = day_id AND title = 'Match 40: EST vs Chelsea FC' LIMIT 1; END IF;


  -- Add location for the match (using location table for primary venue info)
  -- Providing placeholder values for latitude and longitude
  INSERT INTO public.locations (activity_id, name, address, latitude, longitude)
  VALUES (activity_id, 'Lincoln Financial Field', 'Philadelphia, PA', 39.901591684552045, -75.1675240913209)
   ON CONFLICT DO NOTHING;

  -- Wednesday, June 25
  INSERT INTO public.itinerary_days (id, trip_id, date, title)
  VALUES (uuid_generate_v4(), trip_id, '2025-06-25', 'Departure from New York')
   ON CONFLICT DO NOTHING
  RETURNING id INTO day_id;

  IF day_id IS NULL THEN SELECT id INTO day_id FROM public.itinerary_days WHERE trip_id = trip_id AND date = '2025-06-25' LIMIT 1; END IF;


  -- Activity: Check-out from Jersey City hotel
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, sequence_order, requires_confirmation)
  VALUES (
    uuid_generate_v4(),
    day_id,
    'hotel', -- Using 'hotel' type (valid enum)
    'Check-out from Jersey City hotel',
    '11:00:00', -- Time is "Before 11:00", using 11:00 as a placeholder
    'Reservation: HA-50R169',
    1,
    TRUE -- Requires confirmation (checking out)
  )
   ON CONFLICT DO NOTHING
  RETURNING id INTO activity_id;

  IF activity_id IS NULL THEN SELECT id INTO activity_id FROM public.activities WHERE itinerary_day_id = day_id AND title = 'Check-out from Jersey City hotel' LIMIT 1; END IF;

  -- Add location for Jersey City hotel Check-out (linking to the same location as check-in)
  -- Using confirmation_number column in locations for hotel reservation
  -- Providing placeholder values for latitude and longitude
  INSERT INTO public.locations (activity_id, name, address, latitude, longitude, confirmation_number)
  VALUES (activity_id, 'Jersey City hotel', '35 Dwight St, 1st floor, Jersey City, NJ, 07305, United States of America', 40.70150358390281, -74.08068809411188, 'HA-50R169')
   ON CONFLICT DO NOTHING;


  -- Activity: Return Flight DL0140 - New York (JFK) → Brussels (BRU)
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, duration, notes, sequence_order, requires_confirmation)
  VALUES (
    uuid_generate_v4(),
    day_id,
    'transport', -- Using 'transport' type (valid enum)
    'Return Flight DL0140 - New York (JFK) → Brussels (BRU)',
    '18:55:00',
    '13h 45m', -- Calculated duration (includes overnight)
    'Flight DL0140. Departure: 18:55 from New York (JFK). Arrival: 08:40 (Next Day) at Brussels (BRU). Cabin: Main cabin. Baggage: 1x23 Kg (for Abdelmoneme Naifer). Ticket Number: 057 233 470 143 3.', -- Combining details into notes
    2,
    TRUE -- Requires confirmation (boarding pass)
  )
   ON CONFLICT DO NOTHING
  RETURNING id INTO activity_id;

  IF activity_id IS NULL THEN SELECT id INTO activity_id FROM public.activities WHERE itinerary_day_id = day_id AND title = 'Return Flight DL0140 - New York (JFK) → Brussels (BRU)' LIMIT 1; END IF;


  -- Add transport details for the flight (using available columns)
  INSERT INTO public.transport_details (id, activity_id, mode, carrier, booking_reference, notes)
  VALUES (
    uuid_generate_v4(),
    activity_id,
    'Flight',
    'DELTA AIR LINES', -- Carrier
    'TTA4RV', -- Booking Reference
    'Flight DL0140. Departure: 18:55 from New York (JFK). Arrival: 08:40 (Next Day) at Brussels (BRU). Ticket Number: 057 233 470 143 3. Cabin: Main cabin. Baggage: 1x23 Kg (for Abdelmoneme Naifer).' -- More details in notes
  )
   ON CONFLICT DO NOTHING;


  -- Payments (using the payments table from the SVG schema)
  INSERT INTO public.payments (id, trip_id, description, amount, currency, payment_date) VALUES (uuid_generate_v4(), trip_id, 'Jersey City hotel First Payment', 1714.48, 'USD', '2025-03-28') ON CONFLICT DO NOTHING;
  INSERT INTO public.payments (id, trip_id, description, amount, currency, payment_date) VALUES (uuid_generate_v4(), trip_id, 'Jersey City hotel Second Payment', 996.04, 'USD', '2025-06-07') ON CONFLICT DO NOTHING;
  INSERT INTO public.payments (id, trip_id, description, amount, currency, payment_date) VALUES (uuid_generate_v4(), trip_id, 'UA2038/B61074 Flights (Trip.com Booking 1306259360898895)', 643.84, 'EUR', '2025-04-06') ON CONFLICT DO NOTHING;
  INSERT INTO public.payments (id, trip_id, description, amount, currency, payment_date) VALUES (uuid_generate_v4(), trip_id, 'DL0141/DL0140 Flights (Ticket 057 233 470 143 3)', 910.47, 'EUR', '2025-03-17') ON CONFLICT DO NOTHING;
  INSERT INTO public.payments (id, trip_id, description, amount, currency, payment_date) VALUES (uuid_generate_v4(), trip_id, 'B61074 Flight (JetBlue Payment)', 353.96, 'USD', NULL) ON CONFLICT DO NOTHING; -- Payment date not specified for this one

  -- Note: Weather, Reminders, and Documents tables are in the schema but no specific data was provided in the files for these.
  -- You can add INSERT statements for these tables here if you have the data.

END $$;