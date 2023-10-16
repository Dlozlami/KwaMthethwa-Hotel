require("dotenv").config();
const https = require("https");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Rooms = require("../models/rooms.model");
let roomImageName = "";
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    roomImageName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, roomImageName);
  },
});

var upload = multer({ storage: storage });

router.get("rooms/images", (req, res) => {
  imgSchema.find({}).then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.render("imagepage", { items: data });
  });
});

router.post("/rooms/", upload.single("image"), (req, res, next) => {
  console.log("Post room req.body: ", req.body);
  // var obj = {
  //   name: req.body.name,
  //   desc: req.body.desc,
  //   img: {
  //     data: fs.readFileSync(
  //       path.join(__dirname + "/uploads/" + req.file.filename)
  //     ),
  //     contentType: "image/png",
  //   },
  // };
  // imgSchema.create(obj).then((err, item) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     // item.save();
  //     res.redirect("/");
  //   }
  // });
  res.send();
});

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

router.post("/rooms/images", async function (req, res) {
  // const newAccount = req.body;
  // try {
  //   const newRooms = await Rooms.create(newAccount);
  //   res.json({ status: "Room added successfully" });
  // } catch (err) {
  //   console.log(err);
  //   res.json({ status: "Error adding a room: " + err });
  // }
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
