const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id);

    console.log("Category deleted successfully:", category);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Category title is required" });
  }

  try {
    const category = new Category({ title });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Category title must be unique" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
