const Solution = require('../models/Solutions');
// const Problem = require('../microservices/problem-service/controllers/problemController');
const Problem = require('../../problem-service/controllers/problemController');

// Function to fetch all solutions
const getAllSolutions = async () => {
  return await Solution.find();
};

const getSolutionByProblemId = async() =>{
  return await Problem.find();
};

module.exports = {
  getAllSolutions,
  getSolutionByProblemId
};
