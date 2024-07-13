const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


// Routes for User Service
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.get('/search/:name', UserController.getUserByName);
router.post('/register', UserController.registerUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
router.post('/associate-credit-card', UserController.associateCreditCard);
router.get('/:userId/getUserCreditCards', UserController.getUserCreditCards);
router.put('/:userId/add-balance', UserController.addBalance);

module.exports = router;
