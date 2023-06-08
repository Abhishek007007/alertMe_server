const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/registerController.js");

router.post("/", registerUser);

module.exports = router;