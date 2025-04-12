const express = require("express");
const router = express.Router();

const events = [
  { id: 1, title: "Kids Disco", date: "2025-04-20" },
  { id: 2, title: "Music Festival", date: "2025-06-28" },
];

router.get("/", (req, res) => {
  res.json(events);
});

router.get("/:id", (req, res) => {
  const event = events.find((event) => event.id === parseInt(req.params.id));
  if (!event) return res.status(404).send("Event not found");
  res.json(event);
});

module.exports = router;
