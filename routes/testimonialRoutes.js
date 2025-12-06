const express = require("express");
const router = express.Router();

const { 
  createTestimonial,
  getTestimonials,
  getTestimonialById,   // ✅ Add this import
  updateTestimonial,
  deleteTestimonial
} = require("../controllers/testimonialController");

const authMiddleware = require("../middleware/authMiddleware");

// ---------------------
// Public Routes
// ---------------------

router.get("/", getTestimonials);

// Get one testimonial by ID
router.get("/:id", getTestimonialById);

// ---------------------
// Admin Protected Routes
// ---------------------

router.post("/", authMiddleware, createTestimonial);
router.put("/:id", authMiddleware, updateTestimonial);
router.delete("/:id", authMiddleware, deleteTestimonial);

module.exports = router;
