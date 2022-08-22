/**
* @author: Karthik Kannan Nanthakumar
* @desc: Payment details Schema
*/

const mongoose = require("mongoose");

const paymentDetailsSchema = mongoose.Schema({
    amount: { type: Number, require: true },
    currency: { type: String, require: true },
    paymentType: { type: String, require: true },
    transactionTime: { type: Date, default: Date.now },
    paymentStatus: { type: String, require: true }
});

const PaymentDetails = new mongoose.model("payment-details", paymentDetailsSchema);

module.exports = { PaymentDetails, paymentDetailsSchema};
