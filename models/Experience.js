const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String }, // "Present" allowed
  description: { type: String }
});

module.exports = mongoose.model("Experience", ExperienceSchema);
