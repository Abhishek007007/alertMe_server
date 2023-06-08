const User = require("../model/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config();

// Register
const registerUser = async (req, res, next) => {
  // our register logic goes here...
  // Our register logic starts here
  try {
    // Get user input
    const {phone, login_key } = req.body;

    // Validate user input
    if (!(phone && login_key)) {
        console.log("[register.js] incomplete register: ", req.body)
      return res.status(400).send({
        code: 400,
        status: "All input is required",
        required: "phone, login_key",
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ phone });

    if (oldUser) {
        console.log("[register.js] user tried to login: ", req.body);
      return res.status(201).send("User Already Exist. Login");
    }
    
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(login_key, 10);

    // Create user in our database
    const user = await User.create({
      phone: phone, // sanitize: convert email to lowercase
      login_key: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, phone },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    console.log("[register.js] New user: ", user);

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser };