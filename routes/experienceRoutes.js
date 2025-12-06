const express = require("express");
const router = express.Router();

const { 
  createExperience, 
  getExperience, 
  getExperienceById,
  updateExperience, 
  deleteExperience 
} = require("../controllers/experienceController");

const authMiddleware = require("../middleware/authMiddleware");

// ---------------------
// Public Routes
// ---------------------

router.get("/", getExperience);

router.get("/:id", getExperienceById);

// ---------------------
// Admin Protected Routes
// ---------------------

router.post("/", authMiddleware, createExperience);

router.put("/:id", authMiddleware, updateExperience);

router.delete("/:id", authMiddleware, deleteExperience);

module.exports = router;
