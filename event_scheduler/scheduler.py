from collections import defaultdict
import networkx as nx # Library for displaying graphs.
import matplotlib.pyplot as plt
import random
import re
from neo4j import GraphDatabase


URI = "neo4j+s://e02603a4.databases.neo4j.io"
AUTH = ("neo4j", "29h_WOjH2PL44u20M7ZW6DUW992V-aS7QF_uOH-3Eik")

driver =  GraphDatabase.driver(URI, auth=AUTH)
driver.verify_connectivity() 

### `AND_OR_Scheduler` implementation
class AND_OR_Scheduler(object):

    def __init__(self):
        # It is up to you to implement the initialization.
        # YOUR CODE HERE
        self.ge_tasks = set()
        self.lower_tasks = set()
        self.upper_tasks = set()
        self.successors = defaultdict(set)
        self.num_successors = defaultdict(int)
        self.rank_successors = defaultdict(int)
        self.predecessors = defaultdict(set)
        self.completed_tasks = set()
        self.a = set()
        self.o = set()

    def reset(self):
        self.completed_tasks = set()
        self.rank_successors = defaultdict(int)

    def add_ge_and_task(self, t, dependencies):
        """Adds an AND task t with given dependencies."""
        # assert statement
        assert ((t not in self.ge_tasks) and (t not in self.lower_tasks) and (t not in self.upper_tasks)) or len(self.predecessors[t]) == 0, "The task was already present."
        # check if task is in or 
        if t in self.o:
            self.o.remove(t)
        # ge task to tasks and and sets
        self.ge_tasks.add(t)
        self.a.add(t)

        # The predecessors are the tasks that need to be done before.
        self.predecessors[t] = set(dependencies)
        # The new task is a successor of its dependencies.
        for u in dependencies:
            self.successors[u].add(t)
            self.num_successors[u] += 1
            
    def add_ge_or_task(self, t, dependencies):
        """Adds an OR task t with given dependencies."""
        # assert statement
        assert ((t not in self.ge_tasks) and (t not in self.lower_tasks) and (t not in self.upper_tasks)) or len(self.predecessors[t]) == 0, "The task was already present."
        # check if task is in and 
        if t in self.a:
            self.a.remove(t)
            # add task to tasks and or sets
        self.ge_tasks.add(t)
        self.o.add(t)

        # The predecessors are the tasks that need to be done before.
        self.predecessors[t] = set(dependencies)
        # The new task is a successor of its dependencies.
        for u in dependencies:
            self.successors[u].add(t)
            self.num_successors[u] += 1
            

    def add_lower_and_task(self, t, dependencies):
        """Adds an AND task t with given dependencies."""
        # assert statement
        assert ((t not in self.ge_tasks) and (t not in self.lower_tasks) and (t not in self.upper_tasks)) or len(self.predecessors[t]) == 0, "The task was already present."
        # check if task is in or 
        if t in self.o:
            self.o.remove(t)
        # add task to tasks and and sets
        self.lower_tasks.add(t)
        self.a.add(t)

        # The predecessors are the tasks that need to be done before.
        self.predecessors[t] = set(dependencies)
        # The new task is a successor of its dependencies.
        for u in dependencies:
            self.successors[u].add(t)
            self.num_successors[u] += 1
            

    def add_lower_or_task(self, t, dependencies):
        """Adds an OR task t with given dependencies."""
        # assert statement
        assert ((t not in self.ge_tasks) and (t not in self.lower_tasks) and (t not in self.upper_tasks)) or len(self.predecessors[t]) == 0, "The task was already present."
        # check if task is in and 
        if t in self.a:
            self.a.remove(t)
            # add task to tasks and or sets
        self.lower_tasks.add(t)
        self.o.add(t)

        # The predecessors are the tasks that need to be done before.
        self.predecessors[t] = set(dependencies)
        # The new task is a successor of its dependencies.
        for u in dependencies:
            self.successors[u].add(t)
            self.num_successors[u] += 1
            
    
    def add_upper_and_task(self, t, dependencies):
        """Adds an AND task t with given dependencies."""
        # assert statement
        assert ((t not in self.ge_tasks) and (t not in self.lower_tasks) and (t not in self.upper_tasks)) or len(self.predecessors[t]) == 0, "The task was already present."
        # check if task is in or 
        if t in self.o:
            self.o.remove(t)
        # add task to tasks and and sets
        self.upper_tasks.add(t)
        self.a.add(t)

        # The predecessors are the tasks that need to be done before.
        self.predecessors[t] = set(dependencies)
        # The new task is a successor of its dependencies.
        for u in dependencies:
            self.successors[u].add(t)
            self.num_successors[u] += 1
            

    def add_upper_or_task(self, t, dependencies):
        """Adds an OR task t with given dependencies."""
        # assert statement
        assert ((t not in self.ge_tasks) and (t not in self.lower_tasks) and (t not in self.upper_tasks)) or len(self.predecessors[t]) == 0, "The task was already present."
        # check if task is in and 
        if t in self.a:
            self.a.remove(t)
            # add task to tasks and or sets
        self.upper_tasks.add(t)
        self.o.add(t)

        # The predecessors are the tasks that need to be done before.
        self.predecessors[t] = set(dependencies)
        # The new task is a successor of its dependencies.
        for u in dependencies:
            self.successors[u].add(t)
            self.num_successors[u] += 1
            
    @property
    def done(self):
        # YOUR CODE HERE
        return len(self.completed_tasks) == (len(self.ge_tasks) + len(self.lower_tasks) + len(self.upper_tasks))

    @property
    def ge_available_tasks(self):
        parallel_tasks = set()
        
        for task in self.ge_tasks:
            if task in self.completed_tasks:
                continue
            
            if task in self.a:
                # For AND tasks, check if all predecessors are completed
                if all(predecessor in self.completed_tasks for predecessor in self.predecessors[task]):
                    parallel_tasks.add(task)
            else:
                # For OR tasks, check if at least one predecessor is completed
                if any(predecessor in self.completed_tasks for predecessor in self.predecessors[task]):
                    parallel_tasks.add(task)
                    if "OR" in task or "or" in task:
                        for i in self.predecessors[task]:
                            if len(self.successors[i]) == 1:
                                self.completed_tasks.add(i)
            
        return parallel_tasks

    @property
    def lower_available_tasks(self):
        parallel_tasks = set()
        
        for task in self.lower_tasks:
            if task in self.completed_tasks:
                continue
            
            if task in self.a:
                # For AND tasks, check if all predecessors are completed
                if all(predecessor in self.completed_tasks for predecessor in self.predecessors[task]):
                    parallel_tasks.add(task)
            else:
                # For OR tasks, check if at least one predecessor is completed
                if any(predecessor in self.completed_tasks for predecessor in self.predecessors[task]):
                    parallel_tasks.add(task)
                    if "OR" in task or "or" in task:
                        for i in self.predecessors[task]:
                            if len(self.successors[i]) == 1:
                                self.completed_tasks.add(i)
            
        return parallel_tasks

    @property
    def upper_available_tasks(self):
        parallel_tasks = set()
        
        for task in self.upper_tasks:
            if task in self.completed_tasks:
                continue
            
            if task in self.a:
                # For AND tasks, check if all predecessors are completed
                if all(predecessor in self.completed_tasks for predecessor in self.predecessors[task]):
                    parallel_tasks.add(task)
            else:
                # For OR tasks, check if at least one predecessor is completed
                if any(predecessor in self.completed_tasks for predecessor in self.predecessors[task]):
                    parallel_tasks.add(task)
                    if "OR" in task or "or" in task:
                        for i in self.predecessors[task]:
                            if len(self.successors[i]) == 1:
                                self.completed_tasks.add(i)
            
        return parallel_tasks

    def establish_ranking(self):
        taskss = sorted(list(self.lower_tasks), reverse=True)
        def extract_number(s):
            match = re.search(r'\d+', s)
            return int(match.group()) if match else float('inf')
        
        tasks = sorted(taskss, key=extract_number, reverse=True)
        for task in tasks:
            for u in self.predecessors[task]:
                if self.num_successors[u] + self.rank_successors[task] > self.rank_successors[u]:
                    self.rank_successors[u] = self.num_successors[u] + self.rank_successors[task]
                else:
                    self.rank_successors[u] =  self.rank_successors[u]
        
        taskss = sorted(list(self.lower_tasks), reverse=True)

        tasks = sorted(taskss, key=extract_number, reverse=True)
        for task in tasks:
            for u in self.predecessors[task]:
                if self.num_successors[u] + self.rank_successors[task] > self.rank_successors[u]:
                    self.rank_successors[u] = self.num_successors[u] + self.rank_successors[task]
                else:
                    self.rank_successors[u] =  self.rank_successors[u]

        taskss = sorted(list(self.lower_tasks), reverse=True)
        
        tasks = sorted(taskss, key=extract_number, reverse=True)
        for task in tasks:
            for u in self.predecessors[task]:
                if self.num_successors[u] + self.rank_successors[task] > self.rank_successors[u]:
                    self.rank_successors[u] = self.num_successors[u] + self.rank_successors[task]
                else:
                    self.rank_successors[u] =  self.rank_successors[u]

    def mark_completed(self, t):
        """Marks the task t as completed, and returns the additional
        set of tasks that can be done (and that could not be
        previously done) once t is completed."""
        # YOUR CODE HERE
        new_tasks = set()
        self.completed_tasks.add(t)

        for i in self.ge_tasks:
            if i not in self.completed_tasks and t in self.predecessors[i]:
                if i in self.a:
                    value = True
                    for j in self.predecessors[i]:
                        if j not in self.completed_tasks:
                            value = False
                            break
                    if value:
                        new_tasks.add(i)
                else:
                    new_tasks.add(i)
        
        for i in self.lower_tasks:
            if i not in self.completed_tasks and t in self.predecessors[i]:
                if i in self.a:
                    value = True
                    for j in self.predecessors[i]:
                        if j not in self.completed_tasks:
                            value = False
                            break
                    if value:
                        new_tasks.add(i)
                else:
                    new_tasks.add(i)
        
        for i in self.upper_tasks:
            if i not in self.completed_tasks and t in self.predecessors[i]:
                if i in self.a:
                    value = True
                    for j in self.predecessors[i]:
                        if j not in self.completed_tasks:
                            value = False
                            break
                    if value:
                        new_tasks.add(i)
                else:
                    new_tasks.add(i)
        
        return new_tasks

    def show(self):
        """Display the graph, differentiating between AND and OR nodes."""
        g = nx.DiGraph()

        # Add nodes for AND tasks (green color) and OR tasks (blue color)
        for task in self.ge_tasks:
            if task in self.a:
                g.add_node(task, color='green')
            elif task in self.o:
                g.add_node(task, color='blue')

        # Add edges
        for u in self.ge_tasks:
            for v in self.successors[u]:
                g.add_edge(u, v)

        # Add nodes for AND tasks (green color) and OR tasks (blue color)
        for task in self.lower_tasks:
            if task in self.a:
                g.add_node(task, color='green')
            elif task in self.o:
                g.add_node(task, color='blue')

        # Add edges
        for u in self.lower_tasks:
            for v in self.successors[u]:
                g.add_edge(u, v)

        # Add nodes for AND tasks (green color) and OR tasks (blue color)
        for task in self.upper_tasks:
            if task in self.a:
                g.add_node(task, color='green')
            elif task in self.o:
                g.add_node(task, color='blue')

        # Add edges
        for u in self.upper_tasks:
            for v in self.successors[u]:
                g.add_edge(u, v)

        # Define node colors based on the attributes we set earlier
        node_colors = [g.nodes[task]['color'] for task in g.nodes()]

        # Create a layout for the graph and draw it
        pos = nx.spring_layout(g)
        nx.draw(g, pos, with_labels=True, node_color=node_colors, node_shape='o')

        # Customize node labels, you can change this as needed
        node_labels = {task: task for task in g.nodes()}
        nx.draw_networkx_labels(g, pos, labels=node_labels)

        # Show the graph
        plt.show()


