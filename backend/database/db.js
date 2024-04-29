const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "subbu192",
    host: "localhost",
    port: "5432",
    database: "testdb2"
});

module.exports = pool;