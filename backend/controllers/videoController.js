const Video = require("../models/Video");
const mongoose = require("mongoose");

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("category", "title");
    res.status(200).json({ videos: videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "category",
      "title"
    );
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVideo = async (req, res) => {
  const { title, link, description, category, thumbnail } = req.body;
  if (!title || !link || !category) {
    return res
      .status(400)
      .json({ message: "Title, link, and category are required" });
  }

  const video = new Video({
    title,
    link,
    description,
    category,
    thumbnail,
  });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Only update fields that are present in the request body
    const { title, link, description, category, thumbnail } = req.body;
    if (title) video.title = title;
    if (link) video.link = link;
    if (description) video.description = description;
    if (category) video.category = category;
    if (thumbnail) video.thumbnail = thumbnail;

    const updatedVideo = await video.save();
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVideosByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(404).json({ message: "Category not found" });
    }
    const videos = await Video.find({ category: categoryId });
    if (!videos.length) {
      return res
        .status(404)
        .json({ message: "No videos found for this category" });
    }
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
