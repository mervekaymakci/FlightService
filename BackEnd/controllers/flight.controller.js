const Flight = require('../models/Flight.model');

const createFlight = async ({ flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, currentNumOfPassengers, passengerLimit }) => {
    try {
        const flight = new Flight({
            flightNumber,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            departureAirport,
            arrivalAirport,
            currentNumOfPassengers,
            passengerLimit
        }); // This alone does not save to the database, just simply prepares
        await flight.save(); // Saves the newly created flight to the database
        return flight._id; // return the id of the newly created flight
    }
    // This will occur if any of the values are not up to standard
    catch (err) {
        console.error(err);
        throw { status: 400, message: err };
    }
}

const findAllFlights = async () => {
    const flights = await Flight.find(); // GET all flights
    return flights;

}

// https://mongoosejs.com/docs/tutorials/findoneandupdate.html
const updateFlight = async ({ flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, currentNumOfPassengers, passengerLimit }) => {
    try {
        const updatedInfo = {
            flightNumber,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            departureAirport,
            arrivalAirport,
            currentNumOfPassengers,
            passengerLimit
        };
        const updatedFlightInfo = await Flight.findOneAndUpdate({ flightNumber }, updatedInfo, { new: true });
        // It will work without the return because the new:true returns it
        // However, the return lets it appear in the body for debugging
        return updatedFlightInfo;
    } catch (err) {
        console.error(err);
        throw { status: 400, message: err };
    }
}

const deleteFlight = async flightNumber => {
    try {
        const flight = await Flight.deleteOne({ flightNumber })
        // If the flight number we are trying to delete does not exist, throw an error
        if (flight == null) {
            throw `No flight with the flight number ${flightNumber} found.`;
        }
        return flight

    } catch (err) {
        throw { status: 400, message: err };
    }
}

const findFlightById = async id => {
    try {
        // If no flight is found, it will return null
        const flight = await Flight.findById(id);
        if (flight == null) {
            throw `No flight with the id of ${id} found.`;
        }
        return flight; // flight was found and we return it
    } catch (err) {
        console.error(err);
        // throw here to easily tell if something went wrong
        throw { status: 404, message: err };
    }
}



module.exports = { createFlight, findFlightById, findAllFlights, updateFlight, deleteFlight };