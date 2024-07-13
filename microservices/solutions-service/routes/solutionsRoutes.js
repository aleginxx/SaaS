const express = require('express');
const router = express.Router();
const solutionController = require('../controllers/solutionsController');

// POST endpoint to solve a specific problem
router.post('/solve/:id', solutionController.solveProblem);
router.post('/add', solutionController.addSolution);
router.get('/', solutionController.getAllSolutions);
router.get('/problem/:problemId', solutionController.getSolutionByProblemId);

module.exports = router;
