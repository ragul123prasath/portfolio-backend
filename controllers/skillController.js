const Skill = require("../models/Skill");

// CREATE Skill
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET All Skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE Skill
exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE Skill
exports.deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
