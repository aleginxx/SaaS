const Problem = require('../models/Problem');
// const User = require('../../user-service/models/User')

const addProblem = async (problemData) => {
    const problem = new Problem(problemData);
    await problem.save();
    return problem;
};

const getAllProblems = async () => {
    return await Problem.find().populate('User');
};

const getProblemById = async (problemId) => {
    return await Problem.findById(problemId).populate('User');
};

const updateProblem = async (problemId, problemData) => {
    return await Problem.findByIdAndUpdate(problemId, problemData, { new: true });
};

const deleteProblem = async (problemId) => {
    return await Problem.findByIdAndDelete(problemId);
};

const getProblemsByUserId = async (userId) => {
    return Problem.find({ user_id: userId }).lean();
};

module.exports = {
    addProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getProblemsByUserId
};
