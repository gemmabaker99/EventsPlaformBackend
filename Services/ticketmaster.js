const axios = require("axios");

function fetchAllEventsFromTicketmaster() {
  return axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}`,
      {
        params: {
          keyword: "children",
          sort: "date,asc",
        },
      }
    )
    .then((response) => {
      console.log(response.data._embedded?.events);
      return response.data._embedded?.events;
    })
    .catch((error) => {
      console.error(
        "Error fetching events from Ticketmaster:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch events from Ticketmaster");
    });
}

function fetchEventById(id) {
  return axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}`,
      {
        params: {
          id: id,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("error fetching event details");
    });
}

module.exports = { fetchAllEventsFromTicketmaster, fetchEventById };
