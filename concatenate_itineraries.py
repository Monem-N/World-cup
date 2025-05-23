import json
import os

source_dir = 'doc/itineraires/standardized/'
target_file = 'doc/itineraires/json/itineraries.json'
target_dir = os.path.dirname(target_file)

# Create target directory if it doesn't exist
os.makedirs(target_dir, exist_ok=True)

all_itineraries = []

# List files in the source directory
try:
    files = os.listdir(source_dir)
except FileNotFoundError:
    print(f"Source directory not found: {source_dir}")
    exit()

# Filter for JSON files and sort them alphabetically
json_files = sorted([f for f in files if f.endswith('.json')])

for filename in json_files:
    filepath = os.path.join(source_dir, filename)
    try:
        with open(filepath, 'r') as f:
            itinerary_data = json.load(f)
            all_itineraries.append(itinerary_data)
    except json.JSONDecodeError:
        print(f"Error decoding JSON from file: {filepath}")
    except FileNotFoundError:
        print(f"File not found: {filepath}")
    except Exception as e:
        print(f"An error occurred while reading {filepath}: {e}")

# Write the concatenated data to the target file
try:
    with open(target_file, 'w') as f:
        json.dump(all_itineraries, f, indent=2)
    print(f"Successfully concatenated {len(json_files)} files into {target_file}")
except Exception as e:
    print(f"An error occurred while writing to {target_file}: {e}")