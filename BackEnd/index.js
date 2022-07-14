const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/flights", require("./routes/Flight.route"));

app.all("*", (req, res) => {
  res.status(404).send("We dont't have the resource you're looking for.");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);

    process.exit(1);
  });

process.on("exit", () => {
  console.log("Cleanup after exit.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