class RunANDORSchedule(object):

    def __init__(self, scheduler):
        self.scheduler = scheduler
        self.in_process = None  # Indicating, we don't know yet.

    def step(self):
        """Performs a step, returning the task, if any, or None,
        if there is no step that can be done."""
        # If we don't know what steps are in process, we get them.
        classes = []
        if len(self.scheduler.lower_available_tasks) > 0:
            self.in_process = list(self.scheduler.lower_available_tasks)
            # print("lower classes:", self.in_process)
            t = ""
            count = -1
            for task in self.in_process:
                if self.scheduler.rank_successors[task] >= count:
                    count = self.scheduler.rank_successors[task]
                    t = task
            self.scheduler.mark_completed(t)
            # print("lower classes added:", t)
            classes.append(t)
        if len(self.scheduler.upper_available_tasks) > 0:
            self.in_process = list(self.scheduler.upper_available_tasks)
            # print("upper classes:", self.in_process)
            t = ""
            count = -1
            for task in self.in_process:
                if self.scheduler.rank_successors[task] >= count:
                    count = self.scheduler.rank_successors[task]
                    t = task
            self.scheduler.mark_completed(t)
            # print("upper classes added:", t)
            classes.append(t)
        if len(self.scheduler.ge_available_tasks) > 0:
            self.in_process = list(self.scheduler.ge_available_tasks)
            # print("ge classes:", self.in_process)
            t = ""
            count = -1
            for task in self.in_process:
                if self.scheduler.rank_successors[task] >= count:
                    count = self.scheduler.rank_successors[task]
                    t = task
            self.scheduler.mark_completed(t)
            # print("ge classes added:", t)
            # print("-------------------------------------------------------------------------------")
            classes.append(t)
        
        if len(classes) > 0:
            return classes
        return None

    @property
    def done(self):
        return (len(self.scheduler.upper_available_tasks) + len(self.scheduler.lower_available_tasks) + len(self.scheduler.ge_available_tasks)) == 0

    def run(self):
        """Runs the scheduler from the current configuration to completion.
        You must call reset() first, if you want to run the whole schedule."""
        self.scheduler.reset()
        # temp code
        s.mark_completed("CSE 3")
        s.mark_completed("CSE 13S")
        s.mark_completed("MATH 23A")
        s.mark_completed("CSE 12")
        s.mark_completed("MATH 19B")
        s.mark_completed("WRIT 1")
        s.mark_completed("CSE 30")
        s.mark_completed("OAKS 1")
        s.mark_completed("OAKS 1A")
        s.mark_completed("MATH 19A")
        # self.scheduler.show()
        # temp code

        # establish rankings:
        self.scheduler.establish_ranking()

        self.in_process = None
        tasks = []
        while not self.done:
            t = self.step()
            if t is not None:
                tasks.extend(t)
        return tasks

