const { Pool } = require("pg");

require("dotenv").config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 2,
});

module.exports = connection;
