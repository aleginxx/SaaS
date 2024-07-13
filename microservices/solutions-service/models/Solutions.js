const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  problem_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', index: true },
  solution_desc: { type: String, required: true },
  solution_timestamp: { type: Date, default: Date.now, required: true, index: true },
  time_elapsed: { type: Number, required: true }
});

// Create the model
const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;
