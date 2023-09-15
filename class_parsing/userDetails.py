import re

ge_not_satisfied = []
lower_not_satisfied = []
upper_not_satisfied = []
core_not_satisfied = []
new_course_codes = []

# Open the file using the utf-8 encoding
with open("./class_parsing/ernest.txt", 'r', encoding='utf-8') as textfile:
    filetext = textfile.read()

# Convert the content to uppercase
filetext_upper = filetext.upper()
regex = re.compile(r"UNIVERSITY OF CALIFORNIA REQUIREMENTS(.*?)GENERAL EDUCATION REQUIREMENTS", re.DOTALL)
match = regex.search(filetext_upper)    
if match:
    extracted_content = match.group(1).strip()
    pattern = r"([^\n]*)\n\s*NOT SATISFIED"
    # Find matches using the pattern
    matches = re.findall(pattern, extracted_content)
    # Print the lines above "NOT SATISFIED"
    if len(matches) > 0:
        for line in matches:
            if "COLLAPSIBLE SECTION" in line:
                pattern = r"ELWR:"
                class_names = re.findall(pattern, line)
                if len(class_names) > 0:
                    ge_not_satisfied.append("WRIT 1")
        print("GE classes not satisfied:",ge_not_satisfied)
    else:
        print("All GE Classes Satisfied")
else:
    print("Error: Input string format is incorrect")
print("-----------------------------------------------------------------------------------------------------------------")
regex = re.compile(r"GENERAL EDUCATION REQUIREMENTS(.*?)LOWER-DIVISION REQUIREMENTS", re.DOTALL)
match = regex.search(filetext_upper)
if match:
    extracted_content = match.group(1).strip()
    pattern = r"([^\n]*)\n\s*NOT SATISFIED"
    # Find matches using the pattern
    matches = re.findall(pattern, extracted_content)
    # Print the lines above "NOT SATISFIED"
    if len(matches) > 0:
        for line in matches:
            if "COLLAPSIBLE SECTION" in line:
                pattern = r"[A-Z]+:"
                class_names = re.findall(pattern, line)
                if len(class_names) > 0:
                    ge_not_satisfied.append(class_names[0].replace(":",""))
        ge_not_satisfied = [item if item != 'C' else 'WRIT 2' for item in ge_not_satisfied]            
        print("GE classes not satisfied:",ge_not_satisfied)
    else:
        print("All GE Classes Satisfied")
else:
    print("Error: Input string format is incorrect")

print("-----------------------------------------------------------------------------------------------------------------")
regex = re.compile(r"-? LOWER-DIVISION REQUIREMENTS(.*?)UPPER-DIVISION REQUIREMENTS", re.DOTALL)
match = regex.search(filetext_upper)
if match:
    extracted_content = match.group(1).strip()
    pattern = r"([^\n]*)\n\s*NOT SATISFIED"
    # Find matches using the pattern
    matches = re.findall(pattern, extracted_content)
    if len(matches) > 0:
        # Print the lines above "NOT SATISFIED"
        for line in matches:
            if "COLLAPSIBLE SECTION" in line:
                pattern = r"\b([A-Z]+\s\d+[A-Z]?(\s*,?\s*(?:OR\s*)?[A-Z]*\s*\d+[A-Z]?)*\b)"
                class_names = re.findall(pattern, line)
                lower_not_satisfied.append(class_names[0][0])
        print("Lower Division classes not satisfied:",lower_not_satisfied)
    else:
        print("All Lower Division Classes Satisfied")
else:
    print("Error: Input string format is incorrect")
    

print("-----------------------------------------------------------------------------------------------------------------")
regex = re.compile(r"-? UPPER-DIVISION REQUIREMENTS(.*?)COLLEGE REQUIREMENTS", re.DOTALL)
match = regex.search(filetext_upper)
if match:
    extracted_content = match.group(1).strip()
    pattern = r"([^\n]*)\n\s*NOT SATISFIED"
    # Find matches using the pattern
    matches = re.findall(pattern, extracted_content)
    if len(matches) > 0:
        # Print the lines above "NOT SATISFIED"
        for line in matches:
            if "COLLAPSIBLE SECTION" in line:
                pattern = r"\b([A-Z]+\s1\d{2,}[A-Z]?(\s*,?\s*(?:OR\s*)?[A-Z]*\s*\d+[A-Z]?)*\b)"
                class_names = re.findall(pattern, line, re.MULTILINE)
                if(len(class_names) > 0):
                    upper_not_satisfied.append(class_names[0][0])
                else:
                    pattern = r"(?i)(.*? Elective)"
                    class_names = re.findall(pattern, line)
                    if(len(class_names) > 0):
                        upper_not_satisfied.append(class_names[0].strip())

        indices_to_combine = [i for i, course in enumerate(upper_not_satisfied) if course.startswith('CSE 115A, 185E, OR 185S') or course.startswith('CSE 195')]
        # Combine the elements
        combined_element = ', '.join(upper_not_satisfied[idx] for idx in indices_to_combine)
        upper_not_satisfied = [course for i, course in enumerate(upper_not_satisfied) if i not in indices_to_combine]
        upper_not_satisfied.append(combined_element)
        if "OPTION 2" in upper_not_satisfied:
            upper_not_satisfied.remove("OPTION 2")
        print("Upper Division classes not satisfied:",upper_not_satisfied)
    else:
        print("All Upper Division Classes Satisfied")
else:
    print("Error: Input string format is incorrect")

print("-----------------------------------------------------------------------------------------------------------------")
regex = re.compile(r"COLLEGE REQUIREMENTS(.*?)STATISTICS", re.DOTALL)
match = regex.search(filetext_upper)
if match:
    extracted_content = match.group(1).strip()
    pattern = r"([^\n]*)\n\s*NOT SATISFIED"
    # Find matches using the pattern
    matches = re.findall(pattern, extracted_content)
    if len(matches) > 0:
        # Print the lines above "NOT SATISFIED"
        for line in matches:
            if "COLLAPSIBLE SECTION" in line:
                pattern = r"(.*?)COLLEGE CORE"
                class_names = re.findall(pattern, line)
                c =class_names[0].replace(":","")
                core_not_satisfied.append(c.strip())
        print("Core College classes not satisfied:",core_not_satisfied)
    else:
        print("All Core College Classes Satisfied")
else:
    print("Error: Input string format is incorrect")

print("-----------------------------------------------------------------------------------------------------------------")
regex = re.compile(r"INSTRUCTOR\n(.*?)TRANSFER CREDIT", re.DOTALL)
match = regex.search(filetext_upper)
if match:
    extracted_content = match.group(1).strip()
    pattern = r"\b([A-Z]+-\s*\d+[A-Z]*-\d+)\b"
    classes_pattern = r"(?s)([A-Z]+-\s*\d+[A-Z]*-\d+.*?)\n\s\n"
    matches = re.findall(classes_pattern, extracted_content)
    if len(matches) > 0:
        course_desc = list(matches)
        for desc in course_desc:
            if((desc.count("\n") + 1) > 3):
                course = re.findall(pattern, desc)
                course = course[0]
                new_course = course.replace(" ","")
                new_course = new_course.replace("-"," ",1)
                sep = '-'
                new_course = new_course.split(sep, 1)[0]
                new_course_codes.append(new_course)
        print("Taken UCSC Classes:",new_course_codes)
    else:
        print("No classes taken at UCSC")
else:
    print("Error: Input string format is incorrect")
print("-----------------------------------------------------------------------------------------------------------------")
print("end of file")