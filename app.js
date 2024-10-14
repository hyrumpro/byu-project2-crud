const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const session = require('express-session');
const passport = require('./config/passport');
const setupSwagger = require('./config/swagger');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
}));
app.use(passport.initialize());
app.use(passport.session());


setupSwagger(app);

app.get('/', (req, res) => {
    res.send('Hello to my Api Project');
});

app.use('/auth', authRoutes);
app.use('/api/items', itemRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(errorHandler);

module.exports = app;
