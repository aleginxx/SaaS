const axios = require('axios');
const problemService = require('../services/problemService');
// const User = require('../../user-service/models/User.js');

const addProblem = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        
        const problemData = req.body;
        const problem = await problemService.addProblem(problemData);

         // After saving the problem, call the solving microservice
         const solvingEndpoint = `http://localhost:3005/solveMyProblem/solve/solve/${problem._id}`;
         await axios.post(solvingEndpoint);

        res.status(201).json(problem);
    } catch (error) {
        console.error('Error adding problem:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllProblems = async (req, res) => {
    try {
        const problems = await problemService.getAllProblems();
        res.status(200).json(problems);
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProblemById = async (req, res) => {
    try {
        const problemId = req.params.id;
        const problem = await problemService.getProblemById(problemId);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        console.error('Error fetching problem:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProblem = async (req, res) => {
    try {
        const problemId = req.params.id;
        const problemData = req.body;
        const problem = await problemService.updateProblem(problemId, problemData);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        console.error('Error updating problem:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProblem = async (req, res) => {
    try {
        const problemId = req.params.id;
        const problem = await problemService.deleteProblem(problemId);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json({ message: 'Problem deleted successfully' });
    } catch (error) {
        console.error('Error deleting problem:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getProblemsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const problems = await problemService.getProblemsByUserId(userId);
        res.status(200).json(problems);
    } catch (error) {
        console.error('Error fetching problems by user ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getProblemsByUserId
};
