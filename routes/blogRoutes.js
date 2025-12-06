const express = require("express");
const router = express.Router();

const { 
  createBlog, 
  getBlogs, 
  getBlogById,
  updateBlog, 
  deleteBlog 
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

// -----------------------------
// Public Routes
// -----------------------------

// Get all blogs
router.get("/", getBlogs);

// Get a single blog by ID
router.get("/:id", getBlogById);

// -----------------------------
// Admin Protected Routes
// -----------------------------

// Create blog
router.post("/", authMiddleware, createBlog);

// Update blog
router.put("/:id", authMiddleware, updateBlog);

// Delete blog
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
