const CreditCard = require('../models/CreditCard');
// const kafkaConfig = require('../config/kafka');
// const kafkaProducer = require('../kafka/producer');
// const config = require('../config/kafka');
const axios = require('axios');

const addCreditCard = async (req, res) => {
  try {
    const newCreditCard = new CreditCard(req.body);
    const creditCard = await newCreditCard.save();

    // kafkaProducer.sendMessage([{ topic: config.creditCardTopic, messages: JSON.stringify({ eventType: 'credit-card-added', creditCardId: creditCard._id }) }], (err, data) => {
    //   if (err) {
    //     console.error('Error publishing to Kafka:', err);
    //   } else {
    //     console.log('Message published to Kafka:', data);
    //   }
    // });

    res.status(201).json(creditCard);
  } catch (err) {
    console.error('Error adding credit card:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUserCreditCards = async (req, res) => {
  try {
    const userId = req.userId; // Ensure this is set by a middleware that verifies the token

    const creditCards = await CreditCard.find({ user: userId });
    if (!creditCards) {
      return res.status(404).json({ error: 'No credit cards found for this user' });
    }

    res.json(creditCards);
  } catch (err) {
    console.error('Error fetching credit cards:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addCreditCard,
  getUserCreditCards
};
