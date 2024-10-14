const express = require("express");
const router = express.Router();
const articleController = require("../../controllers/articleController");

router.get("/", articleController.getArticles);
router.get("/:id", articleController.getArticleById);
router.get("/category/:id", articleController.getArticlesByCategory);
router.post("/", articleController.createArticle);
router.put("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
