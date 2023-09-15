# requires Tensorflow<2.11 or PyTorch to function
# to install: python -m pip install "tensorflow<2.11"
# run from root directory. 

import json
from transformers import pipeline
classifier = pipeline("zero-shot-classification",
                      model="facebook/bart-large-mnli")

concentration_labels = [
    "Artificial Intelligence",
    "Data Science and Analytics",
    "Software Engineering",
    "Cybersecurity",
    "Machine Learning",
    "Web Development",
    "Database Management",
    "Networking and Communications",
    "Computer Graphics and Visualization",
    "Operating Systems and Systems Programming"
]

with open('scraping/cse.json', 'r') as file:
    # Load the JSON data into a Python data structure
    cse_courses = json.load(file)

for course, details in cse_courses.items():
    results = classifier(details.get('description'), concentration_labels)
    max_score_index = results['scores'].index(max(results['scores']))
    corresponding_label = results['labels'][max_score_index]
    cse_courses[course]['concentration'] = corresponding_label
    print(course, "done")

with open('test.json', "w") as f:
    json.dump(cse_courses, f, indent=2)
