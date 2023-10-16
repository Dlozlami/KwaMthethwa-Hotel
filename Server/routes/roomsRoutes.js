require("dotenv").config();
const https = require("https");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Rooms = require("../models/rooms.model")


router.get("/rooms/", function (req, res) {
  Rooms.find({})
    .then((rooms) => {
      if (rooms) {
        res.send(rooms);
      } else {
        res.status(404).send("Rooms not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});



router.get("/rooms/:id", function (req, res) {
  const roomsId = req.params.id;

  Rooms.findById(roomsId)
    .then((rooms) => {
      if (rooms) {
        res.send(rooms);
      } else {
        res.status(404).send("Rooms not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/rooms", async function (req, res) {
  const newAccount = req.body;

  try {
    const newRooms = await Rooms.create(newAccount);
    res.json({ status: "Room added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error adding a room: " + err });
  }
});

router.patch("/rooms/:id", function (req, res) {
  const accountId = req.params.id;
  const newData = req.body;

  Rooms.findOneAndUpdate({ _id: accountId }, newData, { new: true })
    .then((rooms) => {
      if (rooms) {
        res.send(rooms);
      } else {
        res.status(404).send("Rooms not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


router.delete("/rooms/:id", function (req, res) {
  const accountId = req.params.id;

  Rooms.findOneAndDelete({ _id: accountId })
    .then((rooms) => {
      if (rooms) {
        res.send("Rooms deleted successfully");
      } else {
        res.status(404).send("Rooms not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
