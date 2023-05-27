const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/register.js");

router.get("/", registerUser);

module.exports = router;