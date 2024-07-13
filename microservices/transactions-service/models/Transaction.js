const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  transaction_id: {
    type: Number,
    required: true,
    unique: true,
    default: 1 // Set a default value to be incremented later
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  credits_bought: { type: Number, required: true },
  // Add other fields as needed
});

// Pre-save hook to auto-increment transaction_id
transactionSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastTransaction = await this.constructor.findOne().sort({ transaction_id: -1 });
    this.transaction_id = lastTransaction ? lastTransaction.transaction_id + 1 : 1;
  }
  next();
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
