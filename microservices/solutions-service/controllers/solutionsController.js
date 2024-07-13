const { spawn } = require('child_process');
const Solution = require('../models/Solutions');
// const Problem = require('../microservices/problem-service/models/Problem');
const Problem = require('../../problem-service/models/Problem');
// const User = require('../microservices/user-service/models/User');
// const Tool = require('../microservices/tools-service/models/Tool');
const Tool = require('../../tools-service/models/Tool');
const solutionsService = require('../services/solutionsServices');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const getAllSolutions = async (req, res) => {
    try {
        const solutions = await solutionsService.getAllSolutions();
        res.status(200).json(solutions);
    } catch (error) {
        console.error('Error fetching solutions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addSolution = async (req, res) => {
    const { problem_id, solution_desc, time_elapsed } = req.body;
    console.log("Request body : ", req.body);

    if (!mongoose.Types.ObjectId.isValid(problem_id)) {
        return res.status(400).json({ error: 'Invalid problem_id format' });
    }

    try {
        // Check if the problem exists
        const problem = await Problem.findById(problem_id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        const newSolution = new Solution({
            problem_id,
            solution_desc,
            time_elapsed
        });

        await newSolution.save();

        return res.status(201).json({ message: 'Solution added successfully', solution: newSolution });

    } catch (error) {
        console.error('Error adding solution:', error);
        return res.status(500).json({ error: 'Failed to add solution' });
    }
};

const solveProblem = async (req, res) => {
    const problemId = req.params.id;
    let tempFilePath;

    try {
        // Fetch problem from database in JSON format using .lean()
        const problem = await Problem.findById(problemId).lean();

        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        console.log('Fetched problem:', problem);

        let pythonScript;
        let pythonArgs;
        let dataToWrite;
        let Variables, Constraints, Objective;

        switch (problem.credits_used) {
            case 1:
                pythonScript = 'esSolver.py';
                tempFilePath = path.join(__dirname, 'locations_temp.json');
                fs.writeFileSync(tempFilePath, JSON.stringify({ Locations: problem.problem_desc.Locations }, null, 2));
                pythonArgs = [path.join(__dirname, pythonScript), tempFilePath];
                break;
            case 2:
                pythonScript = 'vrpSolver.py';
                tempFilePath = path.join(__dirname, 'locations_temp.json');
                const { Locations, NumVehicles, DepotIndex, MaxDistance } = problem.problem_desc;
                fs.writeFileSync(tempFilePath, JSON.stringify({ Locations }, null, 2));
                pythonArgs = [path.join(__dirname, pythonScript), tempFilePath, NumVehicles.toString(), DepotIndex.toString(), MaxDistance.toString()];
                break;
            case 3:
                pythonScript = 'kspSolver.py';
                tempFilePath = path.join(__dirname, 'ksp_temp.json');
                const { Values, Weights, Capacities } = problem.problem_desc;
                dataToWrite = {
                    Values: Values,
                    Weights: Weights,
                    Capacities: Capacities
                };
                // console.log("JSON File : ", JSON.stringify(dataToWrite, null, 2));
                fs.writeFileSync(tempFilePath, JSON.stringify(dataToWrite, null, 2));
                pythonArgs = [path.join(__dirname, pythonScript), tempFilePath];
                break;
            case 4:
                pythonScript = 'lsasSolver.py';
                tempFilePath = path.join(__dirname, 'lsas_temp.json');
                const { Costs } = problem.problem_desc;
                fs.writeFileSync(tempFilePath, JSON.stringify({ Costs }, null, 2));
                pythonArgs = [path.join(__dirname, pythonScript), tempFilePath];
                break;
            case 5:
                pythonScript = 'mipSolver.py';
                tempFilePath = path.join(__dirname, 'mip_temp.json');
                const { Variables: mipVars, Constraints: mipConstraints, Objective: mipObjective } = problem.problem_desc;
                dataToWrite = { Variables: mipVars, Constraints: mipConstraints, Objective: mipObjective };
                fs.writeFileSync(tempFilePath, JSON.stringify(dataToWrite, null, 2));
                pythonArgs = [path.join(__dirname, pythonScript), tempFilePath];
                break;
            case 6:
                pythonScript = 'lpSolver.py';
                tempFilePath = path.join(__dirname, 'lp_temp.json');
                const { Variables: lpVars, Constraints: lpConstraints, Objective: lpObjective } = problem.problem_desc;
                dataToWrite = { Variables: lpVars, Constraints: lpConstraints, Objective: lpObjective };
                fs.writeFileSync(tempFilePath, JSON.stringify(dataToWrite, null, 2));
                pythonArgs = [path.join(__dirname, pythonScript), tempFilePath];
                break;
            case 7:
                pythonScript = 'mincostSolver.py';
                tempFilePath = path.join(__dirname, 'mincost_temp.json');
                const { Arcs, Supplies } = problem.problem_desc;
                dataToWrite = {
                    Arcs: Arcs,
                    Supplies: Supplies
                };
                // console.log("JSON File : ", JSON.stringify(dataToWrite, null, 2));
                fs.writeFileSync(tempFilePath, JSON.stringify(dataToWrite, null, 2));
                pythonArgs = [path.join(__dirname, pythonScript), tempFilePath];
                break;
            case 8:
                pythonScript = 'nqueensSolver.py';
                // tempFilePath = path.join(__dirname, 'nqueens_temp.json');
                const { board_size } = problem.problem_desc;
                pythonArgs = [path.join(__dirname, pythonScript), board_size.toString()];
                break;
            default:
                console.log(`Tool for credits_used ${problem.credits_used} doesn't exist yet.`);
                return res.status(400).json({ error: `Tool for credits_used ${problem.credits_used} doesn't exist yet.` });
        }

        // Determine Python script path
        console.log('Executing Python command:', `python ${pythonArgs.join(' ')}`);

        // Execute Python script to generate solution details
        const pythonProcess = spawn('python', pythonArgs);

        // Start time to measure execution duration
        const startTime = new Date();

        pythonProcess.stdout.on('data', async (data) => {
            try {
                const endTime = new Date();
                const elapsedTime = endTime - startTime;

                const solutionData = data.toString().trim(); // Assuming the Python script returns a string
                const newSolution = new Solution({
                    problem_id: problem._id,
                    solution_desc: solutionData,
                    solution_timestamp: new Date(),
                    time_elapsed: elapsedTime
                });

                await newSolution.save();
                res.status(200).json({ message: 'Problem solved successfully', solution: newSolution });

                // Delete the temporary file after use
                if (tempFilePath && fs.existsSync(tempFilePath)) {
                    fs.unlinkSync(tempFilePath);
                }
            } catch (error) {
                console.error('Error saving solution:', error);
                res.status(500).json({ error: 'Internal Server Error' });

                // Delete the temporary file after use
                if (tempFilePath && fs.existsSync(tempFilePath)) {
                    fs.unlinkSync(tempFilePath);
                }
            }
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python script error: ${data}`);
            res.status(500).json({ error: `Python script error: ${data}` });

            // Delete the temporary file after use
            if (tempFilePath) {
                fs.unlinkSync(tempFilePath);
            }
        });

    } catch (error) {
        console.error('Error solving problem:', error);
        res.status(500).json({ error: 'Internal Server Error' });

        // Delete the temporary file after use
        if (tempFilePath) {
            fs.unlinkSync(tempFilePath);
        }
    }
};

const getSolutionByProblemId = async (req, res) => {
    try {
        const problemId = req.params.problemId;

        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            return res.status(400).json({ error: 'Invalid problem_id format' });
        }

        const solution = await Solution.findOne({ problem_id: problemId });

        if (!solution) {
            return res.status(404).json({ error: 'Solution not found' });
        }

        res.status(200).json(solution);
    } catch (error) {
        console.error('Error fetching solution by problem ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    solveProblem,
    addSolution,
    getAllSolutions,
    getSolutionByProblemId
};
