const {
  fetchAllEventsFromTicketmaster,
  fetchEventById,
} = require("../Services/ticketmaster");

function getEvents(req, res, next) {
  fetchAllEventsFromTicketmaster()
    .then((events) => {
      res.status(200).json({ events });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function getEventById(req, res, next) {
  const { id } = req.params;
  fetchEventById(id)
    .then((event) => {
      res.status(200).json({ event });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

module.exports = { getEvents, getEventById };
