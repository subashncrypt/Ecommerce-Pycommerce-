import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Stripe from "./stripe";
import './payment.css'
import { Container, Paper, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { saveOrderDetails } from "../../actions/order-action";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LB9csLWgSkDs7S61k8vJMGrAlJ7H1fJLxAgPcLJ3EdS4UoAXB4XP2qT5mD9R4r3CPE1ZINr8KrCiQUL9I4YQEqm00kOxKwrOc");

export default function MembershipPlan() {
  const [clientSecret, setClientSecret] = useState("");
  const { orderDetails } = useSelector((state) => state.orderReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    // Create PaymentIntent as soon as the page loads
    fetch("/payment/create-payment-intent", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ amount: orderDetails.totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    dispatch(saveOrderDetails());
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: 80 }} >
      <Paper variant="outlined" style={{ padding: 25, marginTop: 30, marginBottom: 30 }}>
        <Typography variant="h4" align="center">
          Stripe Payment
        </Typography>
        <div>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <Stripe />
            </Elements>
          )}
        </div>
      </Paper>
    </Container>
  );
}