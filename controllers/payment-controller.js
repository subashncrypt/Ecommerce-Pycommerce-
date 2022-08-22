const stripe = require("stripe")('sk_test_51LB9csLWgSkDs7S6yUq1qanGbDEpa6WEa10pdmp5QM6su0PPBQ5A610MThjSwE0HoaZw2g4cR7tQFmlJggF4FsfQ00XZUh1zTx');

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  const data = {
    amount: amount * 100,
    currency: "cad",
    payment_method_types: ["card", "afterpay_clearpay"],
  }
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create(data);

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = {
    createPaymentIntent
}