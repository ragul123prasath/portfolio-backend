const express = require("express");
const router = express.Router();

const { 
  createService,
  getServices,
  getServiceById,   // ✅ CORRECT NAME
  updateService,
  deleteService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

// ---------------------
// Public Routes
// ---------------------

router.get("/", getServices);
router.get("/:id", getServiceById);

// ---------------------
// Admin Protected
// ---------------------

router.post("/", authMiddleware, createService);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;
