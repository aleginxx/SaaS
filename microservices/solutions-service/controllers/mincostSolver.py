import numpy as np
import json
import sys
from ortools.graph.python import min_cost_flow


def main(input_file):
    """MinCostFlow simple interface example."""
    # Load data from JSON file
    with open(input_file, 'r') as file:
        data = json.load(file)

    arcs = data["Arcs"]
    supplies = data["Supplies"]

    # Extract start_nodes, end_nodes, capacities, and unit_costs from the arcs
    start_nodes = np.array([arc["start_node"] for arc in arcs])
    end_nodes = np.array([arc["end_node"] for arc in arcs])
    capacities = np.array([arc["capacity"] for arc in arcs])
    unit_costs = np.array([arc["unit_cost"] for arc in arcs])

    # Instantiate a SimpleMinCostFlow solver.
    smcf = min_cost_flow.SimpleMinCostFlow()

    # Add arcs, capacities, and costs in bulk using numpy.
    all_arcs = smcf.add_arcs_with_capacity_and_unit_cost(
        start_nodes, end_nodes, capacities, unit_costs
    )

    # Add supply for each node.
    smcf.set_nodes_supplies(np.arange(0, len(supplies)), supplies)

    # Find the min cost flow.
    status = smcf.solve()

    if status != smcf.OPTIMAL:
        print("There was an issue with the min cost flow input.")
        print(f"Status: {status}")
        exit(1)
    
    print(f"Minimum cost: {smcf.optimal_cost()}")
    print("")
    print(" Arc    Flow / Capacity Cost")
    solution_flows = smcf.flows(all_arcs)
    costs = solution_flows * unit_costs
    for arc, flow, cost in zip(all_arcs, solution_flows, costs):
        print(
            f"{smcf.tail(arc):1} -> {smcf.head(arc)}  {flow:3}  / {smcf.capacity(arc):3}       {cost}"
        )


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <input_json_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    main(input_file)
