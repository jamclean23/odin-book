// Main express app


// ====== IMPORTS ======

// System
const path = require('path');

// Express
const express = require('express');
const session = require('express-session');

// Cross origin
const cors = require('cors');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../config/.env')
});

// Passport
const passport = require('passport');
require('./functions/initPassport.js').initialize(passport);


// Custom Middleware
const testLog = require('./middleware/testLog.js');
const checkAuth = require('./middleware/checkAuth.js');
const checkNotAuth = require('./middleware/checkNotAuth.js');

// Routes
const indexRoute = require('./routes/indexRoute.js');
const loginRoute = require('./routes/loginRoute.js').init(passport);
const registerRoute = require('./routes/registerRoute.js');
const fourOhFourRoute = require('./routes/fourOhFourRoute.js');
const logoutRoute = require('./routes/logoutRoute.js');

// ====== GLOBAL VARS / INIT ======

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ====== MIDDLEWARE ======

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(testLog);
app.use(session({
    secret: 'YOUR_SECRET_HERE!@#$',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.session());


// ====== ROUTES ======

app.use('/login', loginRoute);
app.use('/register', checkNotAuth, registerRoute);
app.use('/logout', checkAuth, logoutRoute);
app.use('/', checkAuth, indexRoute);
app.use(fourOhFourRoute);

// ====== EXPORTS ======

module.exports = app;