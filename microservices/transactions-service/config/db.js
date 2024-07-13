const mongoose = require('mongoose');

mongoose.set('strictQuery', true);  // Suppress deprecation warning

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/transactionDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;