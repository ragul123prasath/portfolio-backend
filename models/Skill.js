const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true }, // 0–100 percentage
});

module.exports = mongoose.model("Skill", SkillSchema);
