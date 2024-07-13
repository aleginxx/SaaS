import sys
import json
from ortools.algorithms.python import knapsack_solver


def read_input_json(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    values = data["Values"]
    weights = data["Weights"]
    capacities = data["Capacities"]
    return values, weights, capacities


def main(input_json_file):
    # Read input from JSON file
    values, weights, capacities = read_input_json(input_json_file)

    # Create the solver
    solver = knapsack_solver.KnapsackSolver(
        knapsack_solver.SolverType.KNAPSACK_MULTIDIMENSION_BRANCH_AND_BOUND_SOLVER,
        "KnapsackExample",
    )

    # Initialize solver with the provided values, weights, and capacities
    solver.init(values, weights, capacities)
    computed_value = solver.solve()

    # Retrieve packed items
    packed_items = []
    packed_weights = []
    total_weight = 0
    print("Total value =", computed_value)
    for i in range(len(values)):
        if solver.best_solution_contains(i):
            packed_items.append(i)
            packed_weights.append(weights[0][i])
            total_weight += weights[0][i]
    print("Total weight:", total_weight)
    print("Packed items:", packed_items)
    print("Packed weights:", packed_weights)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python <file_name> <input_json_file>")
        sys.exit(1)
    
    input_json_file = sys.argv[1]
    main(input_json_file)