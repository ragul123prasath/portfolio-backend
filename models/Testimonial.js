const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: String,
  message: String,
  image: String,
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
