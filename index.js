// ------------------------
// Imports & Config
// ------------------------
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


const app = express();
app.use(cors());
app.use(express.json());

// ------------------------
// MongoDB Connection
// ------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));


// ------------------------
// Auth Route
// ------------------------
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


// ------------------------
// CMS Routes
// ------------------------
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/experience", require("./routes/experienceRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));


// ------------------------
// File Upload Routes
// ------------------------
app.use("/api/upload", require("./routes/uploadRoutes"));


// ------------------------
// CONTACT FORM ROUTE (NEW)
// ------------------------
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASSWORD,
      },
    });

    // Email Configuration
    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    });

    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});


// ------------------------
// Root Route
// ------------------------
app.get("/", (req, res) => {
  res.send("Backend running...");
});


// ------------------------
// Start Server
// ------------------------
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

});
