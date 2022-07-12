const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a flight schema
const flightSchema = new Schema({
    flightNumber: {
        type: Number,
        unique: [true, 'The flight number must be unique'],
        required: [true, 'Must provide a flight number'],
        min: [1, 'Flight number must be greater than 0']
    },
    // mm/dd/yy
    departureDate: {
        type: String,
        required: [true, 'Must provide a departure date']
    },
    // mm/dd/yy
    arrivalDate: {
        type: String,
        required: [true, 'Must provide an arrival date']
    },
    // hh:mm am/pm
    departureTime: {
        type: String,
        required: [true, 'Must provide a departure time']
    },
    // hh:mm am/pm
    arrivalTime: {
        type: String,
        required: [true, 'Must provide an arrival time']
    },
    departureAirport: {
        type: String,
        required: [true, 'Must provide a departure airport']
    },
    arrivalAirport: {
        type: String,
        required: [true, 'Must provide an arrival airport']
    },
    currentNumOfPassengers: {
        type: Number,
        required: [true, 'Must provide a current number of passengers'],
        min: [0, 'Current number of passengers must be greater than or equal to 0']
    },
    passengerLimit: {
        type: Number,
        required: [true, 'Must provide a passenger limit'],
        min: [1, 'Passenger Limit must be greater than 0']
    }

});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight; // require ('Flight.model.js') will return this class