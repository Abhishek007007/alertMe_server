const Profile = require("../model/profile");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const profile = require("../model/profile");

require("dotenv").config();

// Register
const createProfile = async (req, res, next) => {
  // our register logic goes here...
  // Our register logic starts here
  try {
    // Get user input
    const {email, name, blood_group, date_of_birth } = req.body;

    // check if user already exist
    // Validate if user exist in our database
    const oldProfile = await Profile.findOne({ email });

    if (oldProfile) {
        console.log("[profile.js] profile already exists: ", req.body);
      return res.status(201).send("User Already Exist");
    }
    
    // Create user in our database
    const profile = await User.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      name: name,
      blood_group: blood_group,
      date_of_birth: date_of_birth
    });

    console.log("[Profile.js] New profile: ", profile);

    // return new user
    return res.status(201).json(profile);
  } catch (err) {
    console.log(err);
  }
};

const updateProfile = ()=> {

}
const retrieveProfile = () => {

}


module.exports = { createProfile, updateProfile, retrieveProfile };