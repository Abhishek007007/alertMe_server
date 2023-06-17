const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String},
    flag_count : { type: String},
    view_count : { type: String},
    time :  { type: String},
    location: {type: String},
});

module.exports = mongoose.model("alert", alertSchema);  