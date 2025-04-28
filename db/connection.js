const { Pool } = require("pg");

require("dotenv").config();

const connection = new Pool({
  database: "eventify",
});

module.exports = connection;
