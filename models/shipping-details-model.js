/**
* @author: Karthik Kannan Nanthakumar
* @desc: Shipping details Schema
*/

const mongoose = require("mongoose");

const shippingDetailsSchema = mongoose.Schema({
    contactDetails: {
        email: { type: String, require: true },
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        phoneNumber: { type: String, require: true },
    },
    address: {
        addressLine1: { type: String, require: true },
        addressLine2: { type: String },
        city: { type: String, require: true },
        state: { type: String, require: true },
        zip: { type: String, require: true }
    }
});

const ShippingDetails = new mongoose.model("shipping-details", shippingDetailsSchema);

module.exports = { ShippingDetails, shippingDetailsSchema };
