require("dotenv").config();
const express = require("express");
const https = require("https");
const router = express.Router();
const Receipt = require("../models/receipts.model");

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

// Route to add a new receipt
router.post("/receipts", async (req, res) => {
  try {
    const newReceipt = new Receipt(req.body);
    const savedReceipt = await newReceipt.save();
    res.json(savedReceipt);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
