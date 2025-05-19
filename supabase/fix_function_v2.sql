-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.get_itinerary_day;

-- Create a fixed version of the function
CREATE OR REPLACE FUNCTION public.get_itinerary_day(day_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
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
          'sequence_order', a.sequence_order,
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
      FROM (
        SELECT * FROM public.activities 
        WHERE itinerary_day_id = day_id
        ORDER BY sequence_order
      ) a
    )
  ) INTO result
  FROM public.itinerary_days id
  WHERE id.id = day_id;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
