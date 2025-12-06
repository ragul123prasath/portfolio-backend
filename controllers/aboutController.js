const About = require("../models/About");

// CREATE or UPDATE About Section
exports.updateAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET About
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne({});
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
