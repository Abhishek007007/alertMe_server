const express = require("express");
const { authUser } = require("../controllers/authController.js"); //authenticate user
const router = express.Router();


const { sendAlert, retrieveAllAlerts, retrieveOneAlert } = require("../controllers/alertController.js");

router.post("/", sendAlert);
router.get("/", retrieveAllAlerts);
router.get("/:_id", retrieveOneAlert);
// router.get("/:phone",retrieveProfile);


module.exports = router; 
