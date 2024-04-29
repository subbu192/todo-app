CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    usermail VARCHAR(255) NOT NULL UNIQUE,
    userpass VARCHAR(64) NOT NULL
);

INSERT INTO users (username, usermail, userpass) VALUES ('Subbu', 'subbu@gmail.com', '$2a$10$Z.vtxmr4MFc5fJmlS1qKt.u/gW7gw/.Zd1AAZibfUpehDUypJR0v.');