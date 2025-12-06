const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Auth Route
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// CMS Routes
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/experience", require("./routes/experienceRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));

// File Upload
app.use("/api/upload", require("./routes/uploadRoutes"));

app.get("/", (req, res) => {
  res.send("Backend running...");
});

// Render Uses PORT from Environment
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
