const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  startDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
  guest: { type: Number, required: true },
  rateInCent: { type: Number, required: true },
  type: { type: String, required: true },
  discount_programme: { type: String },
  discount_rate: { type: Number },
  imageurl: { type: String },
});

// Define a virtual property for totalAmount
bookingSchema.virtual("totalAmount").get(function () {
  return (
    this.rateInCent * this.guest -
    this.discount_rate * (this.rateInCent * this.guest)
  );
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
