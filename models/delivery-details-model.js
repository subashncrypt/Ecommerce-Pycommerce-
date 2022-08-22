/**
* @author: Karthik Kannan Nanthakumar
* @desc: Delivery details Schema
*/

const mongoose = require("mongoose");

const deliveryDetailsSchema = mongoose.Schema({
    deliveryStatus: { type: String, require: true },
    startTimestamp: { type: Date, default: Date.now },
    updatedTimestamp: { type: Date, default: Date.now },
    eta: { type: Date, default: Date.now }
});

const DeliveryDetails = new mongoose.model("delivery-details", deliveryDetailsSchema);

module.exports = { DeliveryDetails, deliveryDetailsSchema};
