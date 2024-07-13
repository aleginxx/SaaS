const { text } = require('body-parser');
const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
    tool_name: { type: String, required: true, unique: true },
    tool_description: { type: String, required: true},
    tool_category: { type: String, required: true},
    tool_use_count: { type: Number, default: 0 },
    average_time: { type: String, default: '00:00:00' }
});

const Tool = mongoose.model('Tool', ToolSchema);

module.exports = Tool;
