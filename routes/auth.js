const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { authUser } = require("../controllers/auth.js");

router.get("/", auth, authUser);

module.exports = router;