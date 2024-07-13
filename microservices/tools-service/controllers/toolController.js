const toolService = require('../services/toolService');

const addTool = async (req, res) => {
    try {
        const toolData = req.body;
        const tool = await toolService.addTool(toolData);
        res.status(201).json(tool);
    } catch (error) {
        console.error('Error adding tool:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllTools = async (req, res) => {
    try {
        const tools = await toolService.getAllTools();
        res.status(200).json(tools);
    } catch (error) {
        console.error('Error fetching tools:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getToolById = async (req, res) => {
    try {
        const toolId = req.params.id;
        const tool = await toolService.getToolById(toolId);
        if (!tool) {
            return res.status(404).json({ error: 'Tool not found' });
        }
        res.status(200).json(tool);
    } catch (error) {
        console.error('Error fetching tool:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateToolUsage = async (req, res) => {
    try {
        const toolId = req.params.id;
        const { usageTime } = req.body;
        const tool = await toolService.updateToolUsage(toolId, usageTime);
        res.status(200).json(tool);
    } catch (error) {
        console.error('Error updating tool usage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteTool = async (req, res) => {
    try {
        const toolId = req.params.id;
        const tool = await toolService.deleteTool(toolId);
        if (!tool) {
            return res.status(404).json({ error: 'Tool not found' });
        }
        res.status(200).json({ message: 'Tool deleted successfully' });
    } catch (error) {
        console.error('Error deleting tool:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addTool,
    getAllTools,
    getToolById,
    updateToolUsage,
    deleteTool
};
