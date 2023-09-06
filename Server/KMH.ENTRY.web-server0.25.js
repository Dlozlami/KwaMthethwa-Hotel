require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const https = require("https");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
const userRoutes = require("./routes/userRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const receiptRoutes = require("./routes/receiptRoutes");

mongoose.connect("mongodb://127.0.0.1:27017/KwaMthethwaHotel");

app.use(userRoutes);
app.use(bookingsRoutes);
app.use(receiptRoutes);

// Listening to server at port 5000
app.listen(8080, function () {
  console.log(
    "server started...\nClick the url to gain access: http://localhost:8080/"
  );
});
