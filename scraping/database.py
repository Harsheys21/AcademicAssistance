import json
import requests
from bs4 import BeautifulSoup, Tag
from neo4j import GraphDatabase

def create_relationship(driver, course_code, d, indent=0, counter = 0):
    if isinstance(d, dict):
        for key, value in d.items():
            print('  ' * indent + f'Key: {key}')
            driver.execute_query(f"""
                MATCH (b {{code: $nodeone}})
                CREATE (a:{key} {{code: $nodetwo}})
                CREATE (b)-[:PREREQUISITE]->(a)
                """,
                nodeone = course_code,
                nodetwo = f"{key}_{indent}_{course_code}:{counter}",
                database_="neo4j"
            )
            c = counter
            if isinstance(value, list):
                for item in value:
                    if isinstance(item, dict):
                        c+=1
                        create_relationship(driver, f"{key}_{indent}_{course_code}:{counter}", item, indent=indent+2, counter=c)
                    else:
                        print('  ' * (indent + 1) + f'{item} is a pre-req of {key}')
                        driver.execute_query("""
                            MATCH (a {code: $code_one})
                            MERGE (b:Course {code: $code_two})
                            CREATE (a)-[:PREREQUISITE]->(b)
                            """,
                            code_one = f"{key}_{indent}_{course_code}:{counter}",
                            code_two = item,
                            database_="neo4j"
                        )
            else:
                print('  ' * (indent + 1) + f'Value: {value}')
                driver.execute_query(f"""
                    MATCH (b {{code: $nodeone}})
                    CREATE (a:{key} {{code: $nodetwo}})
                    CREATE (b)-[:PREREQUISITE]->(a)
                    """,
                    nodeone = f"{key}_{indent}_{course_code}:{counter}",
                    nodetwo = value,
                    database_="neo4j"
                )
    else:
        print(d, "is the only pre-req")
        driver.execute_query(f"""
            MATCH (b {{code: $nodeone}})
            MATCH (a {{code: $nodetwo}})
            CREATE (b)-[:PREREQUISITE]->(a)
            """,
            nodeone = course_code,
            nodetwo = d,
            database_="neo4j"
        )
    

def iterate_dict(d, indent=0):
    if isinstance(d, dict):
        for key, value in d.items():
            print('  ' * indent + f'Key: {key}')
            if isinstance(value, list):
                for item in value:
                    if isinstance(item, dict):
                        for k in item.keys():
                            print('  ' * (indent + 1) + f'{k} is a pre-req of {key}')
                        iterate_dict(item, indent + 2)
                    else:
                        print('  ' * (indent + 1) + f'{item} is a pre-req of {key}')
            else:
                print('  ' * (indent + 1) + f'Value: {value}')
    else:
        print(d, "is the only pre-req")


# Connect to Neo4j database
uri = "neo4j+s://e02603a4.databases.neo4j.io"  # Change this to your Neo4j URI
username = "neo4j"  # Change this to your Neo4j username
password = "29h_WOjH2PL44u20M7ZW6DUW992V-aS7QF_uOH-3Eik"  # Change this to your Neo4j password

driver = GraphDatabase.driver(uri, auth=(username, password))

# Read JSON file and create nodes
json_files = [
["./scraping/am.json","AM"],
["./scraping/cmpm.json","CMPM"],
["./scraping/cse.json","CSE"],
["./scraping/ece.json","ECE"],
["./scraping/math.json","MATH"],
["./scraping/stat.json","STAT"],
["./scraping/phys.json", "PHYS"]]

# creates the nodes
for j_file in json_files:
    with open(j_file[0]) as json_file:
        data_list = json.load(json_file)

        for course_code, course_data in data_list.items():
            course_name = course_data["name"]
            course_credits = course_data["credits"]
            course_label = course_data["label"]
            course_id = course_data["id"]
            course_genEd = course_data["genEd"]
            course_description = course_data["description"]
            driver.execute_query(
                "CREATE (n:" + j_file[1] + ":Course {code: $code, name: $name, credits: $credits, label: $label, id: $id, genEd: $genEd, description: $description})",
                code = course_code,
                name = course_name,
                credits=course_credits,
                label=course_label,
                id=course_id,
                genEd=course_genEd,
                description=course_description,
                database_="neo4j"
            )

# creates the relationships
for j_file in json_files:
    with open(j_file[0]) as json_file:
        data_list = json.load(json_file)
        
        for course_code, course_data in data_list.items():
            print("Course:", course_code)
            print("Prerequistes:")
            create_relationship(driver, course_code, course_data["prerequisites"], indent=0)

# Close the Neo4j driver
driver.close()