const express = require('express');
const pool = require('../database/db');
const authMiddleware = require('./middleware');

const router = express.Router();

router.post('/newgroup', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;
        const groupName = req.body.groupName;

        const group_members = {};
        group_members[user.userid] = user.username;

        const resData = await pool.query("INSERT INTO groups (group_name, group_members, userid) VALUES ($1, $2, $3) RETURNING *", [groupName, JSON.stringify(group_members), user.userid]);
        if (resData.rowCount) {
            res.status(200).json({ newGroup: resData.rows[0] });
        } else {
            res.status(404).json({ error: "Failed to create new group." })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/newcategory', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;
        const categoryName = req.body.categoryName;

        const resData = await pool.query("INSERT INTO categories (category_name, userid) VALUES ($1, $2) RETURNING *", [categoryName, user.userid]);
        if (resData.rowCount) {
            res.status(200).json({ newCategory: resData.rows[0] });
        } else {
            res.status(404).json({ error: "Failed to create new category." })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/newtodo', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;
        const todo = req.body.todo;

        if (user.userid == todo.userid) {
            const resData = await pool.query("INSERT INTO todos (todo_title, todo_desc, todo_date, todo_group, todo_category, todo_priority, userid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [todo.todo_title, todo.todo_desc, todo.todo_date, todo.todo_group, todo.todo_category, todo.todo_priority, todo.userid]);
            if (resData.rowCount) {
                res.status(200).json({ message: "Todo Created Successfully" });
            } else {
                res.status(404).json({ error: "New Todo Creation failed." })
            }
        } else {
            res.status(403).json({ error: "You don't have permission to create this todo." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete('/deleteTodo', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;
        const todo = req.body.todo;

        if (user.userid == todo.userid) {
            const resData = await pool.query("DELETE FROM todos WHERE userid = $1 AND todo_id = $2 RETURNING *", [user.userid, todo.todo_id]);
            if (resData.rowCount) {
                res.status(200).json({ message: "Todo Deleted Successfully" });
            } else {
                res.status(404).json({ error: "Can't delete todo as requested todo not found." })
            }
        } else {
            res.status(403).json({ error: "You don't have permission to delete this todo." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;