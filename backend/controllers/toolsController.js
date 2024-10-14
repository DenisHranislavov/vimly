const Tools = require("../models/Tool");

exports.getTools = async (req, res) => {
  try {
    const tools = await Tools.find();
    res.status(200).json({ tools });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    const tool = await Tools.findByIdAndDelete(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }
    res.status(200).json({ message: "Tool deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTool = async (req, res) => {
  try {
    const tool = new Tools(req.body);
    await tool.save();

    res.status(201).json(tool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
