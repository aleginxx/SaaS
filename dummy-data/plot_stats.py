import pandas as pd
import json
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import os

problem_names = ["KnapsackProblem", "LinearSolver", "LP", "MinCostFlow", "MIP", "NQueens", "VehicleRoutingProblem"]
problem_prefix = "problemDB."
solution_prefix = "solutionsDB."

problem_data = []
problem_counts = []
solution_data = []
for problem_name in problem_names:
    file_path_problem = os.path.join(os.getcwd(), "dummy-data", problem_prefix+problem_name+".json")
    file = open(file_path_problem, 'r')
    # file = open(".\\"+problem_prefix+problem_name+".json", 'r')
    data = json.load(file)
    problem_data.append(data)
    problem_counts.append(len(data))
    file_path_solution = os.path.join(os.getcwd(), "dummy-data", solution_prefix + problem_name + ".json")

    # Verify the file path
    print("Solution file path:", file_path_solution)

    # Read the JSON file
    data = pd.read_json(file_path_solution)
    solution_data.append(data)

#Issued/Solved problems
solution_counts = [len(df) for df in solution_data]

n = len(problem_names)

# Define the position of the bars on the x-axis
ind = np.arange(n)  # the x locations for the groups
width = 0.35       # the width of the bars

# Create a bar chart
fig, ax = plt.subplots(figsize=(15, 6))

# Plot the first set of bars
bars1 = ax.bar(ind - width/2, problem_counts, width, label='Problems Issued', color='blue')

# Plot the second set of bars
bars2 = ax.bar(ind + width/2, solution_counts, width, label='Problems Solved', color='orange')

# Add some text for labels, title, and custom x-axis tick labels, etc.
ax.set_xlabel('Problems')
ax.set_ylabel('Count')
ax.set_title('Problems Issued vs Problems Solved')
ax.set_xticks(ind)
ax.set_xticklabels(problem_names)
ax.legend()

# Show the plot
plt.show()
plt.savefig("ProbIssProbSol.jpeg")

solutions_time_elapsed = [df["time_elapsed"].mean() for df in solution_data]

plt.figure(figsize=(11, 6))
plt.bar(problem_names, solutions_time_elapsed, color='blue', width=0.3)
plt.xlabel('Problems')
plt.ylabel('Average Time Elapsed in ms')
plt.title('Average Time Elapsed for Each Problem')
plt.grid(True)
plt.show()
plt.savefig("AvgTime.jpeg")


#Knapsack
#products = [len(entry['problem_desc']['Values']) * entry['problem_desc']['Capacities'] for entry in problem_data[0]]

#knapsack_time_elapsed = solution_data[0]["time_elapsed"]

#plt.figure(figsize=(8, 6))
#plt.plot(products, knapsack_time_elapsed, marker='o', linestyle='-', color='b')
#plt.xlabel('Product of len(values) * weight')
#plt.ylabel('Time Elapsed')
#plt.title('Time Elapsed vs Product of len(values) * weight')
#plt.grid(True)
#plt.tight_layout()
#plt.show()