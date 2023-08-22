require("dotenv").config();
const https = require("https");
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/bookings/checkout", (req, res) => {
  // Extract the required data from the request body
  const { email, amount } = req.body;
  console.log(req.body);
  // Construct the params object from the extracted data
  const params = JSON.stringify({
    email: email,
    amount: amount,
    callback_url: "http://localhost:3000/successful",
    metadata: {
      cancel_action: "http://localhost:3000/cancelled",
    },
  });

  // Set up the options for the HTTPS request
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Replace with your actual Paystack API secret key
      "Content-Type": "application/json",
    },
  };

  // Make the HTTPS request to the Paystack API
  const reqPaystack = https.request(options, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      // Parse the response data and send it back to the client
      const responseData = JSON.parse(data);
      res.json(responseData);
    });
  });

  reqPaystack.on("error", (error) => {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the payment." });
  });

  // Write the request body (params) and end the request
  reqPaystack.write(params);
  reqPaystack.end();
});

module.exports = router;
