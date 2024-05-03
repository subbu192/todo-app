CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    todo_title VARCHAR(32) NOT NULL,
    todo_desc VARCHAR(255) NOT NULL,
    todo_date VARCHAR(10) NOT NULL,
    todo_group INT REFERENCES groups(group_id),
    todo_category INT REFERENCES categories(category_id),
    todo_priority INT NOT NULL CHECK((todo_priority>=0) and (todo_priority<=3)),
    userid INT REFERENCES users(userid)
);