const Article = require("../models/Article");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

//Config the multer storage.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/articles");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed"));
  },
});

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("category", "title");
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "category",
      "title"
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createArticle = async (req, res) => {
  upload.single("thumbnail")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err.message); // Log multer errors
      return res.status(400).json({ message: err.message });
    } else if (err) {
      console.error("Error uploading file:", err.message); // Log any other errors
      return res.status(400).json({ message: err.message });
    }

    console.log("Request body:", req.body); // Log the request body
    console.log("Uploaded file:", req.file); // Log the uploaded file info

    try {
      const { title, content, category, author } = req.body;
      let thumbnailUrl = "";

      if (req.file) {
        thumbnailUrl = `/uploads/articles/${req.file.filename}`;
      } else {
        console.log("No file uploaded"); // Log if no file is uploaded
      }

      const article = new Article({
        title,
        content,
        category,
        author,
        thumbnailUrl,
      });

      const savedArticle = await article.save();
      res.status(201).json(savedArticle);
    } catch (error) {
      console.error("Error saving article:", error.message); // Log errors while saving
      res.status(500).json({ message: error.message });
    }
  });
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const { title, content, category, author } = req.body;
    if (title) article.title = title;
    if (content) article.content = content;
    if (author) article.author = author;
    if (category) article.category = category;

    const updatedArticle = await article.save();
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArticlesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(404).json({ message: "Category not found" });
    }
    const articles = await Article.find({ category: categoryId });
    if (!articles.length) {
      return res
        .status(404)
        .json({ message: "No articles found for this category" });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
