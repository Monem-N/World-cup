import json
import os
import jsonschema
from jsonschema import validate

def analyze_itineraries(directory="doc/itineraires/json", schema_path="doc/itineraires/itineraries/standardized_schema.json"):
    """
    Analyzes JSON files in a directory to assess itinerary quality based on
    completeness, accuracy, and conformity to the standardized schema.

    Args:
        directory (str): The directory containing the JSON files.
        schema_path (str): Path to the standardized schema JSON file.

    Returns:
        dict: A dictionary containing the analysis results, including scores
              for each file and the best itinerary.
    """

    # Load the standardized schema
    try:
        with open(schema_path, "r") as f:
            schema = json.load(f)
    except Exception as e:
        print(f"Error loading schema: {e}")
        return {"error": f"Failed to load schema: {e}"}
    
    scores = {}
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            filepath = os.path.join(directory, filename)
            try:
                with open(filepath, "r") as f:
                    data = json.load(f)
                schema_conformity, validation_errors = validate_against_schema(data, schema)
                score = score_itinerary(data, schema_conformity)
                scores[filename] = score
                if validation_errors:
                    print(f"Validation errors in {filename}:")
                    for error in validation_errors:
                        print(f"  - {error}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")
                scores[filename] = 0  # Assign a score of 0 for files with errors

    best_itinerary = max(scores, key=scores.get)
    return {
        "scores": scores,
        "best_itinerary": best_itinerary,
        "justification": justify_best_itinerary(best_itinerary, directory)
    }


def validate_against_schema(data, schema):
    """
    Validates an itinerary against the standardized schema.

    Args:
        data (dict): The itinerary data in JSON format.
        schema (dict): The standardized schema to validate against.

    Returns:
        tuple: (score, validation_errors) where:
            - score is a float between 0 and 100 indicating schema conformity
            - validation_errors is a list of validation error messages
    """
    validation_errors = []
    
    try:
        validate(instance=data, schema=schema)
        return 100, []  # Full conformity, no errors
    except jsonschema.exceptions.ValidationError as e:
        validation_errors.append(str(e))
        
        # Calculate a partial score based on how many required fields are present
        required_fields = schema.get("required", [])
        if not required_fields:
            return 0, validation_errors
        
        # Count how many required fields are present in the data
        present_fields = sum(1 for field in required_fields if field in data)
        conformity_score = (present_fields / len(required_fields)) * 100
        
        # Check for nested structure conformity
        if "properties" in schema and isinstance(schema["properties"], dict):
            for prop_name, prop_schema in schema["properties"].items():
                if prop_name in data and "type" in prop_schema:
                    # Check if the property type matches
                    expected_type = prop_schema["type"]
                    if expected_type == "object" and not isinstance(data[prop_name], dict):
                        validation_errors.append(f"Property '{prop_name}' should be an object")
                    elif expected_type == "array" and not isinstance(data[prop_name], list):
                        validation_errors.append(f"Property '{prop_name}' should be an array")
        
        return conformity_score, validation_errors

def score_itinerary(data, schema_conformity=0):
    """
    Scores a single itinerary based on completeness, accuracy, and schema conformity.

    Args:
        data (dict): The itinerary data in JSON format.
        schema_conformity (float): The schema conformity score (0-100).

    Returns:
        float: The total score for the itinerary.
    """

    completeness_score = score_completeness(data)
    accuracy_score = score_accuracy(data)
    # Adjust weights to include schema conformity
    total_score = (0.4 * completeness_score) + (0.3 * accuracy_score) + (0.3 * schema_conformity)
    return total_score


def score_completeness(data):
    """
    Scores the completeness of an itinerary.

    Args:
        data (dict): The itinerary data.

    Returns:
        int: The completeness score (out of 100).
    """
    score = 0
    # Top-level fields
    if "dateRange" in data and "title" in data and "days" in data:
        score += 20
    if "summary" in data:
        score += 5

    # Day-level fields
    day_score = 0
    if "days" in data and isinstance(data["days"], list):
        for day in data["days"]:
            if "date" in day and "title" in day and "schedule" in day:
                day_score += 15
            if "weather" in day:
                day_score += 2
            if "tips" in day:
                day_score += 3
        score += min(25, day_score)  # Cap the day score at 25

    # Activity-level fields
    activity_score = 0
    if "days" in data and isinstance(data["days"], list):
        for day in data["days"]:
            if "schedule" in day and isinstance(day["schedule"], list):
                for activity in day["schedule"]:
                    if "time" in activity and "title" in activity:
                        activity_score += 5
                    if "type" in activity:
                        activity_score += 2
        score += min(30, activity_score)  # Cap the activity score at 30

    return score


