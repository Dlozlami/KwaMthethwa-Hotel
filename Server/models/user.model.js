const mongoose = require("mongoose");

const userData = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthday: { type: String, required: true },
    phone: { type: String, required: true },
    admin: { type: Boolean, default: false },
  },
  { collection: "users" }
);

const model = mongoose.model("User", userData);

module.exports = model;
