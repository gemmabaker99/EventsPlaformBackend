const db = require("../db/connection");

function insertUser(name, username, email, password) {
  return db
    .query(
      "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *;",
      [name, username, email, password]
    )
    .then((result) => {
      return result.rows[0];
    });
}

function findUserByEmail(email) {
  return db
    .query("SELECT * FROM users WHERE email = $1;", [email])
    .then((result) => {
      return result.rows[0];
    });
}

module.exports = { insertUser, findUserByEmail };
