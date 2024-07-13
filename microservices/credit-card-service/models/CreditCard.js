const mongoose = require('mongoose');

// Connect to creditCardDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/creditCardDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const CreditCardSchema = new mongoose.Schema({
  cc_number: { type: String, required: true, unique: true },
  cc_cvv: { type: String, required: true },
  cc_holder_name: { type: String, required: true },
  cc_exp_date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

const CreditCard = mongoose.model('CreditCard', CreditCardSchema);

module.exports = CreditCard;
