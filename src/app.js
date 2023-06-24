
const express = require('express');
require("dotenv").config();
require("../config/database").connect();
const registerRouter = require("../routes/registerRouter");
const alertRouter = require("../routes/alertRouter");
const profileRouter = require("../routes/profileRouter");
const deleteRouter = require("../routes/deleteRouter");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({"error" : "api is available at /api/v1"});
  });

app.use("/api/v1/register", registerRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/alert", alertRouter);
app.use("/api/v1/delete", deleteRouter);


module.exports = app;