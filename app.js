const express = require("express");
const eventsRouter = require("./routes/events");
const cors = require("cors");
const usersRouter = require("./routes/users");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//for testing purposes only delete once routes are in
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to the Events Platform API!" });
});

app.use("/api/events", eventsRouter);
app.use("/api/users", usersRouter);

// app.all("*", (request, res, next) => {
//   res.status(404).send({ msg: "endpoint does not exist" });
// });

//errors
app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ msg: err.message });
  }
  next(err);
});

module.exports = app;
