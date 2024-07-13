import sys
import json
from ortools.linear_solver import pywraplp

def parse_variables(solver, variables):
    """Create variables in the solver."""
    var_dict = {}
    infinity = solver.infinity()
    for var in variables:
        var_dict[var] = solver.IntVar(0.0, infinity, var)
    return var_dict

def parse_constraints(solver, constraints, var_dict):
    """Add constraints to the solver."""
    for constraint in constraints:
        solver.Add(eval(constraint, {}, var_dict))

def parse_objective(solver, objective, var_dict):
    """Set the objective function in the solver."""
    if "Maximize" in objective:
        solver.Maximize(eval(objective.replace("Maximize", ""), {}, var_dict))
    elif "Minimize" in objective:
        solver.Minimize(eval(objective.replace("Minimize", ""), {}, var_dict))

def main(json_file):
    # Read the JSON input file
    with open(json_file, 'r') as f:
        data = json.load(f)

    # Create the mip solver with the SCIP backend.
    solver = pywraplp.Solver.CreateSolver("SCIP")
    if not solver:
        return

    # Parse and create variables
    variables = data["Variables"]
    var_dict = parse_variables(solver, variables)

    print("Number of variables =", solver.NumVariables())

    # Parse and add constraints
    constraints = data["Constraints"]
    parse_constraints(solver, constraints, var_dict)

    print("Number of constraints =", solver.NumConstraints())

    # Parse and set the objective
    objective = data["Objective"]
    parse_objective(solver, objective, var_dict)

    print(f"Solving with {solver.SolverVersion()}")
    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        print("Solution:")
        print("Objective value =", solver.Objective().Value())
        for var in variables:
            print(f"{var} = {var_dict[var].solution_value()}")
    else:
        print("The problem does not have an optimal solution.")

    print("\nAdvanced usage:")
    print(f"Problem solved in {solver.wall_time():d} milliseconds")
    print(f"Problem solved in {solver.iterations():d} iterations")
    print(f"Problem solved in {solver.nodes():d} branch-and-bound nodes")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python mip_solver.py <input_file.json>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    main(input_file)
