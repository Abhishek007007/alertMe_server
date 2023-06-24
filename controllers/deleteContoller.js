const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const profile = require("../model/profile");

require("dotenv").config();

const deleteUser = async (req, res, next) => {
  try {
    const { phone } = req.params;
    await profile.findOneAndDelete({ phone });
    await User.findOneAndDelete({phone});
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { deleteUser };
