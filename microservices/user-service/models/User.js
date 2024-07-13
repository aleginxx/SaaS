const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/userDB';

// Connect to userDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  is_admin: { type: Boolean, required: true },
  username: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  account_creation: { type: Date, default: Date.now },
  balance: { type: Number, default: 0, min: 0 },
  credits: { type: Number, default: 0, min: 0 }
  
});

module.exports = mongoose.model('User', userSchema);
