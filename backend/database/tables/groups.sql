CREATE TABLE groups (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(16) NOT NULL,
    group_members VARCHAR(1024) NOT NULL,
    userid INT REFERENCES users(userid)
);

INSERT INTO groups (group_name, group_members, userid) VALUES ('CSE-C', '{"2":"Deepika","1":"Subbu"}', 2);