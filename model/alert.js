const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String},
    flag_count : { type: Number, default: 0},
    flaged: [{ type: String }],
    view_count : { type: Number, default: 0},
    time :  { type: String},
    location: {type: String},
    alert_details: {type: String},
    alert_tag: {type: String},
    status: {type: String}
});
alertSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 20 } );

module.exports = mongoose.model("alert", alertSchema);