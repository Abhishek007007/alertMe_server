const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String},
    flag_count : { type: Number, default: 0},
    view_count : { type: Number, default: 0},
    time :  { type: String},
    location: {type: String},
    alert_details: {type: String},
    alert_tag: {type: String}
});

module.exports = mongoose.model("alert", alertSchema);