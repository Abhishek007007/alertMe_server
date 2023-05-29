const express = require("express");
const { authUser } = require("../controllers/auth.js"); //authenticate user
const router = express.Router();


const { createProfile, updateProfile, retrieveProfile } = require("../controllers/profile.js");

router.post("/",createProfile);
router.get("/",retrieveProfile);


module.exports = router;