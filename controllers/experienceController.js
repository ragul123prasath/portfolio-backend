const Experience = require("../models/Experience");

// Create Experience
exports.createExperience = async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.json(exp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get ALL experience
exports.getExperience = async (req, res) => {
  try {
    const data = await Experience.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get ONE experience by ID (this was missing)
exports.getExperienceById = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) {
    return res.status(404).json({ message: "Experience not found" });
    }
    res.json(exp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Experience
exports.updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(exp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Experience
exports.deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
