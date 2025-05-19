Okay, let's enhance the step-by-step guide with a table of contents, a real-data example, troubleshooting tips, and information on batch operations.

Here is the comprehensive guide to adding or modifying itinerary data in your database:

-----

## Guide to Managing Your Trip Itinerary Data via SQL

### Table of Contents

1. Understanding Your Database Schema
2. Part 1: Adding New Days and Activities
      * Step 1: Collect All the Data
      * Step 2: Identify the Relevant Trip ID
      * Step 3: Generate the SQL INSERT Statements
      * Example: Adding Data for Saturday, June 14th
3. Part 2: Modifying Existing Data
      * Step 1: Identify the Data to Modify
      * Step 2: Generate the SQL UPDATE Statements
4. Deleting Data
5. Batch Operations: Adding Multiple Rows
6. Executing Your SQL
7. Troubleshooting Common Errors

### 1\. Understanding Your Database Schema

Before you start, it's crucial to remember the structure and rules of your tables:

* **`trips`**: Stores the overall trip details (id, user\_id, title, destination, start\_date, end\_date, created\_at, updated\_at).
* **`itinerary_days`**: Links days to a trip and holds day-specific info (id, trip\_id, date, title, summary, created\_at, updated\_at).
* **`activities`**: Details specific events/actions on a given day (id, itinerary\_day\_id, type, title, time, duration, notes, status, sequence\_order, important, requires\_confirmation, is\_group\_event, created\_at, updated\_at).
  * `type`: **ENUM** with allowed values: `transport`, `match`, `meal`, `hotel`, `activity`, `accommodation`. You must use one of these exact values.
  * `time`: **NOT NULL**. You must provide a time, even if it's a placeholder (e.g., '10:00:00' for flexible activities).
* **`locations`**: Stores location details linked to an activity (activity\_id, name, address, latitude, longitude, contact, confirmation\_number, website, map\_url, venue\_type, created\_at, updated\_at).
  * `latitude`: **NOT NULL**. You must provide a latitude (e.g., 40.7128).
  * `longitude`: **NOT NULL**. You must provide a longitude (e.g., -74.0060).
* **`transport_details`**: Stores transport-specific details linked to an activity (id, activity\_id, mode, carrier, booking\_reference, pickup\_time, pickup\_location, estimated\_cost, notes, created\_at, updated\_at). Note that specific departure/arrival times and locations from your documents are best placed in the `notes` column as dedicated columns for these don't exist in this table.
* **`travelers`**: Stores traveler details (id, trip\_id, first\_name, last\_name, nationality, sex, date\_of\_birth, phone\_number, email, created\_at, updated\_at).
* **`payments`**: Stores payment information (id, trip\_id, description, amount, currency, payment\_date, created\_at, updated\_at).

*`weather`, `reminders`, `documents`, and `seat_maps` tables also exist but were not populated with detailed data in the provided files.*

### 2\. Part 1: Adding New Days and Activities

This section guides you through inserting entirely new data into your itinerary.

**Step 1: Collect All the Data**

Gather all the information for the new day and each activity on that day, as detailed in the previous response. Be precise with times, dates, addresses, and especially remember to get Latitude and Longitude for locations and choose a valid `activity.type`.

**Step 2: Identify the Relevant Trip ID**

You need the `id` of the trip to which this day/activity belongs. If you already ran the initial script, query your `trips` table:

```sql
SELECT id, title FROM public.trips WHERE title = 'YOUR_TRIP_TITLE'; -- Replace with the actual trip title
```

Note down the `id`. If you are adding a new trip, you'll generate a new UUID for it (see the initial script for an example).

**Step 3: Generate the SQL INSERT Statements**

You'll create `INSERT` statements within a `DO $$...END $$;` block for robust execution, using `uuid_generate_v4()` for new IDs and referencing parent IDs where needed.

* Start with the `itinerary_days` INSERT (if adding a new day).
* Then, for each activity on that day, create an `activities` INSERT.
* If an activity has a location or transport details, create `locations` or `transport_details` INSERTS linked using the `activity_id`.

**Example: Adding Data for Saturday, June 14th**

This example shows the SQL to insert the data for the first day of your trip, including two activities (a flight and accommodation check-in), their locations, and transport details for the flight. This assumes the trip record already exists.