class Class(object):
    def __init__(self, code, credit=-1, description=-1, class_id=-1, label=-1, name=-1, prerequistes=[]):
        self.code = code
        self.credits = credit
        self.description = description
        self.id = class_id
        self.label = label
        self.name = name
        self.prerequistes = prerequistes

    def getCode(self):
        return self.code

    def getCredit(self):
        return self.credits

    def getDescription(self):
        return self.description

    def getClassId(self):
        return self.id

    def getLabel(self):
        return self.label

    def getName(self):
        return self.name

    def getPrereq(self):
        return self.prerequistes

records, summary, keys = driver.execute_query("""
    MATCH (class {code:""}) 
    RETURN class.code AS class, class.credits as credits, class.description as description, class.id as id, class.label as label, class.name as name, class.prerequisites as prerequisites
    """,
    database_="neo4j",
)

# Loop through results and do something with them
for record in records:  
    for key, value in record.data().items():
        print(key,"-",value)

# s = AND_OR_Scheduler()
# # GE's
# s.add_ge_and_task('CC', ["ccpre-req"])
# s.add_ge_and_task('ER', ["erpre-req"])
# s.add_ge_and_task('SI', ["sipre-req"])
# s.add_ge_and_task('SR', ["srpre-req"])
# s.add_ge_and_task('TA', ["tapre-req"])
# s.add_ge_and_task('PR', ["prpre-req"])
# s.add_ge_and_task('IM', ["impre-req"])
# s.add_ge_and_task('C', ["cpre-req"])
# s.add_ge_and_task("ccpre-req",[])
# s.add_ge_and_task("erpre-req",[])
# s.add_ge_and_task("sipre-req",[])
# s.add_ge_and_task("srpre-req",[])
# s.add_ge_and_task("tapre-req",[])
# s.add_ge_and_task("prpre-req",[])
# s.add_ge_and_task("impre-req",[])
# s.add_ge_and_task("cpre-req",[])
# # lower div
# s.add_lower_and_task('AM 10 OR MATH 21', ["am10ormath21pre-req"])
# s.add_lower_or_task("am10ormath21pre-req",["AM 10","MATH 21"])

