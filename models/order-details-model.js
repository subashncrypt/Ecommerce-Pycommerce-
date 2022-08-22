/**
* @author: Karthik Kannan Nanthakumar
* @desc: Order details Schema
*/

const mongoose = require("mongoose");
const { deliveryDetailsSchema } = require("./delivery-details-model");
const { paymentDetailsSchema } = require("./payment-details-model");
const { productSchema } = require("./product-model");
const { shippingDetailsSchema } = require("./shipping-details-model");

const orderDetailsSchema = mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        product: { type: [productSchema] },
        qty: { type: Number, require: true },
    }],
    orderStatus: {type: String},
    netPrice: { type: Number, require: true },
    tax: { type: Number, require: true },
    discount: { type: Number, require: true },
    totalPrice: { type: Number, require: true },
    paymentDetails: { type: paymentDetailsSchema },
    shippingDetails: { type: shippingDetailsSchema },
    deliveryDetails: { type: deliveryDetailsSchema }
});

const OrderDetails = new mongoose.model("order-details", orderDetailsSchema);

module.exports = OrderDetails;
