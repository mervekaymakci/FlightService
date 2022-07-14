const Flight = require("../models/Flight.model");

const createFlight = async ({
  flightNumber,
  departureDate,
  arrivalDate,
  departureTime,
  arrivalTime,
  departureAirport,
  arrivalAirport,
  currentNumOfPassengers,
  passengerLimit,
}) => {
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
      passengerLimit,
    });
    await flight.save();
    return flight._id;
  } catch (err) {
    console.error(err);
    throw { status: 400, message: err };
  }
};

const findAllFlights = async () => {
  const flights = await Flight.find();
  return flights;
};

const updateFlight = async ({
  flightNumber,
  departureDate,
  arrivalDate,
  departureTime,
  arrivalTime,
  departureAirport,
  arrivalAirport,
  currentNumOfPassengers,
  passengerLimit,
}) => {
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
      passengerLimit,
    };
    const updatedFlightInfo = await Flight.findOneAndUpdate(
      { flightNumber },
      updatedInfo,
      { new: true }
    );
    return updatedFlightInfo;
  } catch (err) {
    console.error(err);
    throw { status: 400, message: err };
  }
};

const deleteFlight = async (flightNumber) => {
  try {
    const flight = await Flight.deleteOne({ flightNumber });
    if (flight == null) {
      throw `No flight with the flight number ${flightNumber} found.`;
    }
    return flight;
  } catch (err) {
    throw { status: 400, message: err };
  }
};

const findFlightById = async (id) => {
  try {
    const flight = await Flight.findById(id);
    if (flight == null) {
      throw `No flight with the id of ${id} found.`;
    }
    return flight;
  } catch (err) {
    console.error(err);

    throw { status: 404, message: err };
  }
};

module.exports = {
  createFlight,
  findFlightById,
  findAllFlights,
  updateFlight,
  deleteFlight,
};
