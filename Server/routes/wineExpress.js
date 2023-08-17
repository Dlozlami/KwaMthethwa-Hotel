require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const https = require("https");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const WineList = require("../models/wineList.model");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

mongoose.connect("mongodb://127.0.0.1:27017/wine-shmine");

app.get("/", function (req, res) {
  res.send(
    "Welcome to the Wine Shmine API\n\n===================================\n"
  );
});

app.get("/api/winelist", function (req, res) {});

app.post("/api/winelist", function (req, res) {});

app.get("/api/users", async function (req, res) {
  try {
    // Query the database to get all users
    const users = await User.find({});

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    // If there's an error, respond with an error message
    res.status(500).json({ error: "Could not get users" });
  }
});

app.post("/api/users", async function (req, res) {
  try {
    // Extract the user data from the request body
    const { name, surname, email, password, phone, picture } = req.body;

    // Create a new User instance using the User model
    const newUser = new User({
      name,
      surname,
      email,
      password,
      phone,
      pictureName,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user data
    res.status(201).json(savedUser);
  } catch (error) {
    // If there's an error, respond with an error message
    res.status(500).json({ error: "Could not create user" });
  }
});

app.post("/login", function (req, res) {});

app.post("/checkout", (req, res) => {
  // Extract the required data from the request body
  const { email, amount } = req.body;
  console.log(req.body);
  // Construct the params object from the extracted data
  const params = JSON.stringify({
    email: email,
    amount: amount,
  });

  // Set up the options for the HTTPS request
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer sk_test_8aaa40862087154621ff4fd5a8b9bfee00d6283f`, // Replace with your actual Paystack API secret key
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

app.listen(8080, "10.255.66.152", function () {
  console.log(
    "server started...\nClick the url to gain access: http://10.255.66.152:8080/"
  );
});
