const Profile = require("../model/profile");
const Alert = require("../model/alert");
const Users = require("../model/user");
var admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");

require("dotenv").config();

// Register
const sendAlert = async (req, res, next) => {
  try {
    const { phone, time, location } = req.body;
    // const registrationTokens = ['de9IsG0UQt-fWw4kVsKGJD:APA91bFSa0ch76Fw55AvBiROXZydm7-Z7KntGDshA1eEQ-ex5yYTlN1_hiNnMSxFh7A_ipOCYYSmkt1_z6TeKlJyIlxhnnL73IBWjNFxOttMfBvkJ2Z6xnQ3jfqKJnogj9miR_5YKfuG'];

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
    let registrationTokens = usersData.map((a) => a.fcmtoken);

    console.log(registrationTokens);

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

    try {
      const message = {
        data: {
          id: JSON.stringify(alert._id),
          name: userProfile.name,
          time: time,
        },
        tokens: registrationTokens,
      };

      getMessaging()
        .sendMulticast(message)
        .then((response) => {
          console.log(
            response.successCount + " messages were sent successfully"
          );
        });
    } catch (e) {
      console.log(e);
    }

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

const updateCount = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const alert = await Alert.findOneAndUpdate(
      { _id: _id },
      {
        $inc: {
          flag_count: 1,
        },
      },
      {
        new: true,
      }
    );
    console.log("count: ", alert.flag_count);
    return res.status(200).send(alert);
  } catch (e) {
    console.log(e);
  }
};

const updateView = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const alert = await Alert.findOneAndUpdate(
      { _id: _id },
      {
        $inc: {
          view_count: 1,
        },
      },
      {
        new: true,
      }
    );
    console.log("count: ", alert.flag_count);
    return res.status(200).send(alert);
  } catch (e) {
    console.log(e);
  }
};

const updateFCMToken = async (req, res, next) => {
  try {
    const { fcmtoken, phone } = req.query;
    const result = await Users.findOneAndUpdate(
      { phone },
      { fcmtoken: fcmtoken },
      {
        new: true,
      }
    );
  } catch (e) {}
};

const abortAlert = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = await Alert.findOneAndUpdate(
      { _id },
      { status: "aborted" },
      {
        new: true,
      }
    );
    res.status(200).send(result);
  } catch {}
};

const updateAlertTag = async (req, res, next) => {
  try {
    const { _id, tag } = req.query;
    if (!(_id && tag)) {
      console.log("[alertController.js] incomplete alert: ", req.body);
      return res.status(400).send({
        code: 400,
        status: "All input is required",
        required: "_id, tag",
      });
    }
    const result = await Alert.findOneAndUpdate(
      { _id },
      { alert_tag: tag },
      {
        new: true,
      }
    );

    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
  }
};

const deleteAlert = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const alert = await Alert.findOneAndDelete({ _id });
    return res.status(200).send({ status: "success" });
  } catch (e) {
    console.log(e);

    return res.status(404).send({ status: "fail" });
  }
};

const retrieveAllAlerts2 = async (req, res, next) => {
  try {
    console.log("inside retrieveallaalert");
    currentAlerts = [];
    const alerts = await Alert.find({});
    alerts.forEach(async (alert) => {
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
      currentAlerts.push(currentAlert);
    });
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

module.exports = {
  sendAlert,
  retrieveAllAlerts,
  retrieveOneAlert,
  updateCount,
  updateView,
  deleteAlert,
  updateAlertTag,
  updateFCMToken,
  abortAlert
};
