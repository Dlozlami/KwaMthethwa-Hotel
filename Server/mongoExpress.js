// Importing express and cors

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const secretKey =
  "4f+7errqerqer742ereewqet42t4rg564ryt3+67+651wqrqrqr414r[w0-iiwqokweidg8wqj2pss9tffb96ywaxboi-=[;k28uw4rq4ewfrqf+q";

mongoose.connect("mongodb://127.0.0.1:27017/KwaMthethwaHotel");

app.get("/users/", function (req, res) {
  const accountId = req.params.id;

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

app.post("/users/login", function (req, res) {
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
          emp_num: user.emp_num,
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          bio: user.bio,
          pic: user.pic,
          birthday: user.birthday,
          position: user.position,
          phone: user.phone,
        },
        secretKey,
        { expiresIn: "1h" } // Set the token expiration time
      );

      res.json({ token }); // Return the token to the client
    })
    .catch((err) => {
      res.status(500).send("Errror here");
    });
});

app.get("/users/:id", function (req, res) {
  const accountId = req.params.id;

  User.find({ emp_num: accountId })
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

app.post("/users", async function (req, res) {
  const newAccount = req.body;

  try {
    const newUser = await User.create({
      emp_num: newAccount.id,
      name: newAccount.name,
      surname: newAccount.surname,
      email: newAccount.email,
      password: newAccount.password,
      bio: newAccount.bio,
      pic: newAccount.pic,
      birthday: newAccount.birthday,
      position: newAccount.position,
      phone: newAccount.phone,
    });
    res.json({ status: "Goodly" });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error my god..." });
  }
});

app.patch("/users/:id", function (req, res) {
  const accountId = req.params.id;
  const newData = req.body;

  User.findOneAndUpdate({ emp_num: accountId }, newData, { new: true })
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

app.delete("/users/:id", function (req, res) {
  const accountId = req.params.id;

  User.findOneAndDelete({ emp_num: accountId })
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

// Listening to server at port 5000
app.listen(8080, function () {
  console.log(
    "server started...\nClick the url to gain access: http://localhost:8080/"
  );
});
