const { getEvents, getEventById } = require("../controllers/eventsController");

const express = require("express");
const eventsRouter = express.Router();

const mockEvents = [
  { id: 1, title: "Kids Disco", date: "2025-04-20" },
  { id: 2, title: "Music Festival", date: "2025-06-28" },
];

eventsRouter.get("/", getEvents);

eventsRouter.get("/:id", getEventById);

module.exports = eventsRouter;
