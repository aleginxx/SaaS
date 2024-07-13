const User = require('../models/User');
// const kafkaProducer = require('../kafka/producer');
const axios = require('axios');
// const CreditCard = require('../microservices/credit-card-service/models/CreditCard')
const CreditCard = require('../../credit-card-service/models/CreditCard')


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'HELLO'; 

// Controller methods for handling user requests
const loginUser = async (req, res) => {
  try {
    const { username, user_password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Directly compare plaintext passwords
    if (user.user_password !== user_password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id, is_admin: user.is_admin }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller methods for handling user requests
const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();

    // kafkaProducer.sendMessage('user-created', { userId: user._id, userId: user.cc_id });

    res.status(201).json(user);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.query;

    const users = await User.find({
      $or: [
        { username: { $regex: new RegExp(name, 'i') } },
        { first_name: { $regex: new RegExp(name, 'i') } },
        { last_name: { $regex: new RegExp(name, 'i') } }
      ]
    });

    res.json(users);
  } catch (err) {
    console.error('Error searching users by name:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // kafkaProducer.sendMessage('user-deleted', { userId: deletedUser._id, cc_id: deletedUser.cc_id});

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const associateCreditCard = async (userId, creditCardData) => {
  try {
      const response = await axios.post('http://credit-card-service:3001/solveMyProblem/credit-cards/add', creditCardData);
      return response.data;
  } catch (error) {
      console.error('Error associating credit card:', error.response ? error.response.data : error.message);
      throw error;
  }
}

const getUserCreditCards = async (req, res) => {
  try {
    const userId = req.params.userId;

    const creditCards = await CreditCard.find({ user: userId });
    if (!creditCards.length) {
      return res.status(404).json({ error: 'No credit cards found for this user' });
    }

    res.json(creditCards);
  } catch (err) {
    console.error('Error fetching credit cards:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addBalance = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { amount } = req.body;

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance += amount;
    await user.save();

    res.json({ message: 'Balance added successfully', balance: user.balance });
  } catch (err) {
    console.error('Error adding balance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  getUserByName,
  updateUser,
  deleteUser,
  associateCreditCard,
  loginUser,
  getUserCreditCards,
  addBalance
};
