const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryContoller");

// Route to get all categories
router.get("/", categoryController.getCategories);
router.delete("/:id", categoryController.deleteCategory);
router.post("/", categoryController.createCategory);

module.exports = router;
