const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  demoLink: { type: String },
  githubLink: { type: String },
  techStack: { type: [String], default: [] }
});

module.exports = mongoose.model("Project", ProjectSchema);
