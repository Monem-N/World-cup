# Itinerary Data Standardization

This project standardizes itinerary data by converting existing JSON files to a consistent format defined in a standardized schema.

## Scripts

### `convert_itineraries.mjs`

This script converts the original JSON files to the standardized format.

```bash
node convert_itineraries.mjs
```

The script:
- Reads JSON files from `doc/itineraires/json`
- Converts them to match the standardized schema
- Generates UUIDs for required fields
- Formats time strings to match the required format
- Splits multi-day itineraries into separate day files
- Preserves all original data, even if it doesn't directly map to the schema
- Saves the converted files to `doc/itineraires/standardized`

### `validate_converted.mjs`

This script validates the converted files against the standardized schema.

```bash
node validate_converted.mjs
```

The script:
- Reads JSON files from `doc/itineraires/standardized`
- Validates them against the schema in `doc/itineraires/itineraries/standardized_schema.json`
- Reports any validation errors
- Exits with code 0 if all files are valid, 1 otherwise

## Schema

The standardized schema is defined in `doc/itineraires/itineraries/standardized_schema.json`. It defines the structure for itinerary data, including:

- Basic information (ID, trip ID, date, title, summary)
- Weather information
- Reminders
- Activities (with detailed sub-structures for locations, transport details, and attachments)
- Metadata

## Implementation Details

### Data Mapping

The conversion process maps data from the original format to the standardized format:

- `dateRange` → `date` (split into multiple files for date ranges)
- `title` → `title`
- `summary` → `summary`
- `days[].date` → `date`
- `days[].title` → `title`
- `days[].weather` → `weather`
- `days[].schedule` → `activities`
- `days[].schedule[].id` → `activities[].original_id` (new UUIDs were generated for `activities[].id`)
- `days[].schedule[].type` → `activities[].type`
- `days[].schedule[].time` → `activities[].time` (reformatted to HH:MM:SS)
- `days[].schedule[].title` → `activities[].title`
- `days[].schedule[].status` → `activities[].status`
- `days[].schedule[].location` → `activities[].location`
- `days[].schedule[].transport` → `activities[].transport`
- `days[].reminders` → `reminders`
- `days[].tips` → `metadata.additional_data.tips`
- `practicalActions` → `metadata.additional_data.practicalActions`
- `concludingRemarks` → `metadata.additional_data.concludingRemarks`

### UUID Generation

The script generates UUIDs for required fields:
- `id`: A unique identifier for each itinerary day
- `trip_id`: A consistent identifier for all days in the same file
- `activities[].id`: A unique identifier for each activity

### Time Formatting

The script ensures all time strings are in the HH:MM:SS format required by the schema. It handles various input formats:
- HH:MM:SS (already valid)
- HH:MM (adds ":00" for seconds)
- Single numbers (interprets as hours)
- "Xh" or "XhYY" format (e.g., "9h" or "14h30")

### Additional Data Preservation

Data that doesn't directly map to the schema is preserved in the `metadata.additional_data` field, ensuring no information is lost during conversion.

## Results

The conversion process successfully standardized all itinerary files:
- 10 original JSON files were processed
- 15 standardized day files were generated (some original files contained multiple days)
- All standardized files pass validation against the schema

## Future Enhancements

Potential future enhancements to this standardization process include:
1. Adding support for incremental updates to avoid full reconversion
2. Implementing two-way conversion (standardized → original format)
3. Creating a web interface for viewing and editing standardized data
4. Adding more detailed validation rules for specific fields
5. Supporting versioning and change tracking for itinerary data
