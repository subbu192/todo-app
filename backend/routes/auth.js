const express = require('express');
const pool = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { usermail, userpass } = req.body;

        const resData = await pool.query("SELECT * FROM users WHERE usermail = $1", [usermail]);

        if (resData.rowCount) {
            const [ userdata ] = resData.rows;

            const verified = await bcrypt.compare(userpass, userdata.userpass);

            if (verified) {
                const user = {
                    userid: userdata.userid,
                    username: userdata.username,
                    usermail: userdata.usermail
                }

                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 60 * 5 });

                res.status(200).json({ user: user, jwt: token });
            } else {
                res.status(403).json({ error: "Email/Password is incorrect" });
            }
        } else {
            res.status(404).json({ error: "User not found in Database" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, usermail, userpass } = req.body;

        const hashedpass = await bcrypt.hash(userpass, 10);

        const resData = await pool.query("INSERT INTO users (username, usermail, userpass) VALUES ($1, $2, $3) RETURNING *", [username, usermail, hashedpass]);

        if (resData.rowCount) {
            const [ userdata ] = resData.rows;

            const user = {
                userid: userdata.userid,
                username: userdata.username,
                usermail: userdata.usermail
            }

            res.status(200).json({ message: "Registration Successful. You can login now." });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/verify', async (req, res) => {
    try {
        const { user, token } = req.body;

        const resData = jwt.verify(token, process.env.JWT_SECRET);
        const decoded = {
            userid: resData.userid,
            username: resData.username,
            usermail: resData.usermail
        };

        console.log(decoded, user);
        if (JSON.stringify(decoded) == JSON.stringify(user)) {
            res.status(200).json(req.body);
        } else {
            res.status(401).json({ error: "JWT mismatch" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;