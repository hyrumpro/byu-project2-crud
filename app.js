const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello to my Api Project');
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use('/api/items', itemRoutes);

app.use(errorHandler);

module.exports = app;