def score_accuracy(data):
    """
    Scores the accuracy of an itinerary.

    Args:
        data (dict): The itinerary data.

    Returns:
        int: The accuracy score (out of 100).
    """
    score = 0

    # Data type checks (simplified)
    if "dateRange" in data and isinstance(data["dateRange"], str):
        score += 5
    if "title" in data and isinstance(data["title"], str):
        score += 5

    # Activity type checks
    if "days" in data and isinstance(data["days"], list):
        for day in data["days"]:
            if "schedule" in day and isinstance(day["schedule"], list):
                for activity in day["schedule"]:
                    if "type" in activity and activity["type"] in [
                        "transport",
                        "match",
                        "meal",
                        "hotel",
                        "activity",
                        "accommodation",
                    ]:
                        score += 5

    # Time format checks (very basic)
    if "days" in data and isinstance(data["days"], list):
        for day in data["days"]:
            if "schedule" in day and isinstance(day["schedule"], list):
                for activity in day["schedule"]:
                    if "time" in activity and isinstance(activity["time"], str):
                        score += 5

    return score


def justify_best_itinerary(best_itinerary, directory, schema_path="doc/itineraires/itineraries/standardized_schema.json"):
    """
    Provides a justification for the selection of the best itinerary.

    Args:
        best_itinerary (str): The filename of the best itinerary.
        directory (str): The directory containing the JSON files.
        schema_path (str): Path to the standardized schema JSON file.

    Returns:
        str: A justification string.
    """
    filepath = os.path.join(directory, best_itinerary)
    try:
        with open(filepath, "r") as f:
            data = json.load(f)
        
        # Load schema for validation
        try:
            with open(schema_path, "r") as f:
                schema = json.load(f)
            schema_conformity, validation_errors = validate_against_schema(data, schema)
        except Exception as e:
            print(f"Error loading schema for justification: {e}")
            schema_conformity = 0
            
        completeness_score = score_completeness(data)
        accuracy_score = score_accuracy(data)
        return (
            f"The best itinerary is {best_itinerary} with a score of "
            f"{score_itinerary(data, schema_conformity):.2f}. Completeness score: {completeness_score}, "
            f"Accuracy score: {accuracy_score}, Schema conformity score: {schema_conformity:.2f}."
        )
    except Exception as e:
        return f"Could not justify best itinerary due to error: {e}"


# Example usage (for testing):
def generate_validation_report(directory="doc/itineraires/json", schema_path="doc/itineraires/itineraries/standardized_schema.json"):
    """
    Generates a detailed report of schema validation issues for all itineraries.
    
    Args:
        directory (str): The directory containing the JSON files.
        schema_path (str): Path to the standardized schema JSON file.
        
    Returns:
        dict: A dictionary containing validation reports for each itinerary.
    """
    # Load the standardized schema
    try:
        with open(schema_path, "r") as f:
            schema = json.load(f)
    except Exception as e:
        return {"error": f"Failed to load schema: {e}"}
    
    validation_reports = {}
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            filepath = os.path.join(directory, filename)
            try:
                with open(filepath, "r") as f:
                    data = json.load(f)
                conformity_score, errors = validate_against_schema(data, schema)
                validation_reports[filename] = {
                    "conformity_score": conformity_score,
                    "errors": errors,
                    "is_standard": conformity_score == 100
                }
            except Exception as e:
                validation_reports[filename] = {
                    "error": f"Failed to process file: {e}",
                    "conformity_score": 0,
                    "is_standard": False
                }
    
    return validation_reports

def main():
    print("Analyzing itineraries against standardized schema...")
    analysis_results = analyze_itineraries()
    print("\nAnalysis Results:")
    print(f"Best Itinerary: {analysis_results['best_itinerary']}")
    print(f"Justification: {analysis_results['justification']}")
    print("\nScores for all itineraries:")
    for filename, score in sorted(analysis_results['scores'].items(), key=lambda x: x[1], reverse=True):
        print(f"  {filename}: {score:.2f}")
    
    # Generate and display validation report
    print("\nGenerating schema validation report...")
    validation_report = generate_validation_report()
    print("\nSchema Validation Report:")
    for filename, report in validation_report.items():
        status = "✓ STANDARD" if report.get("is_standard", False) else "✗ NON-STANDARD"
        print(f"  {filename}: {status} (Conformity: {report.get('conformity_score', 0):.2f}%)")
        if "errors" in report and report["errors"]:
            print(f"    Issues found:")
            for error in report["errors"][:3]:  # Show only first 3 errors to avoid clutter
                print(f"      - {error}")
            if len(report["errors"]) > 3:
                print(f"      ... and {len(report['errors']) - 3} more issues.")
        elif "error" in report:
            print(f"    Error: {report['error']}")


if __name__ == "__main__":
    main()