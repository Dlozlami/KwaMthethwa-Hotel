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
  image01: {
    type: String
  },
  image02: {
    type: String
  },
  image03: {
    type: String
  },
  image04: {
    type: String
  },
  accommodates: {
    type: String,
    required: true
  },
  floorSpace: {
    type: Number,
    required: true
  },
  bed: {
    type: String,
    required: true
  }
});

const Rooms = mongoose.model('Rooms', RoomsSchema);

module.exports = Rooms;
