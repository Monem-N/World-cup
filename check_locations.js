import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing standardized itinerary files
const STANDARDIZED_DIR = 'doc/itineraires/standardized';

// Get all JSON files in the directory
const files = fs.readdirSync(STANDARDIZED_DIR)
  .filter(file => file.endsWith('.json') && !file.startsWith('Icon'));

// Results object
const results = {};

// Check each file
files.forEach(file => {
  const filePath = path.join(STANDARDIZED_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Initialize results for this file
  results[file] = {
    totalActivities: 0,
    activitiesWithLocation: 0,
    activitiesWithCoordinates: 0,
    activitiesNeedingCoordinates: []
  };

  // Check activities
  if (data.activities && Array.isArray(data.activities)) {
    results[file].totalActivities = data.activities.length;

    data.activities.forEach((activity, index) => {
      if (activity.location) {
        results[file].activitiesWithLocation++;

        if (activity.location.latitude && activity.location.longitude) {
          results[file].activitiesWithCoordinates++;
        } else {
          results[file].activitiesNeedingCoordinates.push({
            index,
            id: activity.id,
            title: activity.title,
            type: activity.type
          });
        }
      }
    });
  }
});

// Print results
console.log('Location Analysis Results:');
console.log('==========================');

Object.keys(results).sort().forEach(file => {
  const result = results[file];
  console.log(`\nFile: ${file}`);
  console.log(`Total activities: ${result.totalActivities}`);
  console.log(`Activities with location: ${result.activitiesWithLocation}`);
  console.log(`Activities with coordinates: ${result.activitiesWithCoordinates}`);

  if (result.activitiesNeedingCoordinates.length > 0) {
    console.log('\nActivities needing coordinates:');
    result.activitiesNeedingCoordinates.forEach(activity => {
      console.log(`  - ${activity.title} (${activity.type}, ID: ${activity.id})`);
    });
  } else if (result.activitiesWithLocation > 0) {
    console.log('\nAll activities with location have coordinates.');
  } else if (result.totalActivities > 0) {
    console.log('\nNo activities have location information.');
  }
});