```sql
DO $$
DECLARE
  current_trip_id UUID := (SELECT id FROM public.trips WHERE title = 'FIFA Club World Cup 2025' LIMIT 1); -- Get the trip ID
  day_jun_14_id UUID;
  activity_flight_out_id UUID;
  activity_accommodation_in_id UUID;
BEGIN

  -- Insert Itinerary Day for June 14th
  INSERT INTO public.itinerary_days (id, trip_id, date, title, summary)
  VALUES (
    uuid_generate_v4(),
    current_trip_id,
    '2025-06-14',
    'Arrival in New York',
    NULL -- No summary for this day in the source
  )
  ON CONFLICT DO NOTHING
  RETURNING id INTO day_jun_14_id;

  -- If the day might already exist, retrieve its ID
  IF day_jun_14_id IS NULL THEN
    SELECT id INTO day_jun_14_id FROM public.itinerary_days
    WHERE trip_id = current_trip_id AND date = '2025-06-14' LIMIT 1;
  END IF;

  -- Activity: Outbound Flight DL0141
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, duration, notes, status, sequence_order, important, requires_confirmation, is_group_event)
  VALUES (
    uuid_generate_v4(),
    day_jun_14_id,
    'transport', -- Valid ENUM value
    'Outbound Flight DL0141 - Brussels (BRU) → New York (JFK)',
    '10:45:00', -- Specific time provided
    '2h 15m', -- Calculated duration
    'Flight DL0141. Departure: 10:45 from Brussels (BRU). Arrival: 13:00 at New York (JFK). Cabin: Main cabin. Baggage: 1x23 Kg (for Abdelmoneme Naifer). Ticket Number: 057 233 470 143 3.', -- Details in notes
    'pending',
    1,
    TRUE, -- Requires confirmation (boarding pass)
    FALSE -- Not a group event in the activity table sense
  )
  ON CONFLICT DO NOTHING
  RETURNING id INTO activity_flight_out_id;

  -- If the activity might already exist, retrieve its ID
  IF activity_flight_out_id IS NULL THEN
     SELECT id INTO activity_flight_out_id FROM public.activities
     WHERE itinerary_day_id = day_jun_14_id AND title = 'Outbound Flight DL0141 - Brussels (BRU) → New York (JFK)' LIMIT 1;
  END IF;

  -- Add transport details for the flight
  INSERT INTO public.transport_details (id, activity_id, mode, carrier, booking_reference, notes)
  VALUES (
    uuid_generate_v4(), -- New ID for transport details
    activity_flight_out_id, -- Link to the flight activity
    'Flight', -- Mode
    'DELTA AIR LINES', -- Carrier
    'TTA4RV', -- Booking Reference
    'Flight DL0141. Departure: 10:45 from Brussels (BRU). Arrival: 13:00 at New York (JFK). Ticket Number: 057 233 470 143 3. Cabin: Main cabin. Baggage: 1x23 Kg (for Abdelmoneme Naifer).' -- More details in notes
  )
  ON CONFLICT DO NOTHING;


  -- Activity: Check-in at Jersey City Accommodation
  INSERT INTO public.activities (id, itinerary_day_id, type, title, time, notes, status, sequence_order, important, requires_confirmation, is_group_event)
  VALUES (
    uuid_generate_v4(),
    day_jun_14_id,
    'accommodation', -- Valid ENUM value
    'Check-in at Jersey City Accommodation',
    '16:00:00', -- Time is "After 16:00", using 16:00 as a placeholder
    'Guests: 6 adults, Host: Mariam Mikhaeil',
    'pending',
    2,
    TRUE, -- Requires confirmation (reservation details)
    TRUE -- Assuming accommodation is for the group
  )
   ON CONFLICT DO NOTHING
  RETURNING id INTO activity_accommodation_in_id;

  -- If the activity might already exist, retrieve its ID
  IF activity_accommodation_in_id IS NULL THEN
     SELECT id INTO activity_accommodation_in_id FROM public.activities
     WHERE itinerary_day_id = day_jun_14_id AND title = 'Check-in at Jersey City Accommodation' LIMIT 1;
  END IF;

  -- Add location for Jersey City Accommodation
  INSERT INTO public.locations (activity_id, name, address, latitude, longitude, confirmation_number)
  VALUES (
    activity_accommodation_in_id, -- Link to the accommodation activity
    'Jersey City Accommodation',
    '35 Dwight St, 1st floor, Jersey City, NJ, 07305, United States of America',
    40.70150358390281, -- Real Latitude
    -74.08068809411188, -- Real Longitude
    'HA-50R169' -- Confirmation number for the location/reservation
  )
  ON CONFLICT (activity_id) DO UPDATE SET -- If a location for this activity already exists, update it
    name = EXCLUDED.name,
    address = EXCLUDED.address,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    contact = EXCLUDED.contact, -- These are NULL in the example, but included for completeness
    confirmation_number = EXCLUDED.confirmation_number,
    website = EXCLUDED.website, -- These are NULL in the example
    map_url = EXCLUDED.map_url, -- These are NULL in the example
    venue_type = EXCLUDED.venue_type; -- These are NULL in the example


END $$;
```

