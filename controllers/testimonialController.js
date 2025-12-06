const Testimonial = require("../models/Testimonial");

// Get all testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const items = await Testimonial.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get testimonial by ID  ✅ REQUIRED FUNCTION
exports.getTestimonialById = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const item = new Testimonial(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