# s.add_lower_and_task("MATH 21", ["math21pre-req"])
# s.add_lower_or_task("math21pre-req", ["MATH 11A","MATH 19A","MATH 20A","AM 11A","AM 15A"])

# s.add_lower_and_task("AM 10", ["am10pre-req"])
# s.add_lower_and_task("am10pre-req",[])

# s.add_lower_and_task('ECE 30', ["ece30pre-req"])
# s.add_lower_and_task("ece30pre-req",[])

# s.add_lower_and_task('CSE 16', ["cse16pre-req"])
# s.add_lower_or_task("cse16pre-req" ,["MATH 19A","MATH 19B","MATH 11B","AM 11B","AM 15B","ECON 11B"])
# # upper div
# s.add_upper_and_task("CSE 101", ["cse101pre-req"])
# s.add_upper_and_task('cse101pre-req', ["cse101pre-reqa","cse101pre-reqb","cse101pre-reqc","CSE 30","CSE 16"])
# s.add_upper_or_task("cse101pre-reqa", ["CSE 12","BME 160"])
# s.add_upper_or_task("cse101pre-reqb", ["CSE 13E","ECE 13","CSE 13S"])
# s.add_upper_or_task("cse101pre-reqc", ["MATH 11B","MATH 19B","MATH 20B","AM 11B"])

