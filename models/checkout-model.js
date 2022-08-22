/**
 * @Author: Dhruvrajsinh Vansia
 * Banner ID: B00891415
 * checkout controller
 */

const mongoose = require("mongoose");

const checkOutSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  cost: {
    type: Number,
    required: true,  
  }
});

const Checkout = new mongoose.model("checkout", checkOutSchema, "checkout");

module.exports = Checkout;