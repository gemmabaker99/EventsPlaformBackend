const db = require("../db/connection");

function fetchAllCustomEvents(onlyPublic = true) {
  let query = "SELECT * FROM custom_events";

  if (onlyPublic) {
    query += " WHERE is_public = true";
  }

  return db.query(query).then((result) => result.rows);
}

function fetchCustomEventById(id) {
  return db
    .query("SELECT * FROM custom_events WHERE id = $1", [id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "Event not found" });
      }
      return result.rows[0];
    });
}

function fetchCustomEventsByUserId(id) {
  if (!id || isNaN(id)) {
    return Promise.reject({ status: 400, msg: "Invalid user ID" });
  }
  return db
    .query("SELECT * FROM custom_events WHERE created_by = $1", [id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "no events to show" });
      }
      return result.rows;
    });
}

function insertCustomEvent({ name, description, date, location, created_by }) {
  return db
    .query(
      `INSERT INTO custom_events
          (name, description, date, location, created_by)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
      [name, description, date, location, created_by]
    )
    .then((result) => result.rows[0]);
}

function deleteCustomEvent(id) {
  return db
    .query("DELETE FROM custom_events WHERE id = $1 RETURNING *", [id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "Event not found" });
      }
      return result.rows[0];
    });
}

function updateCustomEvent(id, fieldsToUpdate) {
  const keys = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);

  if (!keys.length)
    return Promise.reject({ status: 400, msg: "No fields to update" });

  const setStr = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE custom_events SET ${setStr} WHERE id = $${
    keys.length + 1
  } RETURNING *`;

  return db.query(query, [...values, id]).then((result) => result.rows[0]);
}

module.exports = {
  fetchAllCustomEvents,
  fetchCustomEventById,
  insertCustomEvent,
  deleteCustomEvent,
  updateCustomEvent,
  fetchCustomEventsByUserId,
};
