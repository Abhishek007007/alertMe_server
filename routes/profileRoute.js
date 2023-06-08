const express = require("express");
const { authUser } = require("../controllers/authController.js"); //authenticate user
const router = express.Router();


const { createProfile, updateProfile, retrieveProfile } = require("../controllers/profileController.js");

router.post("/",createProfile);
router.get("/:phone",retrieveProfile);


module.exports = router; 
