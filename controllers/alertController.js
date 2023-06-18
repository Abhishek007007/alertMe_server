const Profile = require("../model/profile");
const Alert = require("../model/alert");
const Users = require("../model/user");
var admin = require("firebase-admin");


require("dotenv").config();

// Register
const sendAlert = async (req, res, next) => {
  try {
    const { phone, time, location } = req.body;
    const registrationTokens = [];


    if (!(phone && time && location)) {
      console.log("[alertController.js] incomplete alert: ", req.body);
      return res.status(400).send({
        code: 400,
        status: "All input is required",
        required: "phone, time, location",
      });
    }

    const userProfile = await Profile.findOne({ phone });
    const usersData = await Users.find({});
    console.log(usersData);

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
    

    const message = {
      data: {score: '850', time: '2:45'},
      tokens: registrationTokens,
    };
    
    getMessaging().sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
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

const retrieveAllAlerts2 = async (req, res, next) => {
  try {
    console.log("inside retrieveallaalert");
    currentAlerts = [];
    const alerts = await Alert.find({});
    alerts.forEach (async (alert) => {
      phoneNo = alert.phone;
      // console.log(alert);
      console.log("alert.phone: ", phoneNo);

      const currentProfile = await Profile.findOne({ phoneNo });
      console.log("current profile: ", currentProfile);

      currentAlert = {
        _id: alert._id,
        name: alert.name,
        phone: alert.phone,
        flag_count: alert.flag_count,
        view_count: alert.view_count,
        time: alert.time,
        location: alert.location,
        blood_group: currentProfile.blood_group,
        date_of_birth: currentProfile.date_of_birth,
        medical_detail: currentProfile.medical_details,
      };

      // alert = {
      //   blood_group: currentProfile.blood_group,
      //   date_of_birth: currentProfile.date_of_birth,
      //   medical_detail: currentProfile.medical_details,
      // }
      console.log(currentAlert);
      currentAlerts.push(currentAlert)
    }) 
    console.log(alerts);
    return res.status(201).send(currentAlerts);
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
      alert = {
        name: profileData.name,
        phone: profileData.phone,
        time: alertData.time,
        location: alertData.location,
        blood_group: profileData.blood_group,
        date_of_birth: profileData.date_of_birth,
        medical_detail: profileData.medical_details,
        view_count: alertData.view_count,
        flag_count: alertData.flag_count,
      };
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
