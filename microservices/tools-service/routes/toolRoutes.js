const express = require('express');
const toolController = require('../controllers/toolController');

const router = express.Router();

router.post('/add', toolController.addTool);
router.get('/', toolController.getAllTools);
router.get('/:id', toolController.getToolById);
router.put('/:id/usage', toolController.updateToolUsage);
router.delete('/tools/:id', toolController.deleteTool);

module.exports = router;
