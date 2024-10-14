const express = require("express");
const router = express.Router();
const videoController = require("../../controllers/videoController");

router.get("/", videoController.getVideos);
router.get("/:id", videoController.getVideoById);
router.get("/category/:id", videoController.getVideosByCategory);
router.post("/", videoController.createVideo);
router.put("/:id", videoController.updateVideo);
router.delete("/:id", videoController.deleteVideo);

module.exports = router;
