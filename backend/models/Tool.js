const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("Tool", toolSchema);
