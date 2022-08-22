/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 * Model for Coupons
 */
const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  couponCode: {
    type: String,
    required: true
  },
  couponCondition: {
    type: String,
    required: true
  },
  couponDiscount: {
    type: Number,
    required: true
  },
  maximumOff:  {
    type: Number,
    required: true
  }
});

const Coupons = new mongoose.model("coupons", couponSchema);

module.exports = Coupons;
