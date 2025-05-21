/**
 * Itinerary Data Converter
 *
 * This script converts existing JSON itinerary files to the standardized format
 * defined in standardized_schema.json.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const sourceDir = path.join(__dirname, 'doc/itineraires/json');
const targetDir = path.join(__dirname, 'doc/itineraires/standardized');
const schemaPath = path.join(__dirname, 'doc/itineraires/itineraries/standardized_schema.json');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Load schema for reference (not used for validation in this script)
let schema;
try {
  schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  console.log('Loaded schema successfully');
} catch (error) {
  console.error('Error loading schema:', error);
  process.exit(1);
}

/**
 * Converts from the existing JSON file format to the standardized format
 * @param {Object} sourceData - Data from the existing JSON files
 * @param {string} filename - Original filename for reference
 * @returns {Array} - Array of standardized itinerary day objects
 */
function convertFromExistingJson(sourceData, filename) {
  const result = [];

  // Generate a consistent trip_id for all days in this file
  const trip_id = uuidv4();

  // Process each day
  if (sourceData.days && Array.isArray(sourceData.days)) {
    sourceData.days.forEach((day, index) => {
      // Create a standardized day object
      const standardDay = {
        id: uuidv4(), // Generate a UUID
        trip_id: trip_id,
        date: day.date,
        title: day.title || sourceData.title,
        summary: day.summary || sourceData.summary || '',
      };

      // Add weather if available
      if (day.weather && Object.keys(day.weather).length > 0) {
        standardDay.weather = {
          temperature: day.weather.temperature || 0,
          condition: day.weather.condition || 'Unknown',
          icon: day.weather.icon || 'default'
        };
      }

      // Add reminders if available
      if (day.reminders && Array.isArray(day.reminders)) {
        standardDay.reminders = day.reminders;
      }

      // Convert activities from schedule
      if (day.schedule && Array.isArray(day.schedule)) {
        standardDay.activities = day.schedule.map((item, activityIndex) => {
          // Always generate a new UUID for the activity ID to ensure it matches the format
          const activity = {
            id: uuidv4(), // Generate a new UUID regardless of whether item.id exists
            type: item.type,
            title: item.title,
            time: formatTime(item.time), // Ensure time is in HH:MM:SS format
            status: item.status || 'pending',
            sequence_order: activityIndex + 1
          };

          // Store the original ID in metadata if it exists
          if (item.id) {
            activity.original_id = item.id;
          }

          // Add optional fields
          if (item.duration) activity.duration = item.duration;
          if (item.description) activity.notes = item.description;
          if (item.important !== undefined) activity.important = item.important;
          if (item.requires_confirmation !== undefined) {
            activity.requires_confirmation = item.requires_confirmation;
          } else if (item.requiresConfirmation !== undefined) {
            activity.requires_confirmation = item.requiresConfirmation;
          }
          if (item.is_group_event !== undefined) {
            activity.is_group_event = item.is_group_event;
          } else if (item.isGroupEvent !== undefined) {
            activity.is_group_event = item.isGroupEvent;
          }

          // Convert location
          if (item.location) {
            activity.location = {
              name: item.location.name
            };

            // Add coordinates if available
            if (item.location.coordinates) {
              activity.location.latitude = item.location.coordinates.lat;
              activity.location.longitude = item.location.coordinates.lng;
            } else if (item.location.lat !== undefined && item.location.lng !== undefined) {
              activity.location.latitude = item.location.lat;
              activity.location.longitude = item.location.lng;
            }

            // Add other location details if available
            if (item.location.address) activity.location.address = item.location.address;
            if (item.location.contact) activity.location.contact = item.location.contact;
            if (item.location.confirmation_number) {
              activity.location.confirmation_number = item.location.confirmation_number;
            } else if (item.location.confirmationNumber) {
              activity.location.confirmation_number = item.location.confirmationNumber;
            }
          }

          // Convert transport details
          if (item.transport) {
            activity.transport = {
              mode: item.transport.mode
            };

            // Add optional transport fields
            if (item.transport.carrier) activity.transport.carrier = item.transport.carrier;
            if (item.transport.booking_reference) {
              activity.transport.booking_reference = item.transport.booking_reference;
            } else if (item.transport.bookingReference) {
              activity.transport.booking_reference = item.transport.bookingReference;
            } else if (item.transport.number) {
              activity.transport.booking_reference = item.transport.number;
            }

            if (item.transport.seat_map) {
              activity.transport.seat_map = item.transport.seat_map;
            } else if (item.transport.seatMap) {
              activity.transport.seat_map = item.transport.seatMap;
            }

            if (item.transport.pickup_time) {
              activity.transport.pickup_time = formatTime(item.transport.pickup_time);
            }
            if (item.transport.pickup_location) {
              activity.transport.pickup_location = item.transport.pickup_location;
            }
            if (item.transport.estimated_cost) {
              activity.transport.estimated_cost = item.transport.estimated_cost;
            }
            if (item.transport.shared_with && Array.isArray(item.transport.shared_with)) {
              activity.transport.shared_with = item.transport.shared_with;
            }
            if (item.transport.notes) activity.transport.notes = item.transport.notes;
          }

          // Convert attachments if available
          if (item.attachments && Array.isArray(item.attachments)) {
            activity.attachments = item.attachments.map(att => {
              if (typeof att === 'string') {
                return { file_name: att };
              }
              return {
                file_name: att.file_name || att,
                file_path: att.file_path || `/attachments/${att.file_name || att}`,
                file_type: att.file_type || 'application/octet-stream'
              };
            });
          }

          return activity;
        });
      }

      // Add metadata
      standardDay.metadata = {
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        source: 'json_conversion',
        version: '1.0',
        timezone: 'Europe/Paris', // Assuming Paris timezone for World Cup
        original_filename: filename,
        // Store additional information that doesn't fit elsewhere
        additional_data: {}
      };

      // Store additional data that doesn't directly map to the schema
      if (day.tips && Array.isArray(day.tips)) {
        standardDay.metadata.additional_data.tips = day.tips;
      }
      if (day.checklist && Array.isArray(day.checklist)) {
        standardDay.metadata.additional_data.checklist = day.checklist;
      }
      if (day.mapView) {
        standardDay.metadata.additional_data.mapView = day.mapView;
      }
      if (day.placesToVisitLater) {
        standardDay.metadata.additional_data.placesToVisitLater = day.placesToVisitLater;
      }

      result.push(standardDay);
    });
  }

  // Store trip-level information in metadata of each day
  if (result.length > 0) {
    if (sourceData.practicalActions) {
      result.forEach(day => {
        day.metadata.additional_data.practicalActions = sourceData.practicalActions;
      });
    }
    if (sourceData.concludingRemarks) {
      result.forEach(day => {
        day.metadata.additional_data.concludingRemarks = sourceData.concludingRemarks;
      });
    }
  }

  return result;
}

