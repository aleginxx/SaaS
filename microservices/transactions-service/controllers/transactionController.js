const Transaction = require('../models/Transaction');
const axios = require('axios');
// const kafkaProducer = require('../kafka/producer');
// const config = require('../config/kafka');
const mongoose = require('mongoose');



const addTransaction = async (req, res) => {
  const { user_id, amount, credits_bought } = req.body;

  try {
    // Check user's balance
    const userResponse = await axios.get(`http://localhost:3000/solveMyProblem/users/${user_id}`);
    const user = userResponse.data;

    if (user.balance < amount) {
      return res.status(400).json({ error: 'Not enough money' });
    }

    const updatedBalance = parseFloat(user.balance) - parseFloat(amount);
    const updatedCredits = parseInt(user.credits, 10) + parseInt(credits_bought, 10);


    // Update user's balance and credits in user-service
    await axios.put(`http://localhost:3000/solveMyProblem/users/${user_id}`, {
      balance: updatedBalance,
      credits: updatedCredits
    });

    // Prepare transaction data
    const transactionData = {
      user_id,
      amount,
      credits_bought,
      // Other fields if any
    };

    // Save the transaction
    const newTransaction = new Transaction(transactionData);
    const transaction = await newTransaction.save();

    // // Notify other services via HTTP
    // await axios.post(`http://localhost:3000/solveMyProblem/transactions/notify`, {
    //   eventType: 'transaction-added',
    //   transactionId: transaction._id
    // });

    res.status(201).json(transaction);
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTransactionsByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const userIdObject = mongoose.Types.ObjectId(user_id);

    // Find transactions by user_id (assuming user_id is stored as a string)
    const transactions = await Transaction.find({ user_id: userIdObject });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found' });
    }

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found' });
    }

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching all transactions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addTransaction,
  getTransactionsByUserId,
  getAllTransactions
};
