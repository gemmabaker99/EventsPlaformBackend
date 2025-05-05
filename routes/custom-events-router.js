const express = require("express");
const {
  getCustomEvents,
  getCustomEventById,
  postCustomEvent,
  deleteCustomEventById,
  patchCustomEventById,
  getCustomEventsByUserId,
} = require("../controllers/custom-events-controllers");

const customEventsRouter = express.Router();

customEventsRouter.get("/", getCustomEvents);
customEventsRouter.post("/", postCustomEvent);
customEventsRouter.get("/:id", getCustomEventById);
customEventsRouter.delete("/:id", deleteCustomEventById);
customEventsRouter.patch("/:id", patchCustomEventById);
customEventsRouter.get("/user/:id", getCustomEventsByUserId);

module.exports = customEventsRouter;
