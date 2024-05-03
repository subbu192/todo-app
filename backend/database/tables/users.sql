CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(24) NOT NULL,
    usermail VARCHAR(64) NOT NULL UNIQUE,
    userpass VARCHAR(64) NOT NULL
);