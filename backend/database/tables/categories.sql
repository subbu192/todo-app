CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(16) NOT NULL,
    userid INT REFERENCES users(userid)
);

INSERT INTO categories (category_name, userid) VALUES ('Education', 2);