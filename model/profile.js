const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: { type: String },
  blood_group: { type: String },
  prifile_details: { type: String },
});

module.exports = mongoose.model("profile", profileSchema);