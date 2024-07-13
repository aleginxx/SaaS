import sys
import json
import numpy as np
from scipy.optimize import linear_sum_assignment

def solve_assignment(costs):
    """Solves the assignment problem given the costs matrix."""
    row_ind, col_ind = linear_sum_assignment(costs)

    total_cost = costs[row_ind, col_ind].sum()

    print(f"Total cost = {total_cost}")

    for worker, task in zip(row_ind, col_ind):
        cost = costs[worker, task]
        print(f"Worker {worker} assigned to task {task}. Cost = {cost}")

def main(json_file):
    """Main function to read JSON input and solve the assignment problem."""
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    if "Costs" in data:
        costs = np.array(data["Costs"])
        solve_assignment(costs)
    else:
        print("Invalid JSON format. 'Costs' array not found.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python lsasSolver.py <input_file.json>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    main(input_file)
