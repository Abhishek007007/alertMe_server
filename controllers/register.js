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
    const { user_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && user_name)) {
      return res.status(400).send({
        code: 400,
        status: "All input is required",
        required: "user_name, email, password",
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
        console.log(await User.find({}));
      return res.status(409).send("User Already Exist. Please Login");
    }
    
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      user_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser };