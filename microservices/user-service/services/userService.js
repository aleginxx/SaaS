const User = require('../models/User');
const kafkaProducer = require('../kafka/producer');
const config = require('../config/kafka');

const registerUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const user = await newUser.save();

    kafkaProducer.sendMessage(config.userTopic, { eventType: 'user-created', userId: user._id });

    return user;
  } catch (err) {
    console.error('Error registering user:', err);
    throw err; // Propagate the error to handle it at the controller level
  }
};

const updateUser = async (userId, updatedUserData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    kafkaProducer.sendMessage(config.userTopic, { eventType: 'user-updated', userId: updatedUser._id });

    return updatedUser;
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

module.exports = {
  registerUser,
  updateUser
};
