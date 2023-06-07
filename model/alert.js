const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    phone: { type: String, unique: true },
    flag_cout : { type: String},
    view_cout : { type: String},
    time :  { type: String},
    location: {type: String},
});

module.exports = mongoose.model("alert", alertSchema); 