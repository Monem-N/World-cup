# Standardized Itinerary Data

This directory contains itinerary data that has been converted to the standardized format defined in `doc/itineraires/itineraries/standardized_schema.json`.

## Conversion Process

The original JSON files from `doc/itineraires/json` were converted to the standardized format using the `convert_itineraries.mjs` script. The conversion process involved:

1. Reading each original JSON file
2. Converting the data to match the standardized schema
3. Generating UUIDs for required fields
4. Formatting time strings to match the required format (HH:MM:SS)
5. Splitting multi-day itineraries into separate day files
6. Preserving all original data, even if it doesn't directly map to the schema (stored in metadata)

## File Naming Convention

The standardized files follow this naming convention:

```
{original_filename}_{date}.json
```

For example, the file `14-06.json` containing data for June 14, 2025, was converted to `14-06_2025-06-14.json`.

## Data Structure

Each standardized file represents a single day's itinerary and follows the structure defined in the standardized schema:

- `id`: UUID for the itinerary day
- `trip_id`: UUID for the trip this day belongs to
- `date`: Date in YYYY-MM-DD format
- `title`: Title of the day's itinerary
- `summary`: Brief summary of the day
- `weather`: Weather information (if available)
- `reminders`: List of reminders for the day
- `activities`: List of activities for the day
  - Each activity has a type, time, status, and other details
  - Activities include transport, matches, meals, hotel check-ins, etc.
- `metadata`: Additional information about the itinerary day
  - Includes creation/update timestamps, data source, etc.
  - Also contains additional data from the original files that doesn't directly map to the schema

## Validation

All files in this directory have been validated against the standardized schema using the `validate_converted.mjs` script. The validation ensures that:

- All required fields are present
- Field types and formats are correct
- Enumerated values (like activity types and status) are valid

## Usage

These standardized files can be used directly by the application, ensuring consistent data structure across all itineraries.

## Original Data Preservation

While the data has been restructured to match the standardized schema, no information has been lost in the conversion process. Data that doesn't directly map to the schema has been preserved in the `metadata.additional_data` field of each file.

## Mapping from Original to Standardized Format

Here's a summary of how the original data was mapped to the standardized format:

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
