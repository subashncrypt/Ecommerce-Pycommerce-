const OrderDetails = require("../models/order-details-model");
const ObjectId = require('mongoose').Types.ObjectId;
const nodemailer = require("nodemailer");


const mail = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "pycommerce.5709@gmail.com",
        pass: "webgroup16",
    },
});

const sendOrderConfirmationEmail = (order) => {
    try {
        const mailContent = {
            from: 'pycommerce.5709@gmail.com',
            to: order.shippingDetails.contactDetails.email,
            subject: "Order Confirmation ",
            html: `<p>Hey ${order.shippingDetails.contactDetails.lastName}, your order has been placed successfully. <br/> <br/> Thanks, PyCommerce Team</p>`,
        };

        mail.sendMail(mailContent, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const createOrderDetails = async (req, res) => {
    try {
        const orderDetails = new OrderDetails(req.body);
        await orderDetails.save();
        // sendOrderConfirmationEmail(req.body)
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const userId = req.query.id;
        const filter = { userId: userId }
        const result = await OrderDetails.find(filter);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

const updateOrderDetails = async (req, res) => {
    try {
        OrderDetails.findByIdAndUpdate(req.body._id, req.body, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send('Succesfully saved.');
        });
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = {
    createOrderDetails,
    getOrderDetails,
    updateOrderDetails,
    sendOrderConfirmationEmail
}