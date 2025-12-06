const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadImage } = require("../controllers/uploadController");

// Protected route
router.post("/", authMiddleware, upload.single("image"), uploadImage);

module.exports = router;
