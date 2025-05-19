# World Cup Itinerary Supabase Setup

This directory contains SQL files to set up the database schema for the World Cup Itinerary application in Supabase.

## Files

- `schema.sql`: Creates the database tables and relationships
- `rls.sql`: Sets up Row Level Security (RLS) policies
- `functions.sql`: Creates functions and triggers
- `sample_data.sql`: Inserts sample data for testing

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create an account
2. Create a new project
3. Note your project URL and API keys

### 2. Run the SQL Files

Run the SQL files in the following order:

1. `schema.sql`
2. `rls.sql`
3. `functions.sql`
4. `sample_data.sql` (optional, for testing)

You can run these files in the Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Create a new query
4. Copy and paste the contents of each file
5. Click "Run" to execute the SQL

### 3. Update Sample Data (Optional)

If you want to use the sample data, you need to update the user ID in `sample_data.sql`:

1. Get your user ID from Supabase Auth
2. Replace `'00000000-0000-0000-0000-000000000000'` with your actual user ID
3. Run the updated SQL

### 4. Configure Storage Buckets

Create the following storage buckets for file uploads:

1. `documents`: For itinerary day documents
2. `attachments`: For activity attachments
3. `avatars`: For user profile avatars

Set appropriate bucket policies:

```sql
-- Example bucket policy for documents
CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
USING (auth.uid() = (
  SELECT trips.user_id
  FROM public.documents
  JOIN public.itinerary_days ON documents.itinerary_day_id = itinerary_days.id
  JOIN public.trips ON itinerary_days.trip_id = trips.id
  WHERE storage.filename(name) = documents.file_path
  LIMIT 1
));
```

### 5. Set Up API and Authentication

1. Configure authentication providers in Supabase Auth
2. Set up email templates for authentication
3. Configure CORS settings for your frontend domain

## Database Schema

The database schema includes the following tables:

- `profiles`: User profiles (extends Supabase Auth)
- `trips`: Travel trips
- `itinerary_days`: Days within a trip
- `activities`: Activities within a day
- `locations`: Locations for activities
- `transport_details`: Transport information
- `seat_maps`: Seat assignments for transport
- `shared_transport`: Users sharing transport
- `attachments`: Files attached to activities
- `weather`: Weather information for days
- `reminders`: Reminders for days
- `documents`: Documents for days
- `travel_essentials`: Packing list items

## API Functions

The setup includes the following API functions:

- `get_itinerary_day(day_id)`: Get a complete itinerary day with all related data
- `user_owns_activity(activity_id)`: Check if a user owns an activity (used in RLS)

## Extending the Schema

To extend the schema:

1. Add new tables or columns in a new SQL file
2. Add appropriate RLS policies
3. Update functions as needed
4. Run the SQL in the Supabase SQL Editor

## Troubleshooting

- **RLS Issues**: If you can't access data, check the RLS policies
- **Function Errors**: Check the function logs in the Supabase dashboard
- **Sample Data**: Make sure to update the user ID in `sample_data.sql`