/**
 * Helper function to ensure time is in HH:MM:SS format
 * @param {string} timeString - Time string to format
 * @returns {string} - Formatted time string
 */
function formatTime(timeString) {
  if (!timeString) return '00:00:00';

  try {
    // If already in HH:MM:SS format, validate and return
    if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
        return timeString;
      }
    }

    // If in HH:MM format, validate and add seconds
    if (/^\d{2}:\d{2}$/.test(timeString)) {
      const [hours, minutes] = timeString.split(':').map(Number);
      if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        return `${timeString}:00`;
      }
    }

    // Try to parse other formats
    const parts = timeString.split(':');

    if (parts.length === 1) {
      // Handle just hours (e.g., "9" or "14")
      const hours = parseInt(parts[0], 10);
      if (!isNaN(hours) && hours >= 0 && hours < 24) {
        return `${hours.toString().padStart(2, '0')}:00:00`;
      }
    } else if (parts.length === 2) {
      // Handle hours and minutes (e.g., "9:30" or "14:45")
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
      }
    } else if (parts.length === 3) {
      // Handle hours, minutes, and seconds with validation
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds) &&
          hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }

    // Try to extract time from strings like "9h", "14h30", etc.
    const hourMinuteMatch = timeString.match(/^(\d{1,2})h(\d{2})?$/);
    if (hourMinuteMatch) {
      const hours = parseInt(hourMinuteMatch[1], 10);
      const minutes = hourMinuteMatch[2] ? parseInt(hourMinuteMatch[2], 10) : 0;
      if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
      }
    }
  } catch (error) {
    console.warn(`Error formatting time "${timeString}":`, error);
  }

  // Default fallback for unparseable times
  console.warn(`Could not parse time string: "${timeString}", using default`);
  return '00:00:00';
}

// Process each file
const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.json') && !file.startsWith('.'));
console.log(`Found ${files.length} JSON files to process`);

let successCount = 0;
let errorCount = 0;
let totalDaysConverted = 0;

files.forEach(file => {
  try {
    console.log(`Processing ${file}...`);

    // Read source file
    const sourceData = JSON.parse(fs.readFileSync(path.join(sourceDir, file), 'utf8'));

    // Convert to standardized format
    const standardizedDays = convertFromExistingJson(sourceData, file);
    totalDaysConverted += standardizedDays.length;

    // Save each day as a separate file
    standardizedDays.forEach((day) => {
      const baseName = path.basename(file, '.json');
      const targetFile = `${baseName}_${day.date}.json`;

      fs.writeFileSync(
        path.join(targetDir, targetFile),
        JSON.stringify(day, null, 2),
        'utf8'
      );
    });

    successCount++;
    console.log(`Successfully processed ${file} into ${standardizedDays.length} standardized day(s)`);
  } catch (error) {
    errorCount++;
    console.error(`Error processing ${file}:`, error);
  }
});

console.log(`
Conversion complete:
- ${successCount} files processed successfully
- ${errorCount} files with errors
- ${totalDaysConverted} total days converted
- Standardized files saved to ${targetDir}
`);
