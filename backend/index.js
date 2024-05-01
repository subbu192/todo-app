const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');

const PORT = 4000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})