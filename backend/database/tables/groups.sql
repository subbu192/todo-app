CREATE TABLE groups (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(16) NOT NULL,
    group_members VARCHAR(255) NOT NULL,
    userid INT REFERENCES users(userid)
);