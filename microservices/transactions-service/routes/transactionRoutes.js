const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/add', transactionController.addTransaction);
router.get('/:user_id', transactionController.getTransactionsByUserId);
router.get('/', transactionController.getAllTransactions); 

module.exports = router;
