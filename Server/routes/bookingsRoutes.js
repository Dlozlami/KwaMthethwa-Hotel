require("dotenv").config();
const express = require("express");
const https = require("https");
const router = express.Router();
const Booking = require("../models/bookings.model");

// Route to get all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings." });
  }
});

// Route to get a booking by _id
router.get("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ error: "Booking not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the booking." });
  }
});

// Route to get bookings by user_id
router.get("/bookings/user/:id", async (req, res) => {
  try {
    const userBookings = await Booking.find({
      user_id: req.params.id
    });
    res.json(userBookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings." });
  }
});

// Route to get bookings by user_id which would be paid
router.get("/bookings/user/paid/:id", async (req, res) => {
  try {
    const userBookings = await Booking.find({
      user_id: req.params.id,
      paid: true,
    });
    res.json(userBookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings." });
  }
});

// Route to add a new booking
router.post("/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    //console.log("This is a booking: ", newBooking);
    const savedBooking = await newBooking.save();
    res.json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Route to delete a booking by _id
router.delete("/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (deletedBooking) {
      res.json({ message: "Booking deleted successfully." });
    } else {
      res.status(404).json({ error: "Booking not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the booking." });
  }
});

// Route to update a booking by _id
router.patch("/bookings/:id", async (req, res) => {
  console.log("bookingRoutes line 77 req.body:", req.body);
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedBooking) {
      res.json(updatedBooking);
    } else {
      res.status(404).json({ error: "Booking not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the booking." });
  }
});

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
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
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
