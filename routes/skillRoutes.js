const express = require("express");
const router = express.Router();
const { createSkill, getSkills, updateSkill, deleteSkill } = require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware");

// Public GET
router.get("/", getSkills);

// Admin Protected CRUD
router.post("/", authMiddleware, createSkill);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;
