-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.get_itinerary_day;

-- Create a simpler version of the function
CREATE OR REPLACE FUNCTION public.get_itinerary_day(day_id UUID)
RETURNS JSONB AS $$
DECLARE
  day_data JSONB;
  activities_data JSONB;
  weather_data JSONB;
  reminders_data JSONB;
  docs_data JSONB;
BEGIN
  -- Get basic day data
  SELECT jsonb_build_object(
    'id', id,
    'date', date,
    'title', title,
    'summary', summary
  )
  INTO day_data
  FROM public.itinerary_days
  WHERE id = day_id;
  
  -- Get weather data
  SELECT jsonb_build_object(
    'temperature', temperature,
    'condition', condition,
    'icon', icon
  )
  INTO weather_data
  FROM public.weather
  WHERE itinerary_day_id = day_id
  LIMIT 1;
  
  -- Get reminders
  SELECT jsonb_agg(text)
  INTO reminders_data
  FROM public.reminders
  WHERE itinerary_day_id = day_id;
  
  -- Get documents
  SELECT jsonb_agg(file_name)
  INTO docs_data
  FROM public.documents
  WHERE itinerary_day_id = day_id;
  
  -- Get activities
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', id,
      'type', type,
      'title', title,
      'time', time,
      'duration', duration,
      'notes', notes,
      'status', status,
      'important', important,
      'requires_confirmation', requires_confirmation,
      'is_group_event', is_group_event
    ) ORDER BY sequence_order
  )
  INTO activities_data
  FROM public.activities
  WHERE itinerary_day_id = day_id;
  
  -- Combine all data
  RETURN jsonb_build_object(
    'id', (day_data->>'id'),
    'date', (day_data->>'date'),
    'title', (day_data->>'title'),
    'summary', (day_data->>'summary'),
    'weather', weather_data,
    'reminders', reminders_data,
    'docs', docs_data,
    'items', activities_data
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
