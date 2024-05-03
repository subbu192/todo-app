const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    host: process.env.POSTGRESQL_HOST,
    port: "5432",
    database: process.env.POSTGRESQL_DB
});

module.exports = pool;

// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     connectionString: process.env.POSTGRESQL_URL,
// })

// module.exports = pool;