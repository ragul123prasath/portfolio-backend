const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }, // e.g., react icon name
});

module.exports = mongoose.model("Service", ServiceSchema);
