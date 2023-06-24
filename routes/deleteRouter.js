const express = require("express");
const router = express.Router();

const { deleteUser } = require("../controllers/deleteContoller.js");

router.delete("/:phone", deleteUser);

module.exports = router;