const mongoose = require("mongoose");
const profile = require("./profile");

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  login_key: { type: String },
  fcmtoken: { type: String },
  profile: {
    name: { type: String },
    date_of_birth: { type: String },
    blood_group: { type: String },
    medical_details: { type: String },
  },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);