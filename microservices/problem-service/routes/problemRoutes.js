const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

router.post('/', problemController.addProblem);
router.get('/', problemController.getAllProblems);
router.get('/:id', problemController.getProblemById);
router.put('/:id', problemController.updateProblem);
router.delete('/:id', problemController.deleteProblem);
router.get('/user/:userId', problemController.getProblemsByUserId);

module.exports = router;
