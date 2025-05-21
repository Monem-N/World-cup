/**
 * Itinerary Data Validator
 * 
 * This script validates the converted JSON files against the standardized schema.
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Configuration
const targetDir = 'doc/itineraires/standardized';
const schemaPath = 'doc/itineraires/itineraries/standardized_schema.json';

// Load schema
let schema;
try {
  schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  console.log('Loaded schema successfully');
} catch (error) {
  console.error('Error loading schema:', error);
  process.exit(1);
}

// Initialize validator
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

// Process each file
const files = fs.readdirSync(targetDir).filter(file => file.endsWith('.json'));
console.log(`Found ${files.length} standardized JSON files to validate`);

let validCount = 0;
let invalidCount = 0;
let errorDetails = [];

files.forEach(file => {
  try {
    console.log(`Validating ${file}...`);
    
    // Read file
    const data = JSON.parse(fs.readFileSync(path.join(targetDir, file), 'utf8'));
    
    // Validate against schema
    const valid = validate(data);
    
    if (valid) {
      validCount++;
      console.log(`✅ ${file} is valid`);
    } else {
      invalidCount++;
      console.log(`❌ ${file} is invalid`);
      
      // Collect error details
      const fileErrors = validate.errors.map(err => ({
        file,
        path: err.instancePath,
        message: err.message,
        params: err.params
      }));
      
      errorDetails.push(...fileErrors);
      
      // Print first few errors
      console.log('  First 3 errors:');
      fileErrors.slice(0, 3).forEach(err => {
        console.log(`  - ${err.path}: ${err.message}`);
      });
      
      if (fileErrors.length > 3) {
        console.log(`  ... and ${fileErrors.length - 3} more errors`);
      }
    }
  } catch (error) {
    invalidCount++;
    console.error(`Error validating ${file}:`, error);
    errorDetails.push({
      file,
      path: '',
      message: `Error parsing file: ${error.message}`,
      params: {}
    });
  }
});

// Generate summary report
console.log(`
Validation complete:
- ${validCount} valid files
- ${invalidCount} invalid files
`);

// Save error details to a file if there are any
if (errorDetails.length > 0) {
  const reportPath = path.join(targetDir, 'validation_errors.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify({ errors: errorDetails }, null, 2),
    'utf8'
  );
  console.log(`Detailed error report saved to ${reportPath}`);
}

// Exit with appropriate code
process.exit(invalidCount > 0 ? 1 : 0);
