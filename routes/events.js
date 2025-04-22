const { getEvents, getEventById } = require("../controllers/eventsController");

const express = require("express");
const eventsRouter = express.Router();

const mockEvents = [
  { id: 1, title: "Kids Disco", date: "2025-04-20" },
  { id: 2, title: "Music Festival", date: "2025-06-28" },
];

eventsRouter.get("/", getEvents);

eventsRouter.get("/:id", getEventById);

// eventsRouter.get("/:id", (req, res) => {
//   const event = events.find((event) => event.id === parseInt(req.params.id));
//   if (!event) return res.status(404).send("Event not found");
//   res.json(event);
// });

module.exports = eventsRouter;
