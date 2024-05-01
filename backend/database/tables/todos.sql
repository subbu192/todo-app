CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    todo_title VARCHAR(255) NOT NULL,
    todo_desc TEXT NOT NULL,
    todo_date VARCHAR(10) NOT NULL,
    todo_group INT REFERENCES groups(group_id),
    todo_category INT REFERENCES categories(category_id),
    todo_priority INT NOT NULL CHECK((todo_priority>=0) and (todo_priority<=3)),
    userid INT REFERENCES users(userid)
);

INSERT INTO todos (todo_title, todo_desc, todo_date, todo_group, todo_category, todo_priority, userid) VALUES ('Drink Water', 'I will drink 6L of Water today.', '01-05-2024', 1, 3, 1, 2);