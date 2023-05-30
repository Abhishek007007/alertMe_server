const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  name: { type: String },
  date_of_birth: { type: String },
  blood_group: { type: String },
  medical_details: { type: String },
});

module.exports = mongoose.model("profile", profileSchema); 