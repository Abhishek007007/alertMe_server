const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/user");

require("dotenv").config();

const registerUser = async (req, res, next) => {
  try {
    const { phone, login_key, fcmtoken } = req.body;

    if (!(phone && login_key && fcmtoken)) {
      console.log("[register.js] incomplete register: ", req.body);
      return res.status(400).send({
        code: 400,
        status: "All input is required",
        required: "phone, login_key",
      });
    }

    encryptedPassword = await bcrypt.hash(login_key, 10);

    const user = await User.findOneAndUpdate(
      { phone: phone },
      { phone: phone, login_key: encryptedPassword , fcmtoken: fcmtoken},
      {
        new: true,
        upsert: true,
      } 
    );

    const token = jwt.sign({ user_id: user._id, phone }, process.env.TOKEN_KEY);

    user.token = token;

    console.log("[register.js] New user: ", user);

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser };
