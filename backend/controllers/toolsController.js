const Tool = require("../models/Tool"); // Corrected to 'Tool'

exports.getTools = async (req, res) => {
  try {
    const tools = await Tool.find(); // Use 'Tool' here as well
    res.status(200).json({ tools });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id); // Use 'Tool'
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
    console.log(req.body); // Debugging the request body

    const newTool = new Tool({
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
    });

    const savedTool = await newTool.save();

    return res.status(201).json(savedTool);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
