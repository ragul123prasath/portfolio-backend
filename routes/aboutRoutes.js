const express = require("express");
const router = express.Router();
const { updateAbout, getAbout } = require("../controllers/aboutController");
const authMiddleware = require("../middleware/authMiddleware");

// Public GET
router.get("/", getAbout);

// Admin Protected UPDATE
router.put("/", authMiddleware, updateAbout);

module.exports = router;
