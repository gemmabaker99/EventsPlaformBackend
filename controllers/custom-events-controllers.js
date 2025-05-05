const {
  fetchAllCustomEvents,
  fetchCustomEventById,
  insertCustomEvent,
  deleteCustomEvent,
  updateCustomEvent,
  fetchCustomEventsByUserId,
} = require("../models/custom-events-model");

function getCustomEvents(req, res, next) {
  fetchAllCustomEvents(true)
    .then((events) => {
      res.status(200).send({ events });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function getCustomEventById(req, res, next) {
  fetchCustomEventById(req.params.id)
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function getCustomEventsByUserId(req, res, next) {
  fetchCustomEventsByUserId(req.params.id)
    .then((events) => {
      res.status(200).send({ events });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function postCustomEvent(req, res, next) {
  const { name, description, date, location, created_by } = req.body;
  if (!req.body.role || req.body.role !== "staff") {
    return res.status(403).send({ msg: "Only staff can create events" });
  }
  insertCustomEvent({ name, description, date, location, created_by })
    .then((event) => {
      res.status(201).send({ event });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function deleteCustomEventById(req, res, next) {
  deleteCustomEvent(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(404).json({ error: err.message });
    });
}

function patchCustomEventById(req, res, next) {
  updateCustomEvent(req.params.id, req.body).then((event) => {
    res.status(200).send({ event });
  });
}

module.exports = {
  getCustomEvents,
  getCustomEventById,
  postCustomEvent,
  deleteCustomEventById,
  patchCustomEventById,
  getCustomEventsByUserId,
};
