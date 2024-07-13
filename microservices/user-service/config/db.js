const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/userDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
