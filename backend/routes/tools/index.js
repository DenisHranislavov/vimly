const express = require("express");
const router = express.Router();
const toolsController = require("../../controllers/toolsController");

router.get("/", toolsController.getTools);
router.post("/", toolsController.createTool);
router.delete("/:id", toolsController.deleteTool);

module.exports = router;
