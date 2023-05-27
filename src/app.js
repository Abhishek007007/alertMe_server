
const express = require('express');
require("dotenv").config();
require("../config/database").connect();
const registerRouter = require("../routes/register");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({"error" : "api is available at /api/v1"});
  });

app.use("/api/v1/register", registerRouter);
// Logic goes here

module.exports = app;