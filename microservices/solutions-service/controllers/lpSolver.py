import json
import sys
from ortools.linear_solver import pywraplp

def LinearProgrammingFromJson(json_file):
    # Load JSON data
    with open(json_file, 'r') as file:
        data = json.load(file)

    # Extract variables, constraints, and objective
    variables = data["Variables"]
    constraints = data["Constraints"]
    objective = data["Objective"]

    # Create the solver
    solver = pywraplp.Solver.CreateSolver("GLOP")
    if not solver:
        return

    # Create variables in the solver
    var_dict = {}
    infinity = solver.infinity()
    for var in variables:
        var_dict[var] = solver.NumVar(0, infinity, var)

    print("Number of variables =", solver.NumVariables())

    # Add constraints to the solver
    for constraint in constraints:
        solver.Add(eval(constraint, {}, var_dict))

    print("Number of constraints =", solver.NumConstraints())

    # Set the objective function
    if objective.startswith("Maximize"):
        solver.Maximize(eval(objective[len("Maximize "):], {}, var_dict))
    elif objective.startswith("Minimize"):
        solver.Minimize(eval(objective[len("Minimize "):], {}, var_dict))

    # Solve the problem
    print(f"Solving with {solver.SolverVersion()}")
    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        print("Solution:")
        print(f"Objective value = {solver.Objective().Value():0.1f}")
        for var in var_dict:
            print(f"{var} = {var_dict[var].solution_value():0.1f}")
    else:
        print("The problem does not have an optimal solution.")

    print("\nAdvanced usage:")
    print(f"Problem solved in {solver.wall_time():d} milliseconds")
    print(f"Problem solved in {solver.iterations():d} iterations")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python linear_programming_solver.py <json_file>")
        sys.exit(1)

    json_file = sys.argv[1]
    LinearProgrammingFromJson(json_file)
