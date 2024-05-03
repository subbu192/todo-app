const express = require('express');
const pool = require('../database/db');
const authMiddleware = require('./middleware');

const router = express.Router();

router.post('/getgroups', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;

        const resData = await pool.query(`SELECT * FROM groups WHERE group_members LIKE '%"${user.userid}"%'`);
        if (resData.rowCount) {
            res.status(200).json({ groupData: resData.rows });
        } else {
            res.status(404).json({ error: "User not in any group" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/getcategories', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;

        const resData = await pool.query("SELECT * FROM categories WHERE userid = $1", [user.userid]);
        if (resData.rowCount) {
            res.status(200).json({ categoryData: resData.rows });
        } else {
            res.status(404).json({ error: "User don't have any categories." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/gettodo', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;
        const todoid = req.body.todoid;

        const resData = await pool.query("SELECT * FROM todos WHERE userid = $1 AND todo_id = $2", [user.userid, todoid]);

        if (resData.rowCount) {
            res.status(200).json({ todoData: resData.rows });
        } else {
            res.status(404).json({ error: "Requested TODO not found." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/groups', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;
        const groupid = Number(req.body.groupid);

        const resData = await pool.query(`SELECT group_id FROM groups WHERE group_members LIKE '%"${user.userid}"%'`)
        
        if (resData.rowCount) {
            const groupids = resData.rows.map((group) => {
                return group.group_id;
            })
            if (groupids.includes(groupid)) {
                const resData = await pool.query("SELECT * FROM todos WHERE todo_group = $1", [groupid]);
                if (resData.rowCount) {
                    res.status(200).json({ groupTodos: resData.rows });
                } else {
                    res.status(404).json({ error: "Group don't have any todos." });
                }
            } else {
                res.status(403).json({ error: "You don't have permission to this group." });
            }
        } else {
            res.status(404).json({ error: "User don't have any groups." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/categories', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;
        const categoryid = Number(req.body.categoryid);

        const resData = await pool.query(`SELECT category_id FROM categories WHERE userid = $1`, [user.userid]);
        
        if (resData.rowCount) {
            const categoryids = resData.rows.map((category) => {
                return category.category_id;
            })
            if (categoryids.includes(categoryid)) {
                const resData = await pool.query("SELECT * FROM todos WHERE todo_category = $1", [categoryid]);
                if (resData.rowCount) {
                    res.status(200).json({ categoryTodos: resData.rows });
                } else {
                    res.status(404).json({ error: "Category don't have any todos." });
                }
            } else {
                res.status(403).json({ error: "You don't have permission to this category." });
            }
        } else {
            res.status(404).json({ error: "User don't have any categories." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/priority', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;
        const priorityid = Number(req.body.priorityid);

        const resData = await pool.query(`SELECT * FROM todos WHERE userid = $1 AND todo_priority = $2`, [user.userid, priorityid]);
        
        if (resData.rowCount) {
            res.status(200).json({ priorityTodos: resData.rows });
        } else {
            res.status(404).json({ error: "This Priority don't have any todos." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/todos', authMiddleware, async (req, res) => {
    try {
        const user = req.body.user;

        const resData = await pool.query(`SELECT * FROM todos WHERE userid = $1`, [user.userid]);
        
        if (resData.rowCount) {
            res.status(200).json({ todosData: resData.rows });
        } else {
            res.status(404).json({ error: "This User don't have any todos." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/getGC', authMiddleware, async (req, res) => {
    // getGC -> get Group and Category
    try {
        const user = req.body.user;
        const todo = req.body.todo;

        const resData1 = await pool.query(`SELECT group_name FROM groups WHERE group_id = $1`, [todo.todo_group]);
        const resData2 = await pool.query("SELECT category_name FROM categories WHERE category_id = $1", [todo.todo_category]);
        
        if (resData1.rowCount && resData2.rowCount) {
            const gcData = {
                groupName: resData1.rows[0].group_name,
                categoryName: resData2.rows[0].category_name 
            };
            res.status(200).json({ gcData: gcData });
        } else {
            res.status(404).json({ error: "This Group or Category don't exists." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;