require("dotenv").config();
const express = require("express");
const https = require("https");
const router = express.Router();
const Receipt = require("../models/receipts.model");
const Booking = require("../models/bookings.model");

// Route to get all receipts
router.get("/receipts", async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.json(receipts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching receipts." });
  }
});

// Route to update a receipt by its ID
router.patch("/receipts/:id", async (req, res) => {
  try {
    const receiptId = req.params.id;
    const updates = req.body; // Updated data from the request body

    // Find the receipt by ID and update it
    const updatedReceipt = await Receipt.findByIdAndUpdate(receiptId, updates, {
      new: true, // To return the updated receipt
    });

    if (!updatedReceipt) {
      // If the receipt with the specified ID is not found, return a 404 response
      return res.status(404).json({ error: "Receipt not found" });
    }

    // Return the updated receipt in the response
    res.json(updatedReceipt);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the receipt." });
  }
});

// Route to get all receipts that are paid
router.get("/receipts/paid", async (req, res) => {
  try {
    const receipts = await Receipt.find({ payment_date: { $ne: null } });
    res.json(receipts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching receipts." });
  }
});

// Route to get all receipts that are not yet paid
router.get("/receipts/unpaid", async (req, res) => {
  try {
    const receipts = await Receipt.find({ payment_date: null });
    res.json(receipts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching receipts." });
  }
});

// Route to get receipts by user_id
router.get("/receipts/user/:id", async (req, res) => {
  try {
    const userReceipts = await Receipt.find({ user_id: req.params.id });
    res.json(userReceipts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching receipts." });
  }
});

// Route to get all receipts that are paid from a user by their ID
router.get("/receipts/paid/user/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the route parameters
    const receipts = await Receipt.find({
      user_id: userId,
      payment_date: { $ne: null },
    });
    res.json(receipts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching receipts." });
  }
});

// Route to get all receipts that are not yet paid from a user by their ID
router.get("/receipts/unpaid/user/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the route parameters
    const receipts = await Receipt.find({
      user_id: userId,
      payment_date: null,
    });
    res.json(receipts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching receipts." });
  }
});

// Route to get a receipt by its ref
router.get("/receipts/ref/:id", async (req, res) => {
  try {
    const ref = req.params.id; // Get the user ID from the route parameters
    const receipts = await Receipt.find({
      payment_ref: ref,
    });
    res.json(receipts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the receipt." });
  }
});

// Route to add a new receipt
router.post("/receipts", async (req, res) => {
  try {
    const userBookings = await Booking.find({
      payment_ref: req.body.payment_ref,
    });
    let bookingItems = [];
    for (const booking of userBookings) {
      bookingItems.push({
        title: booking.title,
        num_guest: booking.num_guest,
        rateInCents: booking.rateInCent,
      });
      console.log({
        title: booking.title,
        num_guest: booking.num_guest,
        rateInCents: booking.rateInCent,
      });
    }
    const newReceipt = {
      user_id: req.body.user_id,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      subtotal: req.body.subtotal,
      vat: req.body.vat,
      total: req.body.total,
      payment_ref: req.body.payment_ref,
      payment_date: null,
      receiptItems: bookingItems,
      currencySymbol: req.body.currencySymbol,
    };
    const addReceipt = new Receipt(newReceipt);
    const savedReceipt = await addReceipt.save();
    res.json(savedReceipt);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
