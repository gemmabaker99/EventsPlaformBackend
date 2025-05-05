const { Pool } = require("pg");

require("dotenv").config();

const connection = new Pool({
  database: process.env.PG_DATABASE,
});

module.exports = connection;