### 3\. Part 2: Modifying Existing Data

This is for changing details of data already present in your database.

**Step 1: Identify the Data to Modify**

You need a way to tell the database exactly which row(s) to change. The most reliable way is using the `id` column. You can find the ID by querying the relevant table using other known information.

* To find a Day:

    ```sql
    SELECT id, date, title FROM public.itinerary_days WHERE date = 'THE_DATE_TO_MODIFY' AND trip_id = 'YOUR_TRIP_ID';
    ```

* To find an Activity:

    ```sql
    SELECT id, title, time FROM public.activities WHERE title = 'THE_ACTIVITY_TITLE_TO_MODIFY' AND itinerary_day_id = 'THE_DAY_ID_THIS_ACTIVITY_IS_ON';
    ```

* To find Location/Transport for an Activity:

    ```sql
    SELECT * FROM public.locations WHERE activity_id = 'THE_ACTIVITY_ID';
    SELECT * FROM public.transport_details WHERE activity_id = 'THE_ACTIVITY_ID';
    ```

Note down the `id`(s).

**Step 2: Generate the SQL UPDATE Statements**

Use the `UPDATE` command, specifying the table, the columns and their new values using `SET`, and crucially, a `WHERE` clause to target the specific row(s) using the `id` you found.

```sql
-- To modify a Day's summary
UPDATE public.itinerary_days
SET summary = 'This is the revised summary for this day.'
WHERE id = 'THE_DAY_ID_TO_MODIFY'; -- Replace with the actual day ID

-- To modify an Activity's time and notes
UPDATE public.activities
SET
  time = '14:00:00', -- Change the time
  notes = 'Updated notes: New meeting point at the entrance.' -- Change the notes
WHERE id = 'THE_ACTIVITY_ID_TO_MODIFY'; -- Replace with the actual activity ID

-- To change the type of an activity
UPDATE public.activities
SET type = 'meal' -- Change the type to 'meal' (must be a valid enum value)
WHERE id = 'THE_ACTIVITY_ID_TO_MODIFY';

-- To modify a Location's address or coordinates
UPDATE public.locations
SET
  address = '456 New St, Another City',
  latitude = YOUR_NEW_LATITUDE,
  longitude = YOUR_NEW_LONGITUDE
WHERE activity_id = 'THE_ACTIVITY_ID_LINKED_TO_LOCATION'; -- Replace with the activity ID linked to this location

-- To modify Transport Details
UPDATE public.transport_details
SET
  carrier = 'Another Airline',
  booking_reference = 'NEWBOOKREF456',
  notes = 'Updated flight details: Flight AA789, Terminal B.'
WHERE activity_id = 'THE_ACTIVITY_ID_LINKED_TO_TRANSPORT'; -- Assuming activity_id is unique in transport_details, otherwise use transport_detail's id. If a new transport detail needs to replace an old one, you might DELETE the old and INSERT the new.
```

### 4\. Deleting Data

Deleting data also requires SQL `DELETE` statements. Be careful with deletions, especially due to foreign key constraints. You often need to delete data in related tables *before* deleting the main record.

```sql
-- To delete transport details for an activity
DELETE FROM public.transport_details WHERE activity_id = 'THE_ACTIVITY_ID';

-- To delete location details for an activity
DELETE FROM public.locations WHERE activity_id = 'THE_ACTIVITY_ID';

-- To delete an Activity (Note: You must delete related locations/transport first if they exist)
DELETE FROM public.activities WHERE id = 'THE_ACTIVITY_ID_TO_DELETE';

-- To delete a Day (Note: You must delete all associated activities first, which in turn requires deleting their related locations/transport details)
DELETE FROM public.itinerary_days WHERE id = 'THE_DAY_ID_TO_DELETE';

-- To delete a Trip (Note: Requires deleting all associated days, activities, locations, transport, travelers, payments first)
DELETE FROM public.trips WHERE id = 'THE_TRIP_ID_TO_DELETE';
```

### 5\. Batch Operations: Adding Multiple Rows

