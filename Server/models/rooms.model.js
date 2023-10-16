const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rateInCents: {
    type: Number,
    required: true
  },
  num_guest: {
    type: Number
  },
  num_bedroom: {
    type: Number
  },
  image: {
    type: String
  },
  floorSpace: {
    type: Number,
    required: true
  },
  bedType: {
    type: String,
    required: true
  }
});

const Rooms = mongoose.model('Rooms', RoomsSchema);

module.exports = Rooms;
