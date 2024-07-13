const { text } = require('body-parser');
const mongoose = require('mongoose');
// const User = require('../../user-service/models/User.js');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/problemDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const problemSchema = new mongoose.Schema({
  credits_used: { type: Number, required: true, min: 1, max: 8 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  problem_desc: { type: mongoose.Schema.Types.Mixed, required: true },
  problem_timestamp: { type: Date, default: Date.now, required: true },
  // problem_state: { type: Number, required: true, enum: [0, 1, 2] }, // 0 = solved, 1 = ready to be solved, 2 = being solved
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