# s.add_upper_and_task('CSE 102', ['cse102pre-req'])
# s.add_upper_and_task('cse102pre-req', ['CSE 101'])

# s.add_upper_and_task('CSE 103', ['cse103pre-req'])
# s.add_upper_and_task('cse103pre-req', ['CSE 101'])

# s.add_upper_and_task('CSE 112 OR 114A', ["cse112or114apre-req"])
# s.add_upper_or_task("cse112or114apre-req",["CSE 112","CSE 114A"])

# s.add_upper_and_task("CSE 112",["cse112pre-req"])
# s.add_upper_and_task("cse112pre-req",["CSE 101"])


# s.add_upper_and_task("CSE 114A",["cse114apre-req"])
# s.add_upper_and_task("cse114apre-req",["CSE 101"])

# s.add_upper_and_task('CSE 120', ["cse120pre-req"])
# s.add_upper_and_task("cse120pre-req", ["CSE 12","cse120pre-reqa"])
# s.add_upper_or_task("cse120pre-reqa", ["CSE 13E","CSE 13S","ECE 13","cse120pre-reqaa"])
# s.add_upper_and_task("cse120pre-reqaa", ["CSE 15","CSE 15L"])

# s.add_upper_and_task("CSE 130", ["cse130pre-req"])
# s.add_upper_and_task('cse130pre-req', ["CSE 12","cse130pre-reqa"])
# s.add_upper_or_task("cse130pre-reqa",["CSE 101","cse120pre-reqaa"])

# s.add_upper_and_task('STAT 131 OR CSE 107', ["stat131orcse107pre-req"])
# s.add_upper_or_task("stat131orcse107pre-req",["STAT 131","CSE 107"])

# s.add_upper_and_task("CSE 107",["cse107pre-req"])
# s.add_upper_and_task("cse107pre-req", ["CSE 16","cse107pre-reqa"])
# s.add_upper_or_task("cse107pre-reqa",["AM 30","MATH 22","MATH 23A"])

# s.add_upper_and_task("STAT 131",["stat131pre-req"])
# s.add_upper_or_task("stat131pre-req",["AM 11B","ECON 11B","MATH 11B","MATH 19B","MATH 20B"])

# s.add_upper_and_task('CSE 115A', ["cse115apre-req"])
# s.add_upper_and_task("cse115apre-req",["CSE 101","CSE 130"])

# runner = RunANDORSchedule(s)

# count = 0
# for i in range(1):
#     tasks = runner.run()
#     # Create a list of lowercase tasks to remove
#     lowercase_tasks = [task for task in tasks if task.islower() or ("OR" in task)]

#     # Remove lowercase tasks from the tasks list
#     for task in lowercase_tasks:
#         tasks.remove(task)

#     max_strings_per_line = 3

#     # Loop through the list and print the strings
#     for i, string in enumerate(tasks):
#         print(string, end=", ")  # Print the string with a space
#         # Check if we need to start a new line
#         if (i + 1) % max_strings_per_line == 0 or i == len(tasks) - 1:
#             print()  # Start a new line


driver.close()