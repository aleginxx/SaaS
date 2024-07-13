const Tool = require('../models/Tool');

const addTool = async (toolData) => {
    const tool = new Tool(toolData);
    return await tool.save();
};

const getAllTools = async () => {
    return await Tool.find();
};

const getToolById = async (toolId) => {
    return await Tool.findById(toolId);
};

const updateToolUsage = async (toolId, usageTime) => {
    const tool = await Tool.findById(toolId);
    if (!tool) {
        throw new Error('Tool not found');
    }
    tool.tool_use_count += 1;
    tool.average_time = new Date((Date.parse(tool.average_time) * (tool.tool_use_count - 1) + Date.parse(usageTime)) / tool.tool_use_count).toISOString().substr(11, 8);
    return await tool.save();
};

const deleteTool = async (toolId) => {
    return await Tool.findByIdAndDelete(toolId);
};


module.exports = {
    addTool,
    getAllTools,
    getToolById,
    updateToolUsage,
    deleteTool
};
