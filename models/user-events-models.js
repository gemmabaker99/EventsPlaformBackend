const db = require("../db/connection");

function insertUserEvent(
  user_id,
  { event_id, event_name, event_date, event_image }
) {
  const queryStr = `
    INSERT INTO user_events (user_id, event_id, event_name, event_date, event_image)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  return db
    .query(queryStr, [user_id, event_id, event_name, event_date, event_image])
    .then((result) => result.rows[0])
    .catch((err) => {
      throw { status: 500, msg: "Failed to insert user event", error: err };
    });
}

function retrieveUserEvents(user_id) {
  return db
    .query(
      "SELECT event_id, event_name, event_date FROM user_events WHERE user_id = $1",
      [user_id]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      throw { status: 500, msg: "Failed to retrieve user events", error: err };
    });
}

function deleteUserEvent(eventId, userId) {
  return db
    .query("DELETE from user_events WHERE event_id = $1 AND user_id = $2", [
      eventId,
      userId,
    ])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "Event not found or already removed",
        });
      }
      return result;
    })
    .catch((err) => {
      throw { status: 500, msg: "Failed to delete user event", error: err };
    });
}

module.exports = { insertUserEvent, retrieveUserEvents, deleteUserEvent };
