const express = require("express");
const router = express.Router();

const { 
  createProject, 
  getProjects, 
  getProjectById,   // ✅ ADD THIS
  updateProject, 
  deleteProject 
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

// ---------------------
// Public Routes
// ---------------------

// Get all projects
router.get("/", getProjects);

// Get single project by ID  ✅ REQUIRED FOR UI
router.get("/:id", getProjectById);

// ---------------------
// Admin Protected CRUD
// ---------------------

router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
