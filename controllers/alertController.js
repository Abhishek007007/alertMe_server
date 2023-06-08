const Profile = require("../model/profile");
const Alert = require("../model/alert");

require("dotenv").config();

// Register
const sendAlert = async (req, res, next) => {
  try {
    const { phone, time, location } = req.body;

    if (!(phone && time && location)) {
      console.log("[alertController.js] incomplete alert: ", req.body);
      return res.status(400).send({
        code: 400,
        status: "All input is required",
        required: "phone, login_key",
      });
    }

    const userProfile = await Profile.findOne({ phone });

    if (!userProfile) {
      console.log("[alertController.js] profile does not exists: ", req.body);
      return res.status(201).send({ status: "Profile does not exists" });
    }

    // Create alert entry in database
    const alert = await Alert.create({
      name: userProfile.name,
      phone: phone,
      time: time,
      location: location,
      flag_count: 0,
      view_count: 0,
    });

    console.log("[alertController.js] New alert: ", alert);

    // return new user
    return res.status(201).json(alert);
  } catch (err) {
    console.log(err);
  }
};

const retrieveAllAlerts = async (req, res, next) => {
  try {
    console.log("inside retrieveallaalert");
    const alerts = await Alert.find({});
    console.log(alerts);
    return res.status(201).send(alerts);
  } catch (err) {
    console.log(err);
  }
};

const retrieveOneAlert = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const alertData = await Alert.findOne({ _id });

    if (alertData) {
      phone = alertData.phone;
      const profileData = await Profile.findOne({ phone });
      console.log("profile: ", profileData);
      alert= {
        alertData,
        profileData
      }
      console.log(
        "[alertController.js - retrieveOneAlert] alert found successfully: "
      );
      console.log(alert);
      return res.status(201).json(alert);
    } else {
      console.log(
        "[alertController.js - retrieveOneAlert] Alert Not Found: ",
        alert
      );
      return res.status(403).send({ status: "alert Not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendAlert, retrieveAllAlerts, retrieveOneAlert };
