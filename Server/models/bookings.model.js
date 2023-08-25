const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  startDate: { type: Number, required: true },
  endDate: { type: Number },
  num_guest: { type: Number, required: true },
  num_courses: { type: Number },
  event_time: { type: String },
  rateInCent: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  discount_programme: { type: String },
  discount_rate: { type: Number },
  imageurl: { type: String },
  totalAmount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  payment_ref: { type: String },
  payment_date: { type: Number },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
