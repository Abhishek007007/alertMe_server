const express = require("express");
const { authUser } = require("../controllers/authController.js"); //authenticate user
const router = express.Router();


const { sendAlert, retrieveAllAlerts, retrieveOneAlert, updateCount, updateView, deleteAlert, updateAlertTag, updateFCMToken, abortAlert } = require("../controllers/alertController.js");

router.post("/", sendAlert);
router.get("/", retrieveAllAlerts);
router.get("/:_id", retrieveOneAlert);
router.put("/flag/", updateCount);
router.put("/view/", updateView);
router.delete("/:_id", deleteAlert);
router.put("/updatetag/", updateAlertTag);
router.put("/updatefcmtoken/", updateFCMToken);
router.put("/abort/:_id", abortAlert);
// router.get("/:phone",retrieveProfile);


module.exports = router; 
