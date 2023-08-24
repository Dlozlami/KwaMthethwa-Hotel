require("dotenv").config();
const https = require("https");
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.get("/users/", function (req, res) {
  User.find({})
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/users/login", function (req, res) {
  const accountEmail = req.body.email;
  const accountPwd = req.body.password;

  // Validate username and password
  User.findOne({ email: accountEmail })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      if (user.password !== accountPwd) {
        return res.status(401).send("Invalid password");
      }

      // Create and sign a JSON Web Token (JWT)
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" } // Set the token expiration time
      );

      res.json({ token }); // Return the token to the client
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Errror here");
    });
});

router.get("/users/:id", function (req, res) {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/users", async function (req, res) {
  const newAccount = req.body;

  try {
    const newUser = await User.create({
      name: newAccount.name,
      surname: newAccount.surname,
      email: newAccount.email,
      password: newAccount.password,
      birthday: newAccount.birthday,
      phone: newAccount.phone,
    });
    res.json({ status: "Goodly" });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error my god..." });
  }
});

router.patch("/users/:id", function (req, res) {
  const accountId = req.params.id;
  const newData = req.body;

  User.findOneAndUpdate({ _id: accountId }, newData, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete("/users/:id", function (req, res) {
  const accountId = req.params.id;

  User.findOneAndDelete({ _id: accountId })
    .then((user) => {
      if (user) {
        res.send("User deleted successfully");
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
