const Profile = require("../model/profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Register
const createProfile = async (req, res, next) => {

  try {
    // Get user input
    const {phone, name, blood_group, date_of_birth, medical_details } = req.body;

    if (!(phone && name && blood_group && date_of_birth)) {
        console.log("[register.js] incomplete register: ", req.body)
      return res.status(400).send({
        code: 400,
        status: "All input is required",
        required: "email, name, blood_group, date_of_birth",
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldProfile = await Profile.findOne({ phone });

    if (oldProfile) {
        console.log("[profile.js] profile already exists: ", req.body);
      return res.status(201).json(oldProfile);
    }
    var query = { phone: phone };
    var updatedValues = { $set: {phone: phone, name: name } };
    // Create user in our database
    const profile = await Profile.updateOne(
      {phone: phone},
      {$set: {phone: phone,
        name: name,
        blood_group: blood_group,
        date_of_birth: date_of_birth,
        medical_details: medical_details},},
        (err, res) => {
          if(err) {
            console.log(err)
          } else {
            console.log("updated profile: ", res)
          }

        }
    );

    console.log("[Profile.js] New profile: ", profile);

    // return new user
    return res.status(201).json(profile);
  } catch (err) {
    console.log(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    // Get user input
    const {phone, name, blood_group, date_of_birth } = req.body;

    if (!(phone && name && blood_group && date_of_birth)) {
        console.log("[register.js] incomplete register: ", req.body)
      return res.status(400).send({
        code: 400,
        status: "All input is required",
        required: "email, name, blood_group, date_of_birth",
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldProfile = await Profile.findOne({ phone });

    if (oldProfile) {
        console.log("[profile.js - updateProfile] profile found: ", req.body);
    } else {
      console.log("[profile.js - updateProfile] couldn't find profile ", req.body);
    }
    
    // Create user in our database
    const profile = await Profile.create({
      phone: phone,
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

}
const retrieveProfile = async(req, res, next) => {
    try {
    // Get user input
    const {phone} = req.query;

    // check if user already exist
    // Validate if user exist in our database
    const oldProfile = await Profile.findOne({ phone });

    if (oldProfile) {
        console.log("[profile.js - retrieveProfile] profile already exists: ", req.body);
        console.log(oldProfile);
      return res.status(201).json(oldProfile);
    } else {
        console.log("User Not Found: ", phone);
        return res.status(403).send("user Not found");
    }
  } catch (err) {
    console.log(err);
  }
}


module.exports = { createProfile, updateProfile, retrieveProfile };