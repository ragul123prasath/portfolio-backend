const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  profileImage: { type: String }, // optional image URL
});

module.exports = mongoose.model("About", AboutSchema);
