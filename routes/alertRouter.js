const express = require("express");
const { authUser } = require("../controllers/authController.js"); //authenticate user
const router = express.Router();


const { sendAlert, retrieveAllAlerts, retrieveOneAlert, updateCount, updateView, deleteAlert } = require("../controllers/alertController.js");

router.post("/", sendAlert);
router.get("/", retrieveAllAlerts);
router.get("/:_id", retrieveOneAlert);
router.put("/flag/:_id", updateCount);
router.put("/view/:_id", updateView);
router.delete("/:_id", deleteAlert);
// router.get("/:phone",retrieveProfile);


module.exports = router; 
