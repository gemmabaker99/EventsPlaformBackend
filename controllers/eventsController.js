const {
  fetchAllEventsFromTicketmaster,
  fetchEventById,
} = require("../Services/ticketmaster");

function getEvents(req, res, next) {
  const { city } = req.query;
  fetchAllEventsFromTicketmaster(city)
    .then((events) => {
      res.status(200).json({ events });
    })
    .catch(next);
}

function getEventById(req, res, next) {
  const { id } = req.params;
  fetchEventById(id)
    .then((event) => {
      res.status(200).json({ event });
    })
    .catch(next);
}

module.exports = { getEvents, getEventById };
