const mongoose = require("mongoose");

const receiptItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rateInCents: { type: Number, required: true },
  num_guest: { type: Number, required: true },
});

const receiptSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  subtotal: { type: Number, required: true },
  vat: { type: Number, required: true },
  total: { type: Number, required: true },
  payment_ref: { type: String },
  payment_date: { type: Number },
  currencySymbol: { type: String },
  receiptItems: [receiptItemSchema], // Array of receipt items
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
