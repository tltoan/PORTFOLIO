import json

# Load the JSON file
with open('data-dashboard/average-eggs.json', 'r') as json_file:
    data = json.load(json_file)

# Remove 'quarter' and 'month' from each entry
for entry in data["data"]:
    if "egg-average" in entry:
        entry["eggaverage"] = entry.pop("egg-average")

# Save the modified JSON back to a file
output_path = 'data-dashboard/average-eggs.json'
with open(output_path, 'w') as json_file:
    json.dump(data, json_file, indent=2)