If you need to add many rows to the same table (e.g., multiple activities on a day, or multiple travelers), you can use a single `INSERT` statement with multiple sets of values. This is more efficient than separate `INSERT` statements.

```sql
-- Example: Adding multiple activities for a single day
INSERT INTO public.activities (id, itinerary_day_id, type, title, time, duration, notes, status, sequence_order, important, requires_confirmation, is_group_event)
VALUES
(
  uuid_generate_v4(), -- ID for Activity 1
  day_id, -- Link to the day
  'activity',
  'Morning Walk',
  '08:00:00',
  '1h',
  NULL,
  'completed',
  1,
  FALSE, FALSE, FALSE
),
(
  uuid_generate_v4(), -- ID for Activity 2
  day_id, -- Link to the same day
  'meal',
  'Breakfast',
  '09:00:00',
  '45m',
  'At the hotel restaurant',
  'pending',
  2,
  FALSE, FALSE, TRUE -- Assuming group breakfast
),
(
  uuid_generate_v4(), -- ID for Activity 3
  day_id, -- Link to the same day
  'activity',
  'Visit Museum',
  '11:00:00',
  '2h',
  NULL,
  'pending',
  3,
  TRUE, FALSE, TRUE -- Assuming group museum visit
); -- Add more sets of values for each activity
```

You can combine multiple `INSERT`, `UPDATE`, and `DELETE` statements within a single `DO $$...END $$;` block to perform multiple operations in one go, as demonstrated in the initial full script.

### 6\. Executing Your SQL

1. Open your database client or the SQL Editor in your Supabase dashboard.
2. Copy the generated SQL script.
3. Paste it into the SQL editor.
4. Execute the script.

Always double-check your `WHERE` clauses in `UPDATE` and `DELETE` statements to ensure you are only affecting the intended rows.

### 7\. Troubleshooting Common Errors

Here are some common errors you might encounter and how to approach them:

* **`ERROR: column "column_name" of relation "table_name" does not exist`**:
  * **Cause:** You are trying to use a column in your `INSERT` or `UPDATE` statement that does not exist in the table's schema.
  * **Fix:** Check your table schema (e.g., using `\d table_name` in a psql client or the Supabase Table Editor) and correct your SQL to use only existing columns. If you need that column, you must add it to the table schema using `ALTER TABLE ADD COLUMN`.
* **`ERROR: invalid input value for enum activity_type: "invalid_value"`**:
  * **Cause:** You are trying to insert a value into the `activities.type` column that is not one of the predefined allowed values for the `activity_type` enum.
  * **Fix:** Query the allowed values for the `activity_type` enum (`SELECT enumlabel FROM pg_enum WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'activity_type');`) and correct your `INSERT` or `UPDATE` statement to use a valid value. If you need a new value, you must add it to the enum using `ALTER TYPE activity_type ADD VALUE 'new_value';`.
* **`ERROR: null value in column "column_name" of relation "table_name" violates not-null constraint`**:
  * **Cause:** You are trying to insert or update a row where a column that is defined as `NOT NULL` has been given a `NULL` value. This happened with `activities.time` and `locations.latitude`/`longitude`.
  * **Fix:** Ensure you provide a non-null value for the specified column in your `INSERT` or `UPDATE` statement. If the data is truly optional, you might need to alter the table schema to remove the `NOT NULL` constraint (`ALTER TABLE table_name ALTER COLUMN column_name DROP NOT NULL;`).
* **`ERROR: foreign key constraint "constraint_name" on table "table_name" violates foreign key constraint "constraint_name" on table "another_table"`**: (Or similar foreign key errors)
  * **Cause:** You are trying to insert a row that references a non-existent parent row (e.g., inserting an activity with a `itinerary_day_id` that doesn't exist in `itinerary_days`) or trying to delete a parent row that is still referenced by child rows (e.g., deleting a day that still has activities linked to it).
  * **Fix:** Ensure that parent records exist before inserting child records. When deleting, delete child records (e.g., transport\_details, locations, activities) before deleting their parent records (e.g., itinerary\_days, trips).
* **`ERROR: unterminated dollar-quoted string at or near "$$..."`**:
  * **Cause:** There's a syntax error within your `DO $$...END $$;` block, often an unclosed string literal (missing single quote `'`) or other malformed SQL that prevents the parser from correctly identifying the end of the block.
  * **Fix:** Carefully review the SQL code within the `DO $$...END $$;` block for syntax errors, especially unclosed quotes or misplaced characters.

By following these steps and referring back to your specific database schema and allowed enum values, you should be able to effectively manage your itinerary data using SQL.
