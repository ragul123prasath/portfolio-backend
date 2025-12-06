const express = require("express");
const router = express.Router();

const { 
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
} = require("../controllers/testimonialController");

// ---------------------
// Public Routes
// ---------------------

// Get all testimonials
router.get("/", getTestimonials);

// Get one testimonial by ID
router.get("/:id", getTestimonialById);

// Create a testimonial (public)
router.post("/", createTestimonial);

// Update a testimonial (public)
router.put("/:id", updateTestimonial);

// Delete a testimonial (public)
router.delete("/:id", deleteTestimonial);

module.exports = router;
