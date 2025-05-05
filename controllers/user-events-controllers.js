const {
  insertUserEvent,
  retrieveUserEvents,
  deleteUserEvent,
} = require("../models/user-events-models");

function postUserEvent(req, res, next) {
  const { user_id } = req.params;
  const eventData = req.body;

  insertUserEvent(user_id, eventData)
    .then((event) => {
      res.status(201).send({ event });
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(409).send({ msg: "Already signed up for this event" });
      } else {
        next(err);
      }
    });
}

function getUserEvents(req, res, next) {
  const { user_id } = req.params;
  retrieveUserEvents(user_id)
    .then((events) => {
      res.status(200).send({ events });
    })
    .catch(next);
}

function removeEventFromUser(req, res, next) {
  const { user_id, event_id } = req.params;
  deleteUserEvent(event_id, user_id)
    .then((deleteCount) => {
      if (deleteCount === 0) {
        return res.status(404).json({ msg: "Event not found for this user" });
      }
      res.status(204).send();
    })
    .catch(next);
}

module.exports = { postUserEvent, getUserEvents, removeEventFromUser };
