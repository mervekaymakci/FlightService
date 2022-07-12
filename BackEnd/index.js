const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
// use a .env file for the server port in case I want a Dev and client port separate
require('dotenv').config(); // so I don't need the value from the require
const cors = require('cors'); // cross origin resource sharing

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors()); // allow other traffic to my site
app.use(logger);

// Bind a router object to the url /flights
// Any HTTP request starting with /flights will come here
// Forward the request over to the router
app.use('/flights', require('./routes/Flight.route'))

app.all('*', (req, res) => {
    res.status(404).send('We dont\'t have the resource you\'re looking for.');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch(err => {
        console.error(err);
        //terminate process if failed to connect to DB
        process.exit(1);
    });

// Will print only after system fails and exits
process.on('exit', () => {
    console.log('Cleanup after exit.')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

// video 26 @ 2:01:00