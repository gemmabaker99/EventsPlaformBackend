const express = require("express");
const eventsRouter = require("./routes/events");
const cors = require("cors");
const usersRouter = require("./routes/users");
const userEventsRouter = require("./routes/eventUser");
const customEventsRouter = require("./routes/custom-events-router");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/events", eventsRouter);
app.use("/api/users", usersRouter);
app.use("/api/userevents", userEventsRouter);
app.use("/api/custom-events", customEventsRouter);

app.use((req, res) => {
  res.status(404).send({ msg: "endpoint does not exist" });
});

//errors
app.use((err, req, res, next) => {
  if (err.status && err.message) {
    return res.status(err.status).send({ msg: err.message });
  }
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
