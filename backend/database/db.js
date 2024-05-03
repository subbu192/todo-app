// const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "subbu192",
//     host: "localhost",
//     port: "5432",
//     database: "todoapp"
// });

// module.exports = pool;

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRESQL_URL,
})

module.exports = pool;