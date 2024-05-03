const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const { user } = req.body;

        const header = req.headers['authorization'];

        if(typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];

            const resData = jwt.verify(token, process.env.JWT_SECRET);
            const decoded = {
                username: resData.username,
                usermail: resData.usermail,
                userid: resData.userid
            };

            if (decoded.usermail == user.usermail) {
                next();
            } else {
                res.status(403).json({ error: "JWT mismatch" });
            }
        } else {
            res.status(403).json({ error: "You don't have required permission." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = authMiddleware;