const router = require('express').Router()
const { createFlight, findFlightById, findAllFlights, updateFlight, deleteFlight } = require('../controllers/Flight.controller');

// Create a new flight 
router.post('/', async (req, res) => {
    try {
        const flightId = await createFlight(req.body);
        res.status(201).json({ _id: flightId });

    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// GET /flights
router.get('/', async (req, res) => {
    const flights = await findAllFlights();
    res.json(flights);
});

// UPDATE /flight
router.put('/', async (req, res) => {
    try {
        const updatedFlight = await updateFlight(req.body);
        res.status(200).json({ updatedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
})

// DELETE a specific flight based on the Flight Number
router.delete('/:flightNumber', async (req, res) => {
    try {
        const deletedFlight = await deleteFlight(req.params.flightNumber);
        res.status(200).json({ deletedFlight });
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const flight = await findFlightById(req.params.id);
        res.json(flight);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;
