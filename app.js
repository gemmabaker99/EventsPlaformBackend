require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//for testing purposes only delete once routes are in
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to the Events Platform API!" });
});

const eventsRouter = require("./routes/events");
app.use("/api/events", eventsRouter);

module.exports = app;
