const express = require("express");
const userEventsRouter = express.Router();
const {
  postUserEvent,
  getUserEvents,
  removeEventFromUser,
} = require("../controllers/user-events-controllers");

userEventsRouter.post("/:user_id", postUserEvent);
userEventsRouter.get("/:user_id", getUserEvents);
userEventsRouter.delete("/:user_id/:event_id", removeEventFromUser);

module.exports = userEventsRouter;
