const express = require("express");
const articleRoutes = require("./article");
const categoryRoutes = require("./category");
const toolsRoutes = require("./tools");
const videoRoutes = require("./video");
const adminRoutes = require("./admin");

const router = express.Router();

router.use("/articles", articleRoutes);
router.use("/category", categoryRoutes);
router.use("/tools", toolsRoutes);
router.use("/videos", videoRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
