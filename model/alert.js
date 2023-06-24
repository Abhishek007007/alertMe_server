const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String},
    flag_count : { type: Number, default: 0},
    flaged: [{ type: String }],
    view_count : { type: Number, default: 0},
    viewed: [{ type: String }],
    time :  { type: String},
    location: {type: String},
    alert_details: {type: String},
    alert_tag: {type: String},
    status: {type: String},
    createdAt: { type: Date, expires: "12h", default: Date.now }
});
module.exports = mongoose.model("alert", alertSchema);