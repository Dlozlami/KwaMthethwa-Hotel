const mongoose = require("mongoose");

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
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
