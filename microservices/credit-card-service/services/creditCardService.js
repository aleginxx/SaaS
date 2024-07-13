const mongoose = require('mongoose');

const CreditCardSchema = new mongoose.Schema({
    cc_number: { type: String, required: true, unique: true },
    cc_cvv: { type: String, required: true },
    cc_holder_name: { type: String, required: true },
    cc_exp_date: { type: Date, required: true }
});

const CreditCard = mongoose.model('CreditCard', CreditCardSchema);

module.exports = CreditCard;