const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightNumber: {
    type: Number,
    unique: [true, "The flight number must be unique"],
    required: [true, "Must provide a flight number"],
    min: [1, "Flight number must be greater than 0"],
  },
  departureDate: {
    type: String,
    required: [true, "Must provide a departure date"],
  },
  arrivalDate: {
    type: String,
    required: [true, "Must provide an arrival date"],
  },
  departureTime: {
    type: String,
    required: [true, "Must provide a departure time"],
  },
  arrivalTime: {
    type: String,
    required: [true, "Must provide an arrival time"],
  },
  departureAirport: {
    type: String,
    required: [true, "Must provide a departure airport"],
  },
  arrivalAirport: {
    type: String,
    required: [true, "Must provide an arrival airport"],
  },
  currentNumOfPassengers: {
    type: Number,
    required: [true, "Must provide a current number of passengers"],
    min: [0, "Current number of passengers must be greater than or equal to 0"],
  },
  passengerLimit: {
    type: Number,
    required: [true, "Must provide a passenger limit"],
    min: [1, "Passenger Limit must be greater than 0"],
  },
});

const Flight = mongoose.model("Flight", flightSchema, "Flights");
module.exports = Flight;